import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { subscribeSchema } from '@/lib/validations/subscribe';
import { subscribeAdminHtml } from '@/lib/email/templates';

const resend = new Resend(process.env.RESEND_API_KEY);

const RATE_LIMIT = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT.get(ip);

  if (!entry || now > entry.resetAt) {
    RATE_LIMIT.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return false;
  }

  if (entry.count >= 3) return true;

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
  const result = subscribeSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Email inválido' },
      { status: 400 }
    );
  }

  const { email } = result.data;

  const { error } = await resend.emails.send({
    from: 'CILC Web <onboarding@resend.dev>',
    to: 'jesussanchez19062002@gmail.com',
    subject: `[CILC Newsletter] Nueva suscripción: ${email}`,
    html: subscribeAdminHtml(email),
  });

  if (error) {
    return NextResponse.json({ error: 'Error al procesar la suscripción.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
