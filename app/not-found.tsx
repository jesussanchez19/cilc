export default function NotFound() {
  return (
    <div className="py-32 text-center">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-6xl font-bold mb-4 text-gray-900">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Página no encontrada</p>
        <p className="text-gray-600 mb-8">
          Lo sentimos, la página que buscas no existe.
        </p>
        <a
          href="/"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Volver al Inicio
        </a>
      </div>
    </div>
  );
}
