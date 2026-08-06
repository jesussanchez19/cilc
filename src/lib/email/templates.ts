import { DIRECCION_POR_DEFECTO, direccionEnLinea } from '@/lib/ubicacion';

/**
 * Paleta de marca para correo.
 *
 * Réplica literal de las variables de `app/globals.css`. Los clientes de
 * correo no soportan `var()` ni hojas de estilo externas, así que el hex tiene
 * que ir incrustado — pero centralizado aquí y no repartido por las
 * plantillas, que es como estaba: 30 colores distintos, de los que solo 6
 * salían de la paleta.
 *
 * Si cambian los colores en globals.css, hay que actualizarlos aquí.
 */
export const EMAIL_COLORS = {
  // Azules del logo CILC
  blue:      '#1B67E8', // --blue-600, azul primario
  blueDark:  '#0D3494', // --blue-900
  blueTint:  '#eff6ff', // --blue-50
  red:       '#E31E24', // --red, swoosh del logo

  // Neutros
  white:      '#ffffff', // --background
  dark:       '#0f172a', // --foreground / --dark
  textMuted:  '#64748b', // --text-muted
  textSubtle: '#94a3b8', // --text-subtle
  surface2:   '#f8faff', // --surface-2
  surface3:   '#f1f5fe', // --surface-3

  /**
   * Tonos propios del correo, derivados del azul de marca. No están en
   * globals.css porque la web resuelve estos casos con `rgba()` sobre fondo,
   * y la transparencia no es fiable en clientes de correo.
   */
  canvas:     '#edf2fb', // fondo de la página del correo
  border:     '#dce8f8', // borde de las tarjetas
  borderSoft: '#e8eef8', // separadores dentro de las tablas
} as const;
const C = EMAIL_COLORS;

/** Acento por tipo de correo, para distinguirlos de un vistazo en la bandeja. */
const ACCENT = {
  contacto:    C.blue,
  cotizacion:  '#7c3aed',
  testimonio:  '#0891b2',
} as const;

/**
 * Verdes del bloque de WhatsApp. Fuera de la paleta a propósito: son el color
 * de marca de WhatsApp, no de CILC, y se reconocen precisamente por eso.
 */
const WA = {
  bg:     '#f0faf4',
  button: '#16a34a',
  title:  '#15803d',
  text:   '#166534',
} as const;

/** Ámbar de las estrellas de calificación. */
const STAR = '#f59e0b';

const BLUE      = C.blue;
const DARK_BLUE = C.blueDark;
const YEAR      = new Date().getFullYear();

/**
 * El logo tiene que ser una URL absoluta y accesible sin credenciales: el
 * correo lo renderizan los servidores de Gmail/Outlook, que no alcanzan
 * localhost ni un sitio sin desplegar.
 *
 * Se sirve desde el CDN de Sanity, que sigue siendo público aunque el dataset
 * sea privado. Así funciona ya en desarrollo y seguirá funcionando en
 * producción sin depender de que el dominio esté levantado.
 */
export const LOGO_URL =
  process.env.EMAIL_LOGO_URL ??
  'https://cdn.sanity.io/images/epcoien9/production/9065f364719d2d1cd862c108b633b971105f48e4-1006x799.png';

/**
 * Cabecera con el logo.
 *
 * Dos detalles deliberados:
 *  - Se pide al CDN el doble de alto del que se muestra, para que no se vea
 *    borroso en pantallas retina. El original pesa 643 KB; así son unos 10 KB.
 *  - Los estilos de tipografía van sobre el propio <img>: cuando el cliente
 *    bloquea imágenes (Gmail lo hace por defecto con remitentes desconocidos),
 *    los hereda el texto `alt` y se lee "CILC" en vez de verse un icono roto.
 */
export function logoBlock(size = 34): string {
  const src = `${LOGO_URL}?h=${size * 2}&fm=png`;
  return `<img src="${src}" alt="CILC" height="${size}"
    style="display:block;border:0;outline:none;text-decoration:none;height:${size}px;width:auto;font-size:24px;font-weight:900;color:${C.white};letter-spacing:-0.04em;font-family:Georgia,serif;">`;
}

// ── Shared helpers ────────────────────────────────────────────────────────────

function dataRow(label: string, value: string, shade = false): string {
  const bg = shade ? C.surface3 : C.white;
  return `
  <tr>
    <td style="padding:11px 16px;background:${bg};border-bottom:1px solid ${C.borderSoft};width:130px;vertical-align:top;">
      <span style="font-size:11px;font-weight:700;color:${C.textSubtle};text-transform:uppercase;letter-spacing:0.08em;">${label}</span>
    </td>
    <td style="padding:11px 16px;background:${bg};border-bottom:1px solid ${C.borderSoft};vertical-align:top;">
      <span style="font-size:14px;color:${C.dark};font-weight:500;">${value}</span>
    </td>
  </tr>`;
}

