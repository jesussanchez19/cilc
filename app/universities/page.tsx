import { universities } from '@/lib/data/universities';
import Card from '@/components/shared/Card';

export default function UniversitiesPage() {
  const sortedUniversities = [...universities].sort((a, b) => a.ranking - b.ranking);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Universidades</h1>
          <p className="text-xl text-gray-600">
            Las mejores universidades del mundo para continuar tu educación.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedUniversities.map((uni) => (
            <Card
              key={uni.id}
              title={uni.name}
              description={`${uni.country} • Ranking #${uni.ranking}`}
              image={uni.image}
              footer={
                <div className="space-y-2">
                  <div className="text-sm">
                    💰 <span className="font-semibold">${uni.costPerYear.toLocaleString()}/año</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {uni.specialties.slice(0, 2).map((spec) => (
                      <span key={spec} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
