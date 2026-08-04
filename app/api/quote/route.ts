import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { FROM_CLIENTE, FROM_WEB } from '@/lib/email/sender';
import { quoteSchema } from '@/lib/validations/quote';
import { saveLead } from '@/lib/leads';
import { quoteAdminHtml, quoteUserHtml } from '@/lib/email/templates';
import { getContactInfo } from '@/lib/sanity/queries';

const resend = new Resend(process.env.RESEND_API_KEY);

const RATE_LIMIT = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT.get(ip);

  if (!entry || now > entry.resetAt) {
    RATE_LIMIT.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return false;
  }

  if (entry.count >= 5) return true;

  entry.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Intenta de nuevo en una hora.' },
      { status: 429 }
    );
  }

  const body = await req.json();
  const result = quoteSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', fields: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, phone, program, message } = result.data;

  const [leadGuardado, contactInfo] = await Promise.all([
    saveLead({ type: 'quote', name, email, phone, program, message: message ?? '' }),
    getContactInfo(),
  ]);

  const [adminResult, userResult] = await Promise.all([
    resend.emails.send({
      from: FROM_WEB,
      to: contactInfo.emailAdmin,
      replyTo: email,
      subject: `[CILC Cotización] ${program} — ${name}`,
      html: quoteAdminHtml({ name, email, phone, program, message }),
    }),
    resend.emails.send({
      from: FROM_CLIENTE,
      to: email,
      subject: `Tu solicitud sobre ${program} — CILC`,
      html: quoteUserHtml(name, program, (contactInfo.telefonos?.find((p) => p.esPrincipal) ?? contactInfo.telefonos?.[0])?.wa),
    }),
  ]);

  if (userResult.error) {
    console.error('[quote] no se pudo enviar la confirmación al cliente:', userResult.error);
  }

  /**
   * Mismo criterio que en /api/contact: la solicitud ya queda guardada en
   * Sanity, así que un fallo del correo no debe hacer que el visitante vea un
   * error. Solo se falla si no quedó guardada NI se pudo avisar, que es cuando
   * de verdad no queda rastro. Ver el comentario largo en esa ruta.
   */
  if (adminResult.error) {
    console.error('[quote] no se pudo avisar al administrador:', adminResult.error);

    if (!leadGuardado) {
      console.error('[quote] la solicitud no quedó guardada y tampoco se avisó: se pierde');
      return NextResponse.json({ error: 'Error al enviar la solicitud.' }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
