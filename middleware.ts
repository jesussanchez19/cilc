import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE = '__studio_sess';
const IDLE_SECONDS   = 30 * 60; // 30 minutos sin actividad

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rutas excluidas de la protección
  if (
    pathname === '/studio/login' ||
    pathname === '/studio/reset' ||
    pathname.startsWith('/api/studio-auth')
  ) {
    return NextResponse.next();
  }

  const token     = process.env.STUDIO_SESSION_TOKEN;
  const cookieVal = req.cookies.get(SESSION_COOKIE)?.value;

  if (!cookieVal || cookieVal !== token) {
    const loginUrl = new URL('/studio/login', req.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Sesión válida → renueva la cookie (ventana deslizante)
  const res = NextResponse.next();
  res.cookies.set(SESSION_COOKIE, token!, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: IDLE_SECONDS,
  });
  return res;
}

export const config = {
  matcher: ['/studio/:path*'],
};
