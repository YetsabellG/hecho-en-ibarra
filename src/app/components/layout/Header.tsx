export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <a
          href="/"
          className="text-2xl font-bold tracking-wide text-[#C54B43]"
        >
          HECHO EN IBARRA
        </a>

        <nav className="hidden lg:flex items-center gap-8 text-gray-700">

          <a href="/">Inicio</a>

          <a href="/emprendedores">
            Emprendedores
          </a>

          <a href="/">
  Categorías
</a>

<a href="/eventos">
  Eventos
</a>

<a href="/promociones">
  Promociones
</a>

<a href="/#planes">
  Planes
</a>

        </nav>

        <a href="/dashboard">
  <button className="bg-[#C54B43] hover:bg-[#A53C35] text-white px-6 py-2 rounded-full transition">
    Mi Panel
  </button>
</a>

      </div>

    </header>
  );
}