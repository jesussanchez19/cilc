import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { getContactInfo } from '@/lib/sanity/queries';

const resend = new Resend(process.env.RESEND_API_KEY);

const feedbackSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(500).optional(),
  page: z.string().max(200).optional(),
});

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
  const result = feedbackSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }

  const { rating, comment, page } = result.data;
  const stars = '⭐'.repeat(rating) + '☆'.repeat(5 - rating);

  // Antes iba a un correo personal escrito a mano en el código.
  const { emailAdmin } = await getContactInfo();

  const { error } = await resend.emails.send({
    from: 'CILC Web <onboarding@resend.dev>',
    to: emailAdmin,
    subject: `[CILC Feedback] ${stars} — ${page ?? 'Página desconocida'}`,
    html: `
      <h2>Nuevo feedback de usuario</h2>
      <p><strong>Calificación:</strong> ${stars} (${rating}/5)</p>
      <p><strong>Página:</strong> ${page ?? '—'}</p>
      ${comment ? `<p><strong>Comentario:</strong> ${comment}</p>` : ''}
    `,
  });

  if (error) {
    return NextResponse.json({ error: 'Error al enviar el feedback.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
