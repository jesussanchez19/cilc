const STATS = [
  { value: '23+', label: 'Años de experiencia', desc: 'Abriendo puertas al mundo desde 2001' },
  { value: '6',   label: 'Programas disponibles', desc: 'Diseñados para cada etapa de tu vida' },
  { value: '12+', label: 'Destinos en el mundo', desc: 'Canadá, USA, Inglaterra, Irlanda y más' },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STATS.map(({ value, label, desc }) => (
            <div key={label} className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-2">{value}</div>
              <p className="text-gray-900 text-lg font-semibold mb-1">{label}</p>
              <p className="text-gray-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
