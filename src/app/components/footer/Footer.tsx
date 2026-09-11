export default function Footer() {
  return (
    <footer className="bg-[#2B2B2B] text-white pt-16 pb-10">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-2xl font-bold text-white">
            HECHO EN IBARRA
          </h2>

          <p className="mt-4 text-gray-300 leading-7">
            La plataforma oficial para descubrir, comprar y apoyar
            el talento local de Ibarra.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            Plataforma
          </h3>

          <ul className="space-y-2 text-gray-300">
            <li>Inicio</li>
            <li>Emprendedores</li>
            <li>Categorías</li>
            <li>Eventos</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            Emprendedores
          </h3>

          <ul className="space-y-2 text-gray-300">
            <li>Publicar negocio</li>
            <li>Planes</li>
            <li>Promociones</li>
            <li>Centro de ayuda</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            Contacto
          </h3>

          <p className="text-gray-300">
            Ibarra - Ecuador
          </p>

          <p className="text-gray-300 mt-2">
            contacto@hechoenibarra.com
          </p>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">

        © 2026 Hecho en Ibarra · Todos los derechos reservados.

      </div>

    </footer>
  );
}