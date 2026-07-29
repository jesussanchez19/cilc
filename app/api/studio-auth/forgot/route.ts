import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { FROM_STUDIO } from '@/lib/email/sender';
import { getContactInfo } from '@/lib/sanity/queries';
import { logoBlock, EMAIL_COLORS as C } from '@/lib/email/templates';
import { createResetToken, RESET_TTL_MINUTES } from '@/lib/auth/resetToken';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const origin = req.nextUrl.origin;

  try {
    const config = await getContactInfo();

    // Sanity manda, y la variable de entorno queda solo como respaldo. Al
    // revés (env primero) el campo del Studio no haría nada mientras la
    // variable estuviera puesta, y quien lo editara no se enteraría.
    // Si no hay ninguno se cae a emailAdmin para no perder el correo.
    const destino =
      config.emailSeguridad?.trim() ||
      process.env.STUDIO_RECOVERY_EMAIL?.trim() ||
      config.emailAdmin;

    if (!destino) {
      console.error('[studio-auth/forgot] no hay ningún correo de recuperación configurado');
      return NextResponse.json(
        { error: 'No hay un correo de recuperación configurado.' },
        { status: 500 },
      );
    }
    const token    = await createResetToken();
    const resetUrl = `${origin}/studio/reset?token=${token}`;

    await resend.emails.send({
      from: FROM_STUDIO,
      to:   destino,
      subject: 'Recuperación de acceso al Studio — CILC',
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
        <body style="margin:0;padding:0;background:${C.canvas};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
            <tr><td align="center">
              <table width="520" cellpadding="0" cellspacing="0" style="background:${C.white};border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                <!-- Header -->
                <tr>
                  <td style="background:${C.blueDark};padding:28px 32px;">
                    ${logoBlock(32)}
                    <p style="margin:10px 0 0;font-size:13px;color:rgba(255,255,255,0.65);">Recuperación de contraseña</p>
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="padding:32px;">
                    <p style="margin:0 0 16px;font-size:15px;color:${C.dark};line-height:1.6;">
                      Recibimos una solicitud para recuperar el acceso al Studio de CILC.
                      Haz clic en el botón para crear una nueva contraseña.
                    </p>
                    <p style="margin:0 0 24px;font-size:13px;color:${C.textMuted};">
                      Este enlace es válido por <strong>${RESET_TTL_MINUTES} minutos</strong> y solo funciona una vez.
                      Si no solicitaste esto, ignora este correo.
                    </p>
                    <!-- CTA -->
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="border-radius:10px;background:${C.blue};">
                          <a href="${resetUrl}"
                            style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:700;color:${C.white};text-decoration:none;letter-spacing:-0.01em;">
                            Cambiar contraseña →
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:24px 0 0;font-size:11px;color:${C.textSubtle};word-break:break-all;">
                      O copia este enlace: ${resetUrl}
                    </p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="padding:16px 32px;border-top:1px solid ${C.border};background:${C.surface3};">
                    <p style="margin:0;font-size:11px;color:${C.textSubtle};">
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
