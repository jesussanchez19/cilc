import Link from 'next/link';
import { getContactInfo } from '@/lib/sanity/queries';

export const metadata = {
  title: 'Aviso de Privacidad | CILC',
  description: 'Aviso de privacidad de Canadian & International Language Centers conforme a la LFPDPPP.',
};

const FECHA = '11 de julio de 2026';

export default async function AvisoPrivacidadPage() {
  /**
   * El correo sale de "Email de contacto" en Configuración del sitio, para que
   * se pueda cambiar desde el Studio sin tocar código.
   *
   * Antes estaba escrito a mano y apuntaba a un dominio de otra empresa, así que
   * las solicitudes de derechos de datos que exige la LFPDPPP no llegaban a
   * nadie.
   *
   * Nunca el "Email de seguridad": ese recibe los enlaces de recuperación de la
   * contraseña del Studio, y publicarlo diría a un atacante a qué buzón apuntar
   * para tomar el control del panel.
   */
  const { emailAdmin } = await getContactInfo();

  return (
    <main className="bg-white min-h-screen">

      {/* Hero */}
      <section className="py-16 text-center" style={{ background: 'var(--dark)' }}>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3"
          style={{ letterSpacing: '-0.03em' }}>
          Aviso de Privacidad
        </h1>
        <p className="text-slate-400 text-sm">Última actualización: {FECHA}</p>
      </section>

      {/* Contenido */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-10 text-slate-700 text-[15px] leading-relaxed">

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">1. Responsable del tratamiento</h2>
          <p>
            <strong>Canadian &amp; International Language Centers, S.C. (CILC)</strong>, con domicilio en
            Av. Insurgentes Sur 863, Piso 7, Col. Nápoles, C.P. 03810, Ciudad de México, México,
            es responsable del uso y protección de sus datos personales, en términos de lo dispuesto por la{' '}
            <em>Ley Federal de Protección de Datos Personales en Posesión de los Particulares</em> (LFPDPPP)
            y su Reglamento.
          </p>
          <p className="mt-2">
            Contacto de privacidad:{' '}
            <a href={`mailto:${emailAdmin}`} className="text-blue-600 hover:underline">{emailAdmin}</a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">2. Datos personales que recabamos</h2>
          <p>Podemos recabar las siguientes categorías de datos personales:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Datos de identificación: nombre completo.</li>
            <li>Datos de contacto: correo electrónico, número de teléfono.</li>
            <li>Datos académicos y de preferencias: programa de interés, destino, ciudad y país de residencia.</li>
            <li>Datos de imagen: fotografía personal proporcionada voluntariamente al enviar un testimonio.</li>
            <li>Contenido generado: texto de testimonio, calificación de experiencia.</li>
          </ul>
          <p className="mt-3 text-sm text-slate-500">
            No recabamos datos personales sensibles (salud, biometría, orientación sexual, etc.).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">3. Finalidades del tratamiento</h2>
          <p><strong>Finalidades primarias (necesarias para la relación):</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Responder consultas, solicitudes de cotización y asesoría.</li>
            <li>Gestionar el proceso de inscripción a programas de estudio en el extranjero.</li>
            <li>Administrar el formulario de testimonios y, previo consentimiento, publicar su testimonio en nuestro sitio web.</li>
          </ul>
          <p className="mt-4"><strong>Finalidades secundarias (opcionales):</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Envío de información sobre nuevos programas, destinos y promociones.</li>
            <li>Análisis estadísticos internos para mejorar nuestros servicios.</li>
          </ul>
          <p className="mt-3 text-sm text-slate-500">
            Si no desea que sus datos sean utilizados para las finalidades secundarias, puede manifestarlo
            enviando un correo a{' '}
            <a href={`mailto:${emailAdmin}`} className="text-blue-600 hover:underline">{emailAdmin}</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">4. Transferencia de datos</h2>
          <p>
            Sus datos personales no serán transferidos a terceros sin su consentimiento, salvo en los casos
            previstos en el artículo 37 de la LFPDPPP (obligaciones legales, autoridades competentes, etc.).
          </p>
          <p className="mt-2">
            Para la operación del sitio utilizamos proveedores de servicios tecnológicos (alojamiento web,
            correo electrónico, CMS) que actúan como encargados del tratamiento y están sujetos a obligaciones
            de confidencialidad equivalentes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">5. Derechos ARCO</h2>
          <p>
            Usted tiene derecho a <strong>Acceder</strong>, <strong>Rectificar</strong>,{' '}
            <strong>Cancelar</strong> u <strong>Oponerse</strong> al tratamiento de sus datos personales
            (derechos ARCO), así como a revocar el consentimiento otorgado.
          </p>
          <p className="mt-2">
            Para ejercer sus derechos, envíe una solicitud a{' '}
            <a href={`mailto:${emailAdmin}`} className="text-blue-600 hover:underline">{emailAdmin}</a>{' '}
            indicando: nombre completo, descripción clara del derecho que desea ejercer y copia de
            identificación oficial. Responderemos en un plazo máximo de 20 días hábiles.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">6. Uso de cookies</h2>
          <p>
            Nuestro sitio web puede utilizar cookies y tecnologías similares para mejorar la experiencia de
            navegación y recopilar datos estadísticos de uso de forma anónima. Puede desactivar las cookies
            desde la configuración de su navegador; esto puede afectar algunas funcionalidades del sitio.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">7. Cambios al aviso de privacidad</h2>
          <p>
            CILC se reserva el derecho de actualizar este aviso de privacidad. Cualquier modificación será
            publicada en esta misma página con la fecha de actualización correspondiente. Le recomendamos
            revisarlo periódicamente.
          </p>
        </section>

        <div className="pt-6 border-t border-slate-100">
          <Link href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
