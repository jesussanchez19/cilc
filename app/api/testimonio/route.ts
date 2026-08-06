import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { writeClient } from '@/lib/sanity/writeClient';
import { getContactInfo, getAllDestinos, marcarTokenUsado } from '@/lib/sanity/queries';
import { testimonioAdminHtml } from '@/lib/email/templates';
import { Resend } from 'resend';
import { FROM_WEB } from '@/lib/email/sender';
import { SITE_URL } from '@/lib/siteUrl';

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Rate limiting: 3 envíos por IP por hora ───────────────────────────────────
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

// ── Validación del archivo por magic bytes ────────────────────────────────────
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES  = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

function isValidImageBuffer(buf: Buffer): boolean {
  if (buf.length < 12) return false;
  // JPEG
  if (buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF) return true;
  // PNG
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) return true;
  // GIF
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) return true;
  // WebP (RIFF????WEBP)
  if (
    buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
    buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50
  ) return true;
  return false;
}

// ── Esquema de validación server-side ────────────────────────────────────────
const testimonioSchema = z.object({
  nombre:      z.string().min(2).max(100),
  email:       z.string().email().max(200),
  programa:    z.string().max(100).optional(),
  pais:        z.string().max(100).optional(),
  texto:       z.string().min(10).max(2000),
  calificacion: z.number().int().min(1).max(5).optional(),
});

export async function POST(req: NextRequest) {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('[testimonio] Falta SANITY_API_WRITE_TOKEN en .env.local');
    return NextResponse.json({ error: 'Configuración incompleta en el servidor.' }, { status: 500 });
  }

  // Rate limiting
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Intenta de nuevo en una hora.' },
      { status: 429 },
    );
  }

  const fd = await req.formData();

  // Honeypot: si el campo oculto viene relleno es un bot
  if (fd.get('website')) {
    return NextResponse.json({ success: true }); // respuesta falsa — no revelar el rechazo
  }

  const nombre          = (fd.get('nombre')      as string) ?? '';
  const email           = (fd.get('email')       as string) ?? '';
  const programa        = (fd.get('programa')    as string) ?? '';
  const pais            = (fd.get('pais')        as string) ?? '';
  const texto           = (fd.get('texto')       as string) ?? '';
  const fotoFile        = fd.get('foto') as File | null;
  const tokenUsoUnico   = fd.get('tokenUsoUnico') as string | null;
  const calificacionRaw = fd.get('calificacion') as string | null;
  const calificacion    = calificacionRaw ? parseInt(calificacionRaw, 10) : undefined;

  // Validación Zod
  const parsed = testimonioSchema.safeParse({
    nombre,
    email,
    programa: programa || undefined,
    pais:     pais     || undefined,
    texto,
    calificacion: Number.isFinite(calificacion) ? calificacion : undefined,
  });
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos.' }, { status: 400 });
  }

  // Validación del archivo (tamaño + MIME + magic bytes)
  let imageBuffer: Buffer | undefined;
  if (fotoFile && fotoFile.size > 0) {
    if (fotoFile.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: 'La foto no debe superar 5 MB.' }, { status: 400 });
    }
    if (!ALLOWED_TYPES.has(fotoFile.type)) {
      return NextResponse.json({ error: 'Tipo de archivo no permitido.' }, { status: 400 });
    }
    imageBuffer = Buffer.from(await fotoFile.arrayBuffer());
    if (!isValidImageBuffer(imageBuffer)) {
      return NextResponse.json({ error: 'El archivo no parece ser una imagen válida.' }, { status: 400 });
    }
  }

  // Resolver bandera desde país
  let banderaIso = '';
  if (pais) {
    try {
      const destinos = await getAllDestinos();
      const match = destinos.find((d) => (d.nombre ?? d.countryId) === pais);
      if (match?.codigoISO) banderaIso = match.codigoISO.toLowerCase();
    } catch { /* no crítico */ }
  }

  // Guardar en Sanity
  try {
    let fotoRef: { _type: string; asset: { _type: string; _ref: string } } | undefined;

    if (fotoFile && imageBuffer) {
      const asset = await writeClient.assets.upload('image', imageBuffer, {
        filename: fotoFile.name,
        contentType: fotoFile.type,
      });
      fotoRef = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
    }

    const docId = `drafts.${crypto.randomUUID()}`;
    await writeClient.createOrReplace({
      _id:      docId,
      _type:    'solicitudTestimonio',
      nombre,
      email,
      programa: programa ?? '',
      pais:     pais     ?? '',
      bandera:  banderaIso,
      texto,
      estado:   'pendiente',
      ...(calificacion && { calificacion }),
      ...(fotoRef && { foto: fotoRef }),
    });
  } catch (err) {
    console.error('[testimonio] Error al guardar en Sanity:', err);
    return NextResponse.json({ error: 'No se pudo guardar el testimonio.' }, { status: 500 });
  }

  // Marcar token de uso único como consumido
  if (tokenUsoUnico) {
    try { await marcarTokenUsado(tokenUsoUnico); } catch { /* no crítico */ }
  }

  // Notificación por email
  try {
    const contactInfo = await getContactInfo();
    await resend.emails.send({
      from:    FROM_WEB,
      to:      contactInfo.emailAdmin,
      subject: `[CILC] Nueva solicitud de testimonio — ${nombre}`,
      html:    testimonioAdminHtml({
        nombre,
        email,
        programa: programa ?? '',
        pais:     pais     ?? '',
        texto,
        tieneFoto: !!(fotoFile && fotoFile.size > 0),
        calificacion,
        studioUrl: `/studio`,
        direccion: contactInfo.direccion,
      }),
    });
  } catch (err) {
    console.error('[testimonio] Error al enviar email:', err);
  }

  return NextResponse.json({ success: true });
}
