export default function Events() {
  return (
    <section
      className="py-24 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(248,245,238,.95),rgba(248,245,238,.95)), url('https://images.unsplash.com/photo-1524661135-423995f22d0b')",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">

        <p className="uppercase tracking-[3px] text-red-600 text-center">
          PRÓXIMOS EVENTOS
        </p>

        <h2 className="text-5xl font-bold text-center mt-3">
          Vive Ibarra
        </h2>

        <p className="text-center text-gray-600 mt-4 mb-16">
          Ferias, capacitaciones, cursos y eventos para impulsar a los emprendedores.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Evento */}

          <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 transition duration-300">

            <img
              src="https://images.unsplash.com/photo-1511578314322-379afb476865"
              className="h-56 w-full object-cover"
            />

            <div className="p-6">

              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                Capacitación
              </span>

              <h3 className="text-2xl font-bold mt-4">
                Inteligencia Artificial para Emprendedores
              </h3>

              <div className="mt-4 space-y-2 text-gray-600">

                <p>📅 15 Agosto 2026</p>

                <p>🕘 09:00</p>

                <p>📍 Municipio de Ibarra</p>

                <p>👥 Cupos: 40</p>

              </div>

              <div className="flex gap-3 mt-6">

                <button className="flex-1 bg-red-700 text-white rounded-full py-3">
                  Ver evento
                </button>

                <button className="flex-1 border rounded-full py-3">
                  Inscribirme
                </button>

              </div>

            </div>

          </div>

          {/* Feria */}

          <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 transition duration-300">

            <img
              src="https://images.unsplash.com/photo-1488459716781-31db52582fe9"
              className="h-56 w-full object-cover"
            />

            <div className="p-6">

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Feria
              </span>

              <h3 className="text-2xl font-bold mt-4">
                Verano Day
              </h3>

              <div className="mt-4 space-y-2 text-gray-600">

                <p>📅 21 - 23 Agosto</p>

                <p>🕘 10:00 - 22:00</p>

                <p>📍 Plaza Imbabura</p>

              </div>

              <button className="w-full mt-6 bg-red-700 text-white rounded-full py-3">
                Ver evento
              </button>

            </div>

          </div>

          {/* Curso */}

          <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 transition duration-300">

            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
              className="h-56 w-full object-cover"
            />

            <div className="p-6">

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                Curso
              </span>

              <h3 className="text-2xl font-bold mt-4">
                Programación en Python
              </h3>

              <div className="mt-4 space-y-2 text-gray-600">

                <p>📅 Próximamente</p>

                <p>📍 Ibarra</p>

                <p>🎓 Certificado 40 horas</p>

              </div>

              <div className="flex gap-3 mt-6">

                <button className="flex-1 bg-red-700 text-white rounded-full py-3">
                  Ver evento
                </button>

                <button className="flex-1 border rounded-full py-3">
                  Inscribirme
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}