export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-red-700">
        Hecho en Ibarra
      </h1>

      <p className="mt-4 text-xl text-gray-600">
        Descubre, compra y apoya al talento local de Ibarra.
      </p>

      <button className="mt-8 bg-red-700 text-white px-8 py-3 rounded-full hover:bg-red-800 transition">
        Explorar emprendimientos
      </button>
    </main>
  );
}