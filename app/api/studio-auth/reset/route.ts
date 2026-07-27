import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { writeClient } from '@/lib/sanity/writeClient';

function verifyResetToken(token: string): boolean {
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;

  const expectedSig = crypto
    .createHmac('sha256', process.env.STUDIO_SESSION_TOKEN!)
    .update(payload)
    .digest('base64url');

  try {
    if (!crypto.timingSafeEqual(Buffer.from(sig, 'base64url'), Buffer.from(expectedSig, 'base64url'))) {
      return false;
    }
  } catch { return false; }

  const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString());
  return Date.now() < exp;
}

export async function POST(req: NextRequest) {
  const { token, password } = await req.json().catch(() => ({}));

  if (!token || !verifyResetToken(token)) {
    return NextResponse.json({ error: 'Enlace inválido o expirado' }, { status: 400 });
  }

  if (!password || password.length < 6) {
    return NextResponse.json({ error: 'La contraseña debe tener al menos 6 caracteres' }, { status: 400 });
  }

  await writeClient
    .patch('configuracion-singleton')
    .set({ studioPassword: password })
    .commit();

  return NextResponse.json({ ok: true });
}
