export default function Plans() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <p className="uppercase tracking-[4px] text-red-600 text-center">
          PLANES
        </p>

        <h2 className="text-5xl font-bold text-center mt-3">
          Haz crecer tu emprendimiento
        </h2>

        <p className="text-center text-gray-600 mt-4 mb-16">
          Empieza gratis y aumenta tu visibilidad cuando tu negocio crezca.
        </p>

        <div className="grid md:grid-cols-4 gap-8">

          {/* GRATIS */}

          <div className="rounded-3xl border p-8">

            <h3 className="text-2xl font-bold">
              Gratuito
            </h3>

            <p className="text-5xl font-bold mt-5">
              $0
            </p>

            <ul className="space-y-3 mt-8 text-gray-600">

              <li>✔ Hasta 10 productos</li>

              <li>✔ Perfil del emprendimiento</li>

              <li>✔ WhatsApp</li>

              <li>✔ Ubicación</li>

            </ul>

            <button className="w-full mt-10 border rounded-full py-3">
              Empezar
            </button>

          </div>

          {/* BASIC */}

          <div className="rounded-3xl border p-8">

            <h3 className="text-2xl font-bold">
              Emprendedor
            </h3>

            <p className="text-5xl font-bold mt-5">
              $5
            </p>

            <ul className="space-y-3 mt-8 text-gray-600">

              <li>✔ 25 productos</li>

              <li>✔ Promociones</li>

              <li>✔ Redes sociales</li>

              <li>✔ Prioridad</li>

            </ul>

            <button className="w-full mt-10 bg-red-700 text-white rounded-full py-3">
              Elegir
            </button>

          </div>

          {/* PREMIUM */}

          <div className="rounded-3xl bg-red-700 text-white p-8 scale-105 shadow-2xl">

            <span className="bg-white text-red-700 px-4 py-2 rounded-full">
              Más elegido
            </span>

            <h3 className="text-2xl font-bold mt-6">
              Premium
            </h3>

            <p className="text-5xl font-bold mt-5">
              $10
            </p>

            <ul className="space-y-3 mt-8">

              <li>✔ 50 productos</li>

              <li>✔ Destacado</li>

              <li>✔ Promociones</li>

              <li>✔ Estadísticas</li>

            </ul>

            <button className="w-full mt-10 bg-white text-red-700 rounded-full py-3 font-bold">
              Elegir
            </button>

          </div>

          {/* EMPRESA */}

          <div className="rounded-3xl border p-8">

            <h3 className="text-2xl font-bold">
              Empresa
            </h3>

            <p className="text-5xl font-bold mt-5">
              $30
            </p>

            <ul className="space-y-3 mt-8 text-gray-600">

              <li>✔ 100 productos</li>

              <li>✔ Prioridad máxima</li>

              <li>✔ Destacado Premium</li>

              <li>✔ Estadísticas completas</li>

            </ul>

            <button className="w-full mt-10 border rounded-full py-3">
              Elegir
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}