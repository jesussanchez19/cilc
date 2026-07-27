import { NextRequest, NextResponse } from 'next/server';
import { getContactInfo } from '@/lib/sanity/queries';

const SESSION_COOKIE = '__studio_sess';
const IDLE_SECONDS   = 30 * 60;

async function getActivePassword(): Promise<string> {
  try {
    const config = await getContactInfo();
    if (config.studioPassword?.trim()) return config.studioPassword.trim();
  } catch { /* usa fallback */ }
  return process.env.STUDIO_PASSWORD ?? '';
}

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({}));
  const activePassword = await getActivePassword();

  if (!password || !activePassword || password !== activePassword) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
  }

  const token = process.env.STUDIO_SESSION_TOKEN!;
  const res   = NextResponse.json({ ok: true });

  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'strict',
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
