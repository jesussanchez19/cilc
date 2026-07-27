import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity/writeClient';
import { hashPassword } from '@/lib/auth/password';
import { verifyResetToken } from '@/lib/auth/resetToken';

export async function POST(req: NextRequest) {
  const { token, password } = await req.json().catch(() => ({}));

  if (typeof token !== 'string' || !token || !(await verifyResetToken(token))) {
    return NextResponse.json({ error: 'Enlace inválido o expirado' }, { status: 400 });
  }

  if (typeof password !== 'string' || password.length < 10) {
    return NextResponse.json(
      { error: 'La contraseña debe tener al menos 10 caracteres' },
      { status: 400 },
    );
  }

  await writeClient
    .patch('configuracion-singleton')
    .set({ studioPassword: hashPassword(password) })
    .commit();

  return NextResponse.json({ ok: true });
}
