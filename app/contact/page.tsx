import ContactForm from '@/components/shared/ContactForm';

export default function ContactPage() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Contacta Con Nosotros</h1>
          <p className="text-xl text-gray-600">
            ¿Tienes preguntas? Nos encantaría escucharte. Completa el formulario y nos pondremos en
            contacto lo antes posible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">📧 Email</h3>
            <p className="text-gray-600">info@estudiosenelextranjero.com</p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">📱 Teléfono</h3>
            <p className="text-gray-600">+52 (55) 1234-5678</p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">📍 Ubicación</h3>
            <p className="text-gray-600">Ciudad de México, México</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-3xl font-bold mb-8">Formulario de Contacto</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
