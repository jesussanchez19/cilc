import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { FROM_CLIENTE, FROM_WEB } from '@/lib/email/sender';
import { contactSchema, whatsappLeadSchema } from '@/lib/validations/contact';
import { saveLead } from '@/lib/leads';
import { contactAdminHtml, contactUserHtml } from '@/lib/email/templates';
import { getContactInfo } from '@/lib/sanity/queries';

const resend = new Resend(process.env.RESEND_API_KEY);

const RATE_LIMIT = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT.get(ip);

  if (!entry || now > entry.resetAt) {
    RATE_LIMIT.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return false;
  }

  if (entry.count >= 5) return true;

  entry.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Intenta de nuevo en una hora.' },
      { status: 429 }
    );
  }

  const body = await req.json();

  /**
   * Por aquí entran dos formularios: el de contacto, que pide correo, y el chat
   * flotante de WhatsApp, que solo pide nombre y teléfono. Se distinguen por
   * `origen` para no tener que relajar la validación del primero.
   */
  const esWhatsApp = body?.origen === 'whatsapp';
  const result = esWhatsApp
    ? whatsappLeadSchema.safeParse(body)
    : contactSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', fields: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name } = result.data;
  const email   = 'email'   in result.data ? result.data.email   : undefined;
  const phone   = 'phone'   in result.data ? result.data.phone   : undefined;
  const subject = 'subject' in result.data ? result.data.subject : 'Contacto rápido vía WhatsApp';
  const message = 'message' in result.data
    ? result.data.message
    : `Pide que le contacten por WhatsApp al ${phone}.`;

  const [leadGuardado, contactInfo] = await Promise.all([
    saveLead({ type: 'contact', name, email, phone, subject, message }),
    getContactInfo(),
  ]);

  const envios = [
    resend.emails.send({
      from: FROM_WEB,
      to: contactInfo.emailAdmin,
      // Sin correo del interesado no hay a quién responder: dejar aquí una
      // dirección inventada haría que el botón de responder escribiera a
      // cualquiera menos a él. El teléfono va en el cuerpo del aviso.
      ...(email ? { replyTo: email } : {}),
      subject: `[CILC Web] ${subject} — ${name}`,
      html: contactAdminHtml({ name, email, phone, subject, message }),
    }),
  ];

  // La confirmación al cliente solo tiene sentido si dejó un correo. Los leads
  // del chat de WhatsApp no dejan ninguno, y se les responde por WhatsApp.
  if (email) {
    envios.push(
      resend.emails.send({
        from: FROM_CLIENTE,
        to: email,
        subject: 'Recibimos tu mensaje — CILC',
        html: contactUserHtml(name, (contactInfo.telefonos?.find((p) => p.esPrincipal) ?? contactInfo.telefonos?.[0])?.wa),
      }),
    );
  }

  const [adminResult, userResult] = await Promise.all(envios);

  // `userResult` no existe cuando el lead vino sin correo y no se envió nada.
  if (userResult?.error) {
    console.error('[contact] no se pudo enviar la confirmación al cliente:', userResult.error);
  }

  /**
   * Que falle el correo ya no tumba la petición, siempre que la solicitud haya
   * quedado guardada.
   *
   * Antes, un fallo al avisar al administrador devolvía 500 y el visitante veía
   * "Error al enviar" aunque sus datos estuvieran a salvo. Eso era una bomba de
   * relojería mientras no haya dominio propio verificado en Resend: hoy el
   * aviso llega solo porque la dirección del administrador coincide con la
   * cuenta con la que se registró Resend, que es la única a la que el dominio
   * de pruebas puede escribir. El día que se cambie esa dirección por otra
   * —lo primero que hará quien reciba el sitio— Resend responderá 403 y TODOS
   * los formularios empezarían a dar error al visitante.
   *
   * Ahora la solicitud queda en Sanity y se puede consultar en /admin/stats y
   * en el Studio, así que el correo es un aviso, no el registro. Solo se
   * devuelve error cuando no quedó guardada NI se pudo avisar: ahí sí no hay
   * rastro de la solicitud en ninguna parte y el visitante debe saberlo.
   */
  if (adminResult.error) {
    console.error('[contact] no se pudo avisar al administrador:', adminResult.error);

    if (!leadGuardado) {
      console.error('[contact] la solicitud no quedó guardada y tampoco se avisó: se pierde');
      return NextResponse.json({ error: 'Error al enviar el mensaje.' }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
