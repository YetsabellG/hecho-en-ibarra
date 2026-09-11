export default function About() {
  return (
    <section className="py-24 bg-[#F8F5EF]">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <p className="uppercase tracking-[4px] text-[#76263d]">
              SOBRE NOSOTROS
            </p>

            <h2 className="text-5xl font-bold mt-4 leading-tight">
              Hecho en Ibarra conecta el talento local con toda la ciudad.
            </h2>

            <p className="mt-8 text-lg text-gray-600 leading-8">

              Somos una plataforma creada para impulsar a los
              emprendedores de Ibarra mediante un espacio digital
              donde puedan mostrar sus productos, servicios,
              promociones, eventos y fortalecer su crecimiento.

            </p>

            <div className="grid grid-cols-2 gap-8 mt-12">

              <div>

                <h3 className="text-4xl font-bold text-[#76263d]">
                  0
                </h3>

                <p className="text-gray-600 mt-2">
                  Emprendimientos
                </p>

              </div>

              <div>

                <h3 className="text-4xl font-bold text-[#76263d]">
                  0
                </h3>

                <p className="text-gray-600 mt-2">
                  Productos
                </p>

              </div>

              <div>

                <h3 className="text-4xl font-bold text-[#76263d]">
                  0
                </h3>

                <p className="text-gray-600 mt-2">
                  Eventos
                </p>

              </div>

              <div>

                <h3 className="text-4xl font-bold text-[#76263d]">
                  0
                </h3>

                <p className="text-gray-600 mt-2">
                  Promociones
                </p>

              </div>

            </div>

          </div>

          <div className="rounded-[40px] overflow-hidden shadow-2xl">

            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              className="w-full h-[550px] object-cover"
            />

          </div>

        </div>

      </div>

    </section>
  );
}