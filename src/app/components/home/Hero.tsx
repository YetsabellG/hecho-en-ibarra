import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')",
        }}
      />

      {/* Oscurecer imagen */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Contenido */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 text-center text-white">

        <p className="uppercase tracking-[6px] text-sm mb-5">
          HECHO EN IBARRA
        </p>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Descubre el talento
          <br />
          local de Ibarra
        </h1>

        <p className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-gray-200">
          Compra productos locales, descubre emprendimientos y apoya el crecimiento
          económico de nuestra ciudad.
        </p>

        {/* Buscador */}
        <div className="mt-10 max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-3 flex flex-col md:flex-row gap-3">

          <input
            type="text"
            placeholder="¿Qué emprendimiento o producto buscas?"
            className="flex-1 px-6 py-4 rounded-xl outline-none text-gray-700"
          />

          <button className="bg-[#C54B43] hover:bg-[#A53C35] text-white px-8 rounded-xl transition">
            Buscar
          </button>

        </div>

        {/* Botones */}
        <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">

          <a href="/explorar">
  <Button>
    Explorar emprendimientos
  </Button>
</a>

          <Button variant="secondary">
            Registrar mi negocio
          </Button>

        </div>

      </div>

    </section>
  );
}