import HeroBanner from '@/components/home/HeroBanner';
import FeaturedCountries from '@/components/home/FeaturedCountries';
import StatsSection from '@/components/home/StatsSection';

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <FeaturedCountries />
      <StatsSection />

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">¿Listo para cambiar tu vida?</h2>
          <p className="text-xl mb-8">
            Contáctanos hoy y comienza tu aventura académica en el extranjero.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Contactar Ahora
          </a>
        </div>
      </section>
    </div>
  );
}
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
