import type { Metadata } from 'next';
import ContactForm from '@/components/shared/ContactForm';

export const metadata: Metadata = {
  title: 'Contacto | CILC',
  description: 'Más de 23 años ayudando a estudiantes mexicanos a estudiar en el extranjero. Cuéntanos tu caso y te asesoramos sin costo.',
};

const PHONES = [
  { display: '55 1894 4494', wa: '525518944494' },
  { display: '55 7278 5966', wa: '525572785966' },
  { display: '55 1218 2442', wa: '525512182442' },
];

export default function ContactPage() {
  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Contáctanos</h1>
          <p className="text-xl text-gray-600">
            Más de 23 años ayudando a estudiantes mexicanos a estudiar en el extranjero.
            Cuéntanos tu caso y te asesoramos sin costo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Email */}
          <a
            href="mailto:info@estudiosenelextranjero.com.mx"
            className="bg-blue-50 p-6 rounded-lg hover:bg-blue-100 transition"
          >
            <div className="text-3xl mb-3">📧</div>
            <h3 className="font-bold text-gray-900 mb-1">Email</h3>
            <p className="text-blue-600 text-sm">info@estudiosenelextranjero.com.mx</p>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/525518944494"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-50 p-6 rounded-lg hover:bg-green-100 transition"
          >
            <div className="text-3xl mb-3">💬</div>
            <h3 className="font-bold text-gray-900 mb-1">WhatsApp</h3>
            {PHONES.map((p) => (
              <p key={p.wa} className="text-green-700 text-sm">+52 {p.display}</p>
            ))}
          </a>

          {/* Ubicación */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="text-3xl mb-3">📍</div>
            <h3 className="font-bold text-gray-900 mb-1">Oficina</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Av. Insurgentes Sur 863, Piso 7<br />
              Col. Nápoles, C.P. 03810<br />
              CDMX, México
            </p>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="bg-green-600 text-white p-8 rounded-lg text-center mb-12">
          <h2 className="text-2xl font-bold mb-2">¿Prefieres escribirnos directo?</h2>
          <p className="mb-6 text-green-100">Respondemos en minutos por WhatsApp</p>
          <a
            href="https://wa.me/525518944494?text=Hola%2C%20me%20interesa%20información%20sobre%20estudios%20en%20el%20extranjero"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-white text-green-700 rounded-lg font-bold hover:bg-green-50 transition"
          >
            Abrir WhatsApp
          </a>
        </div>

        {/* Form */}
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-3xl font-bold mb-2">Formulario de Contacto</h2>
          <p className="text-gray-500 mb-8">Te respondemos en menos de 24 horas hábiles.</p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