/**
 * La dirección del pie de los correos, en una línea y escapada para HTML.
 *
 * Estaba escrita a mano en las dos plantillas. Ahora llega desde el Studio; el
 * respaldo solo actúa si Sanity no respondió cuando se compuso el correo.
 */
function pieDireccion(direccion?: string): string {
  const texto = direccionEnLinea(direccion) || direccionEnLinea(DIRECCION_POR_DEFECTO);
  return texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function adminLayout(opts: {
  badge: string;
  badgeColor?: string;
  title: string;
  subtitle?: string;
  rows: string;
  note?: string;
  noteLabel?: string;
  ctaUrl?: string;
  ctaLabel?: string;
  /** Sale del Studio. Si falta, se usa el respaldo compartido. */
  direccion?: string;
}): string {
  const accent = opts.badgeColor ?? BLUE;
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${opts.title}</title>
</head>
<body style="margin:0;padding:0;background:${C.canvas};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${C.canvas};padding:36px 0;">
<tr><td align="center">
<table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

  <!-- HEADER -->
  <tr>
    <td style="background:${DARK_BLUE};padding:0;border-radius:14px 14px 0 0;overflow:hidden;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:22px 28px;">
            ${logoBlock()}
            <span style="display:block;font-size:10px;font-weight:600;color:rgba(255,255,255,0.45);margin-top:3px;text-transform:uppercase;letter-spacing:0.12em;">Canadian &amp; International Language Centers</span>
          </td>
          <td align="right" style="padding:22px 28px;">
            <span style="display:inline-block;background:${accent};color:${C.white};font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;padding:5px 14px;border-radius:100px;">${opts.badge}</span>
          </td>
        </tr>
        <!-- accent bar -->
        <tr><td colspan="2" style="padding:0;height:3px;background:${accent};"></td></tr>
      </table>
    </td>
  </tr>

  <!-- TITLE -->
  <tr>
    <td style="background:${C.white};padding:24px 28px 12px;border-left:1px solid ${C.border};border-right:1px solid ${C.border};">
      <h1 style="margin:0 0 4px;font-size:20px;font-weight:800;color:${C.dark};letter-spacing:-0.02em;">${opts.title}</h1>
      ${opts.subtitle ? `<p style="margin:0;font-size:13px;color:${C.textMuted};">${opts.subtitle}</p>` : ''}
    </td>
  </tr>

  <!-- DATA TABLE -->
  <tr>
    <td style="background:${C.white};padding:0 28px 20px;border-left:1px solid ${C.border};border-right:1px solid ${C.border};">
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${C.borderSoft};border-radius:10px;overflow:hidden;">
        ${opts.rows}
      </table>
    </td>
  </tr>

  ${opts.note ? `
  <!-- NOTE -->
  <tr>
    <td style="background:${C.white};padding:0 28px 20px;border-left:1px solid ${C.border};border-right:1px solid ${C.border};">
      <div style="border-left:3px solid ${accent};padding:12px 16px;background:${C.surface3};border-radius:0 8px 8px 0;">
        <p style="margin:0 0 5px;font-size:10px;font-weight:700;color:${C.textSubtle};text-transform:uppercase;letter-spacing:0.1em;">${opts.noteLabel ?? 'Mensaje'}</p>
        <p style="margin:0;font-size:14px;color:${C.dark};line-height:1.7;">${opts.note.replace(/\n/g, '<br/>')}</p>
      </div>
    </td>
  </tr>
  ` : ''}

  ${opts.ctaUrl ? `
  <!-- CTA -->
  <tr>
    <td style="background:${C.white};padding:4px 28px 28px;border-left:1px solid ${C.border};border-right:1px solid ${C.border};">
      <a href="${opts.ctaUrl}" style="display:inline-block;background:${BLUE};color:${C.white};font-size:13px;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none;letter-spacing:0.01em;">${opts.ctaLabel ?? 'Ver ahora'} &rarr;</a>
    </td>
  </tr>
  ` : ''}

  <!-- FOOTER -->
  <tr>
    <td style="background:${C.surface3};padding:16px 28px;border:1px solid ${C.border};border-top:none;border-radius:0 0 14px 14px;">
      <p style="margin:0;font-size:11px;color:${C.textSubtle};text-align:center;">
        &copy; ${YEAR} CILC &nbsp;&bull;&nbsp; ${pieDireccion(opts.direccion)}
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function userLayout(opts: {
  title: string;
  body: string;
  whatsapp?: string;
  /** Sale del Studio. Si falta, se usa el respaldo compartido. */
  direccion?: string;
}): string {
  const phone = opts.whatsapp ?? '525518944494';
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${opts.title}</title>
</head>
<body style="margin:0;padding:0;background:${C.canvas};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${C.canvas};padding:36px 0;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

  <!-- HEADER -->
  <tr>
    <td style="background:${DARK_BLUE};padding:24px 32px;border-radius:14px 14px 0 0;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            ${logoBlock()}
            <span style="display:block;font-size:10px;font-weight:600;color:rgba(255,255,255,0.45);margin-top:3px;text-transform:uppercase;letter-spacing:0.12em;">Canadian &amp; International Language Centers</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr><td style="height:3px;background:${BLUE};"></td></tr>

  <!-- BODY -->
  <tr>
    <td style="background:${C.white};padding:36px 32px;border-left:1px solid ${C.border};border-right:1px solid ${C.border};">
      <!-- Checkmark icon -->
      <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        <tr>
          <td style="width:48px;height:48px;background:${C.blueTint};border-radius:50%;text-align:center;vertical-align:middle;">
            <span style="font-size:22px;line-height:48px;">&#10003;</span>
          </td>
        </tr>
      </table>
      ${opts.body}
    </td>
  </tr>

  <!-- WHATSAPP CTA -->
  <tr>
    <td style="background:${WA.bg};padding:20px 32px;border:1px solid ${C.border};border-top:1px solid ${WA.bg};">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align:middle;">
            <p style="margin:0 0 2px;font-size:13px;font-weight:700;color:${WA.title};">¿Respuesta inmediata?</p>
            <p style="margin:0;font-size:12px;color:${WA.text};">Escríbenos por WhatsApp y respondemos en minutos.</p>
          </td>
          <td align="right" style="vertical-align:middle;">
            <a href="https://wa.me/${phone}?text=Hola%2C%20me%20interesa%20información%20sobre%20estudios%20en%20el%20extranjero"
               style="display:inline-block;background:${WA.button};color:${C.white};font-size:12px;font-weight:700;padding:10px 20px;border-radius:8px;text-decoration:none;">
              Abrir WhatsApp
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- FOOTER -->
  <tr>
    <td style="background:${C.surface3};padding:16px 32px;border:1px solid ${C.border};border-top:none;border-radius:0 0 14px 14px;">
      <p style="margin:0;font-size:11px;color:${C.textSubtle};text-align:center;">
        &copy; ${YEAR} CILC &nbsp;&bull;&nbsp; ${pieDireccion(opts.direccion)}
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

// ── Exported templates ────────────────────────────────────────────────────────

export function contactAdminHtml(data: {
  /** Domicilio para el pie. Sale del Studio. */
  direccion?: string;
  name: string;
  /** Falta en los leads del chat de WhatsApp, que solo piden nombre y teléfono. */
  email?: string;
  /** Solo lo traen los leads del chat de WhatsApp. */
  phone?: string;
  subject: string;
  message: string;
}): string {
  return adminLayout({
    direccion: data.direccion,
    badge: 'Nuevo Contacto',
    title: 'Mensaje de contacto',
    subtitle: `Recibido a las ${new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })} · ${new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
    rows: [
      dataRow('Nombre',  data.name,    false),
      data.email
        ? dataRow('Email', `<a href="mailto:${data.email}" style="color:${BLUE};text-decoration:none;">${data.email}</a>`, true)
        : '',
      // Es el único dato de contacto que dejan los leads de WhatsApp, así que
      // va enlazado para poder escribirles con un toque desde el móvil.
      data.phone
        ? dataRow('Teléfono', `<a href="https://wa.me/${data.phone.replace(/\D/g, '')}" style="color:${BLUE};text-decoration:none;">${data.phone}</a>`, !data.email)
        : '',
      dataRow('Asunto',  data.subject, false),
    ].join(''),
    note: data.message,
    noteLabel: 'Mensaje',
  });
}

export function contactUserHtml(name: string, whatsapp?: string, direccion?: string): string {
  return userLayout({
    direccion,
    title: 'Recibimos tu mensaje',
    whatsapp,
    body: `
      <h2 style="margin:0 0 12px;font-size:22px;font-weight:800;color:${C.dark};letter-spacing:-0.02em;">¡Hola, ${name}!</h2>
      <p style="margin:0 0 16px;font-size:15px;color:${C.textMuted};line-height:1.7;">
        Recibimos tu mensaje y nuestro equipo lo está revisando. Te responderemos en menos de <strong style="color:${C.dark};">24 horas hábiles</strong>.
      </p>
      <p style="margin:0;font-size:14px;color:${C.textMuted};line-height:1.6;">
        Mientras tanto, si tienes alguna duda urgente no dudes en contactarnos por WhatsApp — respondemos en minutos.
      </p>
    `,
  });
}

export function quoteAdminHtml(data: {
  /** Domicilio para el pie. Sale del Studio. */
  direccion?: string;
  name: string;
  email: string;
  /** Opcional en el formulario de cotización: la fila se omite si no viene. */
  phone?: string;
  program: string;
  message?: string;
}): string {
  // Las filas se arman antes para poder saltarse el teléfono cuando no hay.
  // El sombreado se calcula por posición, no fijo, o al quitar una fila se
  // rompería la alternancia de fondos.
  const celdas: [string, string][] = [
    ['Nombre', data.name],
    ['Email', `<a href="mailto:${data.email}" style="color:${BLUE};text-decoration:none;">${data.email}</a>`],
  ];

  if (data.phone) {
    celdas.push(['Teléfono', `<a href="tel:${data.phone}" style="color:${BLUE};text-decoration:none;">${data.phone}</a>`]);
  }

  celdas.push(['Programa', `<strong>${data.program}</strong>`]);

  return adminLayout({
    direccion: data.direccion,
    badge: 'Cotización',
    badgeColor: ACCENT.cotizacion,
    title: 'Nueva solicitud de cotización',
    subtitle: `${new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
    rows: celdas.map(([label, valor], i) => dataRow(label, valor, i % 2 === 1)).join(''),
    note: data.message,
    noteLabel: 'Mensaje adicional',
  });
}

export function quoteUserHtml(name: string, program: string, whatsapp?: string, direccion?: string): string {
  return userLayout({
    direccion,
    title: 'Solicitud recibida',
    whatsapp,
    body: `
      <h2 style="margin:0 0 12px;font-size:22px;font-weight:800;color:${C.dark};letter-spacing:-0.02em;">¡Hola, ${name}!</h2>
      <p style="margin:0 0 16px;font-size:15px;color:${C.textMuted};line-height:1.7;">
        Recibimos tu solicitud de información para el programa <strong style="color:${C.dark};">${program}</strong>. Un asesor especializado te contactará en menos de <strong style="color:${C.dark};">24 horas hábiles</strong>.
      </p>
      <div style="background:${C.surface3};border:1px solid ${C.border};border-radius:8px;padding:14px 18px;margin-bottom:16px;">
        <p style="margin:0;font-size:13px;color:${C.textMuted};line-height:1.6;">
          📋 <strong>Programa seleccionado:</strong> ${program}
        </p>
      </div>
      <p style="margin:0;font-size:14px;color:${C.textMuted};line-height:1.6;">
        Si necesitas una respuesta más rápida, escríbenos por WhatsApp.
      </p>
    `,
  });
}

export function testimonioAdminHtml(data: {
  /** Domicilio para el pie. Sale del Studio. */
  direccion?: string;
  nombre: string;
  email: string;
  programa: string;
  pais: string;
  texto: string;
  tieneFoto: boolean;
  calificacion?: number;
  studioUrl?: string;
}): string {
  const stars = data.calificacion
    ? '★'.repeat(data.calificacion) + '☆'.repeat(5 - data.calificacion)
    : '—';
  return adminLayout({
    direccion: data.direccion,
    badge: 'Testimonio',
    badgeColor: ACCENT.testimonio,
    title: 'Nueva solicitud de testimonio',
    subtitle: `${new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
    rows: [
      dataRow('Nombre',       data.nombre,  false),
      dataRow('Email',        `<a href="mailto:${data.email}" style="color:${BLUE};text-decoration:none;">${data.email}</a>`, true),
      dataRow('Programa',     data.programa || '—', false),
      dataRow('País / Ciudad', data.pais || '—',    true),
      dataRow('Calificación', `<span style="color:${STAR};font-size:16px;letter-spacing:2px;">${stars}</span>`, false),
      dataRow('Foto',         data.tieneFoto ? '✅ Incluida (ver en Studio)' : '—', true),
    ].join(''),
    note: data.texto,
    noteLabel: 'Testimonio',
    ctaUrl: data.studioUrl,
    ctaLabel: 'Revisar en Sanity Studio',
  });
}

