import { NextRequest, NextResponse } from 'next/server';
import { getStudioPasswordHash } from '@/lib/sanity/queries';
import { SESSION_COOKIE, IDLE_SECONDS } from '@/lib/auth/session';
import { clientIp, isRateLimited } from '@/lib/auth/rateLimit';
import { hashPassword, verifyPassword, needsUpgrade } from '@/lib/auth/password';
import { createSessionCookie } from '@/lib/auth/sessionToken';
import { writeClient } from '@/lib/sanity/writeClient';

export async function POST(req: NextRequest) {
  // Sin límite, la contraseña del Studio se podía adivinar a fuerza bruta sin
  // ninguna traba: 8 intentos cada 15 min por IP.
  if (isRateLimited(`login:${clientIp(req)}`, 8, 15 * 60 * 1000)) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Espera unos minutos.' },
      { status: 429 },
    );
  }

  const { password } = await req.json().catch(() => ({}));
  // Cadena vacía si Sanity no responde → el login deniega. Falla cerrado.
  const stored = await getStudioPasswordHash();

  if (
    typeof password !== 'string' ||
    !password ||
    !stored ||
    !verifyPassword(password, stored)
  ) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
  }

  // Migración transparente: si seguía en texto plano, al primer acierto se
  // reescribe hasheada. Así nadie queda fuera y el plano desaparece solo.
  if (needsUpgrade(stored)) {
    try {
      await writeClient
        .patch('configuracion-singleton')
        .set({ studioPassword: hashPassword(password) })
        .commit();
    } catch (err) {
      console.error('[studio-auth] no se pudo migrar la contraseña a hash', err);
    }
  }

  const secret = process.env.STUDIO_SESSION_TOKEN;
  if (!secret) {
    console.error('[studio-auth] falta STUDIO_SESSION_TOKEN: no se puede firmar la sesión');
    return NextResponse.json({ error: 'Configuración del servidor incompleta' }, { status: 500 });
  }

  const res = NextResponse.json({ ok: true });

  res.cookies.set(SESSION_COOKIE, await createSessionCookie(secret), {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: IDLE_SECONDS,
  });

  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(SESSION_COOKIE);
  return res;
}
