import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/validations/contact';
import { saveLead } from '@/lib/leads';
import { contactAdminHtml, contactUserHtml } from '@/lib/email/templates';

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

  await saveLead({ type: 'contact', name, email, subject, message });

  const [adminResult, userResult] = await Promise.all([
    resend.emails.send({
      from: 'CILC Web <onboarding@resend.dev>',
      to: 'jesussanchez19062002@gmail.com',
      replyTo: email,
      subject: `[CILC Web] ${subject} — ${name}`,
      html: contactAdminHtml({ name, email, subject, message }),
    }),
    resend.emails.send({
      from: 'CILC <onboarding@resend.dev>',
      to: email,
      subject: 'Recibimos tu mensaje — CILC',
      html: contactUserHtml(name),
    }),
  ]);

  if (adminResult.error || userResult.error) {
    return NextResponse.json({ error: 'Error al enviar el mensaje.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
