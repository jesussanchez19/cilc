import Link from 'next/link';
import { getContactInfo } from '@/lib/sanity/queries';

export const metadata = {
  title: 'Términos y Condiciones | CILC',
  description: 'Términos y condiciones de uso del sitio web y servicios de Canadian & International Language Centers.',
};

const FECHA = '11 de julio de 2026';

export default async function TerminosPage() {
  // Igual que en el aviso de privacidad: el correo se gestiona desde
  // "Email de contacto" en Configuración del sitio, nunca el de seguridad.
  const { emailAdmin } = await getContactInfo();

  return (
    <main className="bg-white min-h-screen">

      {/* Hero */}
      <section className="py-16 text-center" style={{ background: 'var(--dark)' }}>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3"
          style={{ letterSpacing: '-0.03em' }}>
          Términos y Condiciones
        </h1>
        <p className="text-slate-400 text-sm">Última actualización: {FECHA}</p>
      </section>

      {/* Contenido */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-10 text-slate-700 text-[15px] leading-relaxed">

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">1. Aceptación de los términos</h2>
          <p>
            Al acceder y utilizar el sitio web de <strong>Canadian &amp; International Language Centers, S.C.
            (CILC)</strong>, ubicada en Av. Insurgentes Sur 863, Piso 7, Col. Nápoles, C.P. 03810, CDMX,
            México, usted acepta quedar sujeto a los presentes Términos y Condiciones. Si no está de acuerdo
            con alguno de ellos, le pedimos abstenerse de utilizar nuestros servicios.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">2. Descripción de servicios</h2>
          <p>CILC actúa como agencia intermediaria especializada en programas de estudio en el extranjero. Nuestros servicios incluyen, sin limitarse a:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Asesoría y orientación personalizada sin costo para el estudiante.</li>
            <li>Gestión de inscripciones ante instituciones educativas en el extranjero.</li>
            <li>Apoyo en trámites de visa, seguro médico y logística de viaje.</li>
            <li>Programas: Idiomas en el Extranjero, Au Pair, Años Académicos, Estudia y Trabaja, Formación Corporativa e Idiomas en Línea.</li>
          </ul>
          <p className="mt-3 text-sm text-slate-500">
            CILC actúa como intermediario y no es responsable directa de los servicios prestados por las
            instituciones educativas, familias anfitrionas u otros terceros en el extranjero.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">3. Proceso de contratación</h2>
          <p>
            La solicitud de un programa a través de nuestro sitio o asesores constituye únicamente una
            manifestación de interés. El contrato de servicios se perfecciona mediante la firma del convenio
            correspondiente y el pago del anticipo establecido. Hasta ese momento CILC no asume obligación de
            reserva o inscripción.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">4. Pagos y política de cancelación</h2>
          <p>
            Los costos, formas de pago, anticipos y política de cancelación o reembolsos se establecen de
            forma individual en el contrato de servicios que se firma con cada cliente, de acuerdo con el
            programa y destino elegidos.
          </p>
          <p className="mt-2">
            En términos generales, los pagos realizados a instituciones educativas o proveedores en el
            extranjero están sujetos a las políticas propias de cada institución, las cuales serán informadas
            al cliente antes de cualquier pago.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">5. Obligaciones del usuario</h2>
          <p>Al utilizar nuestros servicios, usted se compromete a:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Proporcionar información veraz, completa y actualizada.</li>
            <li>Cumplir con los requisitos y documentos solicitados en los plazos acordados.</li>
            <li>Respetar las políticas de las instituciones educativas y países de destino.</li>
            <li>Hacer uso del sitio web de manera lícita y no perturbadora.</li>
            <li>No reproducir, distribuir ni comercializar el contenido del sitio sin autorización expresa.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">6. Limitación de responsabilidad</h2>
          <p>CILC no será responsable por:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Decisiones migratorias de embajadas o consulados (aprobación o rechazo de visas).</li>
            <li>Cambios en programas, costos o condiciones decididos por las instituciones educativas.</li>
            <li>Situaciones de caso fortuito o fuerza mayor (desastres naturales, pandemias, conflictos, etc.).</li>
            <li>Daños directos o indirectos derivados del uso del sitio web o la información contenida en él.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">7. Propiedad intelectual</h2>
          <p>
            Todo el contenido del sitio web de CILC — incluyendo textos, imágenes, logotipos, diseño y código —
            es propiedad de Canadian &amp; International Language Centers, S.C. o de sus respectivos titulares,
            y está protegido por las leyes mexicanas e internacionales de propiedad intelectual.
          </p>
          <p className="mt-2">
            Queda prohibida su reproducción total o parcial sin autorización escrita de CILC.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">8. Uso del sitio web</h2>
          <p>
            El sitio web se proporciona "tal como está". CILC no garantiza disponibilidad ininterrumpida ni
            ausencia de errores. Nos reservamos el derecho de modificar, suspender o discontinuar cualquier
            parte del sitio sin previo aviso.
          </p>
          <p className="mt-2">
            Los enlaces a sitios externos se incluyen únicamente como referencia; CILC no es responsable de
            su contenido ni disponibilidad.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">9. Modificaciones</h2>
          <p>
            CILC se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Los
            cambios entrarán en vigor al ser publicados en esta página. El uso continuado del sitio o los
            servicios posterior a la publicación de cambios implica la aceptación de los mismos.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">10. Legislación aplicable y jurisdicción</h2>
          <p>
            Estos Términos y Condiciones se rigen por las leyes vigentes de los Estados Unidos Mexicanos.
            Para cualquier controversia derivada de los mismos, las partes se someten a la jurisdicción de
            los tribunales competentes de la Ciudad de México, renunciando a cualquier otro fuero que pudiera
            corresponderles por razón de sus domicilios presentes o futuros.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">11. Contacto</h2>
          <p>
            Para cualquier duda relacionada con estos términos, puede contactarnos en:{' '}
            <a href={`mailto:${emailAdmin}`} className="text-blue-600 hover:underline">{emailAdmin}</a>
            {' '}o llamarnos al <a href="tel:+525518944494" className="text-blue-600 hover:underline">55 1894 4494</a>.
          </p>
        </section>

        <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-6">
          <Link href="/aviso-de-privacidad"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition">
            Aviso de Privacidad
          </Link>
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
