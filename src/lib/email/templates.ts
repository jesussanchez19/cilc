const BRAND = 'CILC — Canadian & International Language Centers';
const BRAND_COLOR = '#1d4ed8';

function baseLayout(content: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;max-width:600px;width:100%;">
        <tr>
          <td style="background:${BRAND_COLOR};padding:24px 32px;">
            <h1 style="margin:0;color:#ffffff;font-size:22px;">${BRAND}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            ${content}
          </td>
        </tr>
        <tr>
          <td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:12px;color:#6b7280;text-align:center;">
              © ${new Date().getFullYear()} CILC. Av. Insurgentes Sur 863, Piso 7, CDMX, México.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();
}

export function contactAdminHtml(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return baseLayout(`
    <h2 style="margin:0 0 16px;color:#111827;font-size:18px;">Nuevo mensaje de contacto</h2>
    <table cellpadding="0" cellspacing="0" width="100%">
      <tr><td style="padding:6px 0;color:#6b7280;width:120px;">Nombre</td><td style="padding:6px 0;color:#111827;font-weight:bold;">${data.name}</td></tr>
      <tr><td style="padding:6px 0;color:#6b7280;">Email</td><td style="padding:6px 0;"><a href="mailto:${data.email}" style="color:${BRAND_COLOR};">${data.email}</a></td></tr>
      <tr><td style="padding:6px 0;color:#6b7280;">Asunto</td><td style="padding:6px 0;color:#111827;">${data.subject}</td></tr>
    </table>
    <hr style="margin:20px 0;border:none;border-top:1px solid #e5e7eb;"/>
    <p style="margin:0 0 8px;color:#6b7280;font-size:14px;">Mensaje:</p>
    <p style="margin:0;color:#111827;line-height:1.6;">${data.message.replace(/\n/g, '<br/>')}</p>
  `);
}

export function contactUserHtml(name: string): string {
  return baseLayout(`
    <h2 style="margin:0 0 16px;color:#111827;font-size:18px;">Hemos recibido tu mensaje, ${name}</h2>
    <p style="margin:0 0 16px;color:#374151;line-height:1.6;">
      Gracias por contactarnos. Nuestro equipo revisará tu mensaje y te responderá en menos de <strong>24 horas hábiles</strong>.
    </p>
    <p style="margin:0 0 24px;color:#374151;line-height:1.6;">
      Si tienes alguna duda urgente, puedes escribirnos directamente por WhatsApp:
    </p>
    <a href="https://wa.me/525518944494" style="display:inline-block;background:#16a34a;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">
      Abrir WhatsApp
    </a>
    <p style="margin:24px 0 0;color:#6b7280;font-size:14px;">
      — El equipo de CILC
    </p>
  `);
}

export function quoteAdminHtml(data: {
  name: string;
  email: string;
  phone: string;
  program: string;
  message?: string;
}): string {
  return baseLayout(`
    <h2 style="margin:0 0 16px;color:#111827;font-size:18px;">Nueva solicitud de cotización</h2>
    <table cellpadding="0" cellspacing="0" width="100%">
      <tr><td style="padding:6px 0;color:#6b7280;width:120px;">Nombre</td><td style="padding:6px 0;color:#111827;font-weight:bold;">${data.name}</td></tr>
      <tr><td style="padding:6px 0;color:#6b7280;">Email</td><td style="padding:6px 0;"><a href="mailto:${data.email}" style="color:${BRAND_COLOR};">${data.email}</a></td></tr>
      <tr><td style="padding:6px 0;color:#6b7280;">Teléfono</td><td style="padding:6px 0;color:#111827;">${data.phone}</td></tr>
      <tr><td style="padding:6px 0;color:#6b7280;">Programa</td><td style="padding:6px 0;color:#111827;font-weight:bold;">${data.program}</td></tr>
    </table>
    ${data.message ? `
    <hr style="margin:20px 0;border:none;border-top:1px solid #e5e7eb;"/>
    <p style="margin:0 0 8px;color:#6b7280;font-size:14px;">Mensaje adicional:</p>
    <p style="margin:0;color:#111827;line-height:1.6;">${data.message.replace(/\n/g, '<br/>')}</p>
    ` : ''}
  `);
}

export function quoteUserHtml(name: string, program: string): string {
  return baseLayout(`
    <h2 style="margin:0 0 16px;color:#111827;font-size:18px;">Tu solicitud ha sido recibida, ${name}</h2>
    <p style="margin:0 0 16px;color:#374151;line-height:1.6;">
      Recibimos tu solicitud de información para el programa <strong>${program}</strong>. Un asesor especializado se pondrá en contacto contigo en menos de <strong>24 horas hábiles</strong>.
    </p>
    <p style="margin:0 0 24px;color:#374151;line-height:1.6;">
      ¿Quieres una respuesta más rápida? Escríbenos por WhatsApp:
    </p>
    <a href="https://wa.me/525518944494" style="display:inline-block;background:#16a34a;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">
      Abrir WhatsApp
    </a>
    <p style="margin:24px 0 0;color:#6b7280;font-size:14px;">
      — El equipo de CILC
    </p>
  `);
}

export function subscribeAdminHtml(email: string): string {
  return baseLayout(`
    <h2 style="margin:0 0 16px;color:#111827;font-size:18px;">Nueva suscripción al newsletter</h2>
    <p style="margin:0;color:#374151;">Email: <strong>${email}</strong></p>
  `);
}
