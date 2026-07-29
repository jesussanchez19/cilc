import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { FROM_CLIENTE, FROM_WEB } from '@/lib/email/sender';
import { contactSchema } from '@/lib/validations/contact';
import { saveLead } from '@/lib/leads';
import { contactAdminHtml, contactUserHtml } from '@/lib/email/templates';
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
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', fields: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = result.data;

  const [, contactInfo] = await Promise.all([
    saveLead({ type: 'contact', name, email, subject, message }),
    getContactInfo(),
  ]);

  const [adminResult, userResult] = await Promise.all([
    resend.emails.send({
      from: FROM_WEB,
      to: contactInfo.emailAdmin,
      replyTo: email,
      subject: `[CILC Web] ${subject} — ${name}`,
      html: contactAdminHtml({ name, email, subject, message }),
    }),
    resend.emails.send({
      from: FROM_CLIENTE,
      to: email,
      subject: 'Recibimos tu mensaje — CILC',
      html: contactUserHtml(name, (contactInfo.telefonos?.find((p) => p.esPrincipal) ?? contactInfo.telefonos?.[0])?.wa),
    }),
  ]);

  // Solo el aviso al administrador es crítico: si ese falla, el negocio no se
  // entera de la solicitud. La confirmación al cliente es cortesía, y hacer
  // fallar toda la petición por ella tiene un efecto peor — el lead YA quedó
  // guardado y el administrador YA fue avisado, pero el usuario ve un error y
  // reenvía, generando duplicados. Se registra y se sigue.
  if (userResult.error) {
    console.error('[contact] no se pudo enviar la confirmación al cliente:', userResult.error);
  }

  if (adminResult.error) {
    console.error('[contact] no se pudo avisar al administrador:', adminResult.error);
    return NextResponse.json({ error: 'Error al enviar el mensaje.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
