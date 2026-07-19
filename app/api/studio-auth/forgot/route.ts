import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import crypto from 'crypto';
import { getContactInfo } from '@/lib/sanity/queries';

const resend = new Resend(process.env.RESEND_API_KEY);

function generateResetToken(): string {
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + 15 * 60 * 1000 }),
  ).toString('base64url');

  const sig = crypto
    .createHmac('sha256', process.env.STUDIO_SESSION_TOKEN!)
    .update(payload)
    .digest('base64url');

  return `${payload}.${sig}`;
}

export async function POST(req: NextRequest) {
  const origin = req.nextUrl.origin;

  try {
    const config   = await getContactInfo();
    const adminEmail = process.env.STUDIO_RECOVERY_EMAIL || config.emailAdmin;
    const token    = generateResetToken();
    const resetUrl = `${origin}/studio/reset?token=${token}`;

    await resend.emails.send({
      from: 'CILC Studio <onboarding@resend.dev>',
      to:   adminEmail,
      subject: 'Recuperación de acceso al Studio — CILC',
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
        <body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
            <tr><td align="center">
              <table width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                <!-- Header -->
                <tr>
                  <td style="background:#0D3494;padding:28px 32px;">
                    <p style="margin:0;font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">CILC Studio</p>
                    <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.65);">Recuperación de contraseña</p>
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="padding:32px;">
                    <p style="margin:0 0 16px;font-size:15px;color:#0f172a;line-height:1.6;">
                      Recibimos una solicitud para recuperar el acceso al Studio de CILC.
                      Haz clic en el botón para crear una nueva contraseña.
                    </p>
                    <p style="margin:0 0 24px;font-size:13px;color:#64748b;">
                      Este enlace es válido por <strong>15 minutos</strong> y solo funciona una vez.
                      Si no solicitaste esto, ignora este correo.
                    </p>
                    <!-- CTA -->
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="border-radius:10px;background:#1B67E8;">
                          <a href="${resetUrl}"
                            style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:-0.01em;">
                            Cambiar contraseña →
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:24px 0 0;font-size:11px;color:#94a3b8;word-break:break-all;">
                      O copia este enlace: ${resetUrl}
                    </p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="padding:16px 32px;border-top:1px solid #e2e8f0;background:#f8fafc;">
                    <p style="margin:0;font-size:11px;color:#94a3b8;">
                      © ${new Date().getFullYear()} Canadian &amp; International Language Centers
                    </p>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error desconocido';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
