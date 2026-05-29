import HeroBanner from '@/components/home/HeroBanner';
import FeaturedPrograms from '@/components/home/FeaturedPrograms';
import StatsSection from '@/components/home/StatsSection';

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <FeaturedPrograms />
      <StatsSection />

      {/* Por qué elegirnos */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">¿Por qué elegir CILC?</h2>
            <p className="text-gray-600 text-lg">Más de 23 años abriendo puertas al mundo</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🤝', title: 'Asesoría sin costo', desc: 'Te acompañamos desde el diagnóstico inicial hasta tu regreso. Sin costos de asesoría.' },
              { icon: '🎯', title: 'Diagnóstico personalizado', desc: 'No vendemos paquetes. Diseñamos tu ruta según tu perfil, objetivos y presupuesto.' },
              { icon: '🛡️', title: 'Acompañamiento real', desc: 'Estamos contigo antes, durante y después de tu experiencia internacional.' },
              { icon: '📋', title: 'Trámites simplificados', desc: 'Gestionamos visa, seguro médico, inscripción y logística. Tú solo preocúpate por vivir la experiencia.' },
              { icon: '✅', title: '+23 años de experiencia', desc: 'Hemos ayudado a miles de estudiantes mexicanos a estudiar en el extranjero con éxito.' },
              { icon: '🌍', title: 'Red global de escuelas', desc: 'Trabajamos con instituciones acreditadas en Canadá, USA, Inglaterra, Irlanda y más.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="text-center p-6">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">¿Listo para transformar tu futuro?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Agenda hoy tu Diagnóstico Internacional Estratégico — es gratuito y sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-blue-700 rounded-lg font-bold hover:bg-blue-50 transition"
            >
              Contactar Ahora
            </a>
            <a
              href="https://wa.me/525518944494?text=Hola%2C%20me%20interesa%20información%20sobre%20estudios%20en%20el%20extranjero"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
