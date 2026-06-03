import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { quoteSchema } from '@/lib/validations/quote';
import { saveLead } from '@/lib/leads';

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

  await saveLead({ type: 'quote', name, email, phone, program, message: message ?? '' });

  const { error } = await resend.emails.send({
    from: 'CILC Web <onboarding@resend.dev>',
    to: 'jesussanchez19062002@gmail.com', // TODO: cambiar por el correo oficial de CILC
    replyTo: email,
    subject: `[CILC Cotización] ${program} — ${name}`,
    html: `
      <h2>Nueva solicitud de cotización desde el sitio web de CILC</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone}</p>
      <p><strong>Programa de interés:</strong> ${program}</p>
      ${message ? `<p><strong>Mensaje:</strong> ${message.replace(/\n/g, '<br/>')}</p>` : ''}
    `,
  });

  if (error) {
    return NextResponse.json({ error: 'Error al enviar la solicitud.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
