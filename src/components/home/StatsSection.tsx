import { programs } from '@/lib/data/programs';
import { countries } from '@/lib/data/countries';

export default function StatsSection() {
  const STATS = [
    { value: '23+',                    label: 'Años de experiencia',   desc: 'Abriendo puertas al mundo desde 2001' },
    { value: `${programs.length}`,     label: 'Programas disponibles', desc: 'Diseñados para cada etapa de tu vida' },
    { value: `${countries.length}`,     label: 'Destinos en el mundo',  desc: 'Canadá, USA, Inglaterra, Irlanda y más' },
  ];
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style={{ background: 'rgba(15,23,42,0.07)' }}>
          {STATS.map(({ value, label, desc }, i) => (
            <div
              key={label}
              className="bg-white px-10 py-12 text-center relative group hover:bg-blue-50/40 transition-colors duration-300"
            >
              {/* Number */}
              <div
                className="text-6xl font-extrabold mb-2 gradient-text"
                style={{ letterSpacing: '-0.04em', lineHeight: '1' }}
              >
                {value}
              </div>

              <p className="text-slate-900 text-base font-bold mb-1">{label}</p>
              <p className="text-slate-400 text-sm">{desc}</p>

              {/* Subtle hover accent */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-12 transition-all duration-300 rounded-full"
                style={{ background: 'linear-gradient(90deg, #2563eb, #6366f1)' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
