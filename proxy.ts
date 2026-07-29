import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE, IDLE_SECONDS, IDLE_MS } from '@/lib/auth/session';
import { createSessionCookie, verifySessionCookie } from '@/lib/auth/sessionToken';

// El convenio `middleware` quedó deprecado en Next 16 y se renombró a `proxy`:
// el nombre anterior se confundía con el middleware de Express. La firma y el
// `config.matcher` no cambian.

// Rutas que deben seguir accesibles sin sesión, o no habría forma de iniciarla.
const PUBLIC_PATHS = ['/studio/login', '/studio/reset'];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.includes(pathname) || pathname.startsWith('/api/studio-auth')) {
    return NextResponse.next();
  }

  const secret    = process.env.STUDIO_SESSION_TOKEN;
  const cookieVal = req.cookies.get(SESSION_COOKIE)?.value;

  // La antigüedad se comprueba aquí, en el servidor. Antes bastaba con
  // reenviar la cookie a mano para saltarse la caducidad, porque el único
  // control era que el navegador la borrara.
  const authed =
    Boolean(secret) &&
    Boolean(cookieVal) &&
    (await verifySessionCookie(cookieVal!, secret!, IDLE_MS));

  if (!authed) {
    // Las rutas de API responden 401. Redirigirlas al login devolvería HTML a
    // un `fetch` que espera JSON y enmascararía el fallo real.
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    const loginUrl = new URL('/studio/login', req.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Sesión válida → reemite la cookie con fecha nueva (ventana deslizante).
  // Al reemitir, la antigüedad se reinicia solo mientras haya actividad real.
  const res = NextResponse.next();
  res.cookies.set(SESSION_COOKIE, await createSessionCookie(secret!), {
    httpOnly: true,
    sameSite: 'strict',
    // En producción solo viaja por HTTPS. En dev se accede por http desde la
    // IP de red local, donde `secure` impediría que el navegador la enviara.
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: IDLE_SECONDS,
  });
  return res;
}

export const config = {
  matcher: [
    '/studio/:path*',
    // El panel de admin exponía los leads (nombres, correos, teléfonos) a
    // cualquiera que supiera la URL: no tenía ninguna comprobación propia.
    '/admin/:path*',
    // delete-doc borra documentos de Sanity sin autenticar; fetch-og hace
    // peticiones salientes arbitrarias desde el servidor.
    '/api/admin/:path*',
    '/api/fetch-og',
  ],
};
