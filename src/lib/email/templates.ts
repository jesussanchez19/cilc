const BLUE      = '#1B67E8';
const DARK_BLUE = '#0D3494';
const YEAR      = new Date().getFullYear();

// ── Shared helpers ────────────────────────────────────────────────────────────

function dataRow(label: string, value: string, shade = false): string {
  const bg = shade ? '#f5f8ff' : '#ffffff';
  return `
  <tr>
    <td style="padding:11px 16px;background:${bg};border-bottom:1px solid #e8eef8;width:130px;vertical-align:top;">
      <span style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;">${label}</span>
    </td>
    <td style="padding:11px 16px;background:${bg};border-bottom:1px solid #e8eef8;vertical-align:top;">
      <span style="font-size:14px;color:#0f172a;font-weight:500;">${value}</span>
    </td>
  </tr>`;
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
}): string {
  const accent = opts.badgeColor ?? BLUE;
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${opts.title}</title>
</head>
<body style="margin:0;padding:0;background:#edf2fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#edf2fb;padding:36px 0;">
<tr><td align="center">
<table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

  <!-- HEADER -->
  <tr>
    <td style="background:${DARK_BLUE};padding:0;border-radius:14px 14px 0 0;overflow:hidden;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:22px 28px;">
            <span style="font-size:24px;font-weight:900;color:#ffffff;letter-spacing:-0.04em;font-family:Georgia,serif;">CILC</span>
            <span style="display:block;font-size:10px;font-weight:600;color:rgba(255,255,255,0.45);margin-top:3px;text-transform:uppercase;letter-spacing:0.12em;">Canadian &amp; International Language Centers</span>
          </td>
          <td align="right" style="padding:22px 28px;">
            <span style="display:inline-block;background:${accent};color:#ffffff;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;padding:5px 14px;border-radius:100px;">${opts.badge}</span>
          </td>
        </tr>
        <!-- accent bar -->
        <tr><td colspan="2" style="padding:0;height:3px;background:${accent};"></td></tr>
      </table>
    </td>
  </tr>

  <!-- TITLE -->
  <tr>
    <td style="background:#ffffff;padding:24px 28px 12px;border-left:1px solid #dce8f8;border-right:1px solid #dce8f8;">
      <h1 style="margin:0 0 4px;font-size:20px;font-weight:800;color:#0f172a;letter-spacing:-0.02em;">${opts.title}</h1>
      ${opts.subtitle ? `<p style="margin:0;font-size:13px;color:#64748b;">${opts.subtitle}</p>` : ''}
    </td>
  </tr>

  <!-- DATA TABLE -->
  <tr>
    <td style="background:#ffffff;padding:0 28px 20px;border-left:1px solid #dce8f8;border-right:1px solid #dce8f8;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2eaf7;border-radius:10px;overflow:hidden;">
        ${opts.rows}
      </table>
    </td>
  </tr>

  ${opts.note ? `
  <!-- NOTE -->
  <tr>
    <td style="background:#ffffff;padding:0 28px 20px;border-left:1px solid #dce8f8;border-right:1px solid #dce8f8;">
      <div style="border-left:3px solid ${accent};padding:12px 16px;background:#f5f9ff;border-radius:0 8px 8px 0;">
        <p style="margin:0 0 5px;font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.1em;">${opts.noteLabel ?? 'Mensaje'}</p>
        <p style="margin:0;font-size:14px;color:#1e293b;line-height:1.7;">${opts.note.replace(/\n/g, '<br/>')}</p>
      </div>
    </td>
  </tr>
  ` : ''}

  ${opts.ctaUrl ? `
  <!-- CTA -->
  <tr>
    <td style="background:#ffffff;padding:4px 28px 28px;border-left:1px solid #dce8f8;border-right:1px solid #dce8f8;">
      <a href="${opts.ctaUrl}" style="display:inline-block;background:${BLUE};color:#ffffff;font-size:13px;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none;letter-spacing:0.01em;">${opts.ctaLabel ?? 'Ver ahora'} &rarr;</a>
    </td>
  </tr>
  ` : ''}

  <!-- FOOTER -->
  <tr>
    <td style="background:#f0f5fc;padding:16px 28px;border:1px solid #dce8f8;border-top:none;border-radius:0 0 14px 14px;">
      <p style="margin:0;font-size:11px;color:#94a3b8;text-align:center;">
        &copy; ${YEAR} CILC &nbsp;&bull;&nbsp; Av. Insurgentes Sur 863, Piso 7, CDMX, M&eacute;xico
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
}): string {
  const phone = opts.whatsapp ?? '525518944494';
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${opts.title}</title>
</head>
<body style="margin:0;padding:0;background:#edf2fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#edf2fb;padding:36px 0;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

  <!-- HEADER -->
  <tr>
    <td style="background:${DARK_BLUE};padding:24px 32px;border-radius:14px 14px 0 0;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <span style="font-size:24px;font-weight:900;color:#ffffff;letter-spacing:-0.04em;font-family:Georgia,serif;">CILC</span>
            <span style="display:block;font-size:10px;font-weight:600;color:rgba(255,255,255,0.45);margin-top:3px;text-transform:uppercase;letter-spacing:0.12em;">Canadian &amp; International Language Centers</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr><td style="height:3px;background:${BLUE};"></td></tr>

  <!-- BODY -->
  <tr>
    <td style="background:#ffffff;padding:36px 32px;border-left:1px solid #dce8f8;border-right:1px solid #dce8f8;">
      <!-- Checkmark icon -->
      <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        <tr>
          <td style="width:48px;height:48px;background:#e8f1ff;border-radius:50%;text-align:center;vertical-align:middle;">
            <span style="font-size:22px;line-height:48px;">&#10003;</span>
          </td>
        </tr>
      </table>
      ${opts.body}
    </td>
  </tr>

  <!-- WHATSAPP CTA -->
  <tr>
    <td style="background:#f0faf4;padding:20px 32px;border:1px solid #dce8f8;border-top:1px solid #d1fae5;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align:middle;">
            <p style="margin:0 0 2px;font-size:13px;font-weight:700;color:#15803d;">¿Respuesta inmediata?</p>
            <p style="margin:0;font-size:12px;color:#4ade80;color:#166534;">Escríbenos por WhatsApp y respondemos en minutos.</p>
          </td>
          <td align="right" style="vertical-align:middle;">
            <a href="https://wa.me/${phone}?text=Hola%2C%20me%20interesa%20información%20sobre%20estudios%20en%20el%20extranjero"
               style="display:inline-block;background:#16a34a;color:#ffffff;font-size:12px;font-weight:700;padding:10px 20px;border-radius:8px;text-decoration:none;">
              Abrir WhatsApp
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- FOOTER -->
  <tr>
    <td style="background:#f0f5fc;padding:16px 32px;border:1px solid #dce8f8;border-top:none;border-radius:0 0 14px 14px;">
      <p style="margin:0;font-size:11px;color:#94a3b8;text-align:center;">
        &copy; ${YEAR} CILC &nbsp;&bull;&nbsp; Av. Insurgentes Sur 863, Piso 7, CDMX, M&eacute;xico
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
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return adminLayout({
    badge: 'Nuevo Contacto',
    title: 'Mensaje de contacto',
    subtitle: `Recibido a las ${new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })} · ${new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
    rows: [
      dataRow('Nombre',  data.name,    false),
      dataRow('Email',   `<a href="mailto:${data.email}" style="color:${BLUE};text-decoration:none;">${data.email}</a>`, true),
      dataRow('Asunto',  data.subject, false),
    ].join(''),
    note: data.message,
    noteLabel: 'Mensaje',
  });
}

export function contactUserHtml(name: string, whatsapp?: string): string {
  return userLayout({
    title: 'Recibimos tu mensaje',
    whatsapp,
    body: `
      <h2 style="margin:0 0 12px;font-size:22px;font-weight:800;color:#0f172a;letter-spacing:-0.02em;">¡Hola, ${name}!</h2>
      <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">
        Recibimos tu mensaje y nuestro equipo lo está revisando. Te responderemos en menos de <strong style="color:#0f172a;">24 horas hábiles</strong>.
      </p>
      <p style="margin:0;font-size:14px;color:#64748b;line-height:1.6;">
        Mientras tanto, si tienes alguna duda urgente no dudes en contactarnos por WhatsApp — respondemos en minutos.
      </p>
    `,
  });
}

export function quoteAdminHtml(data: {
  name: string;
  email: string;
  phone: string;
  program: string;
  message?: string;
}): string {
  return adminLayout({
    badge: 'Cotización',
    badgeColor: '#7c3aed',
    title: 'Nueva solicitud de cotización',
    subtitle: `${new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
    rows: [
      dataRow('Nombre',    data.name,    false),
      dataRow('Email',     `<a href="mailto:${data.email}" style="color:${BLUE};text-decoration:none;">${data.email}</a>`, true),
      dataRow('Teléfono',  `<a href="tel:${data.phone}" style="color:${BLUE};text-decoration:none;">${data.phone}</a>`, false),
      dataRow('Programa',  `<strong>${data.program}</strong>`, true),
    ].join(''),
    note: data.message,
    noteLabel: 'Mensaje adicional',
  });
}

export function quoteUserHtml(name: string, program: string, whatsapp?: string): string {
  return userLayout({
    title: 'Solicitud recibida',
    whatsapp,
    body: `
      <h2 style="margin:0 0 12px;font-size:22px;font-weight:800;color:#0f172a;letter-spacing:-0.02em;">¡Hola, ${name}!</h2>
      <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">
        Recibimos tu solicitud de información para el programa <strong style="color:#0f172a;">${program}</strong>. Un asesor especializado te contactará en menos de <strong style="color:#0f172a;">24 horas hábiles</strong>.
      </p>
      <div style="background:#f5f9ff;border:1px solid #dce8f8;border-radius:8px;padding:14px 18px;margin-bottom:16px;">
        <p style="margin:0;font-size:13px;color:#475569;line-height:1.6;">
          📋 <strong>Programa seleccionado:</strong> ${program}
        </p>
      </div>
      <p style="margin:0;font-size:14px;color:#64748b;line-height:1.6;">
        Si necesitas una respuesta más rápida, escríbenos por WhatsApp.
      </p>
    `,
  });
}

export function testimonioAdminHtml(data: {
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
    badge: 'Testimonio',
    badgeColor: '#0891b2',
    title: 'Nueva solicitud de testimonio',
    subtitle: `${new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
    rows: [
      dataRow('Nombre',       data.nombre,  false),
      dataRow('Email',        `<a href="mailto:${data.email}" style="color:${BLUE};text-decoration:none;">${data.email}</a>`, true),
      dataRow('Programa',     data.programa || '—', false),
      dataRow('País / Ciudad', data.pais || '—',    true),
      dataRow('Calificación', `<span style="color:#f59e0b;font-size:16px;letter-spacing:2px;">${stars}</span>`, false),
      dataRow('Foto',         data.tieneFoto ? '✅ Incluida (ver en Studio)' : '—', true),
    ].join(''),
    note: data.texto,
    noteLabel: 'Testimonio',
    ctaUrl: data.studioUrl,
    ctaLabel: 'Revisar en Sanity Studio',
  });
}

export function subscribeAdminHtml(email: string): string {
  return adminLayout({
    badge: 'Newsletter',
    badgeColor: '#059669',
    title: 'Nueva suscripción al newsletter',
    rows: dataRow('Email', `<a href="mailto:${email}" style="color:${BLUE};text-decoration:none;">${email}</a>`, false),
  });
}
