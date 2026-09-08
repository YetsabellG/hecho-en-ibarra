type Props = {
  params: {
    slug: string;
  };
};

export default function BusinessPage({ params }: Props) {
  return (
    <main className="min-h-screen bg-[#F8F5EF]">

      {/* HERO */}

      <section className="relative h-[430px]">

        <img
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600"
          alt={params.slug}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 max-w-7xl w-full px-6 text-white">

          <span className="bg-white text-[#C54B43] px-5 py-2 rounded-full text-sm font-semibold">
            Premium
          </span>

          <h1 className="text-6xl font-bold mt-5">
            {params.slug.toUpperCase()}
          </h1>

          <p className="text-xl mt-4 opacity-95">
            Salud • Belleza • Cosmética • Regalos
          </p>

        </div>

      </section>

      {/* CONTENIDO */}

      <section className="max-w-7xl mx-auto py-16 px-6 grid lg:grid-cols-3 gap-12">

        {/* IZQUIERDA */}

        <div className="lg:col-span-2">

          {/* ESTADÍSTICAS */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <div className="bg-white rounded-3xl p-6 shadow">

              <h3 className="text-4xl font-bold text-[#C54B43]">
                18
              </h3>

              <p className="text-gray-500 mt-2">
                Productos
              </p>

            </div>

            <div className="bg-white rounded-3xl p-6 shadow">

              <h3 className="text-4xl font-bold text-[#C54B43]">
                4.9
              </h3>

              <p className="text-gray-500 mt-2">
                Calificación
              </p>

            </div>

            <div className="bg-white rounded-3xl p-6 shadow">

              <h3 className="text-4xl font-bold text-[#C54B43]">
                120
              </h3>

              <p className="text-gray-500 mt-2">
                Favoritos
              </p>

            </div>

            <div className="bg-white rounded-3xl p-6 shadow">

              <h3 className="text-4xl font-bold text-[#C54B43]">
                2350
              </h3>

              <p className="text-gray-500 mt-2">
                Visitas
              </p>

            </div>

          </div>

          {/* MENÚ */}

          <div className="bg-white rounded-3xl mt-10 px-8 shadow">

            <div className="flex gap-8 overflow-x-auto">

              <button className="py-6 border-b-2 border-[#C54B43] font-semibold text-[#C54B43] whitespace-nowrap">
                Productos
              </button>

              <button className="py-6 text-gray-500 hover:text-[#C54B43] whitespace-nowrap">
                Promociones
              </button>

              <button className="py-6 text-gray-500 hover:text-[#C54B43] whitespace-nowrap">
                Eventos
              </button>

              <button className="py-6 text-gray-500 hover:text-[#C54B43] whitespace-nowrap">
                Información
              </button>

            </div>

          </div>

          {/* DESCRIPCIÓN */}

          <div className="mt-14">

            <h2 className="text-3xl font-bold">
              Sobre este emprendimiento
            </h2>

            <p className="mt-6 text-gray-600 leading-8">
              Aquí aparecerá automáticamente toda la información registrada por
              el emprendedor. Historia del negocio, misión, visión, productos,
              servicios, experiencia, horarios de atención y demás información
              importante.
            </p>

          </div>

          {/* PRODUCTOS */}

          <div className="mt-20">

            <h2 className="text-3xl font-bold mb-8">
              Productos destacados
            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

              {[1,2,3,4,5,6].map((item)=>(

                <div
                  key={item}
                  className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition"
                >

                  <img
                    src={`https://picsum.photos/500/40${item}`}
                    className="w-full h-56 object-cover"
                    alt=""
                  />

                  <div className="p-6">

                    <h3 className="font-bold text-xl">
                      Producto {item}
                    </h3>

                    <p className="text-gray-500 mt-3">
                      Aquí aparecerá la descripción corta del producto.
                    </p>

                    <div className="flex justify-between items-center mt-6">

                      <span className="font-bold text-[#C54B43] text-xl">
                        $25
                      </span>

                      <button className="bg-[#C54B43] text-white px-5 py-2 rounded-full hover:bg-[#A53D36] transition">
                        Ver
                      </button>

                    </div>

                  </div>

                </div>

              ))}
                          </div>

          </div>

          {/* GALERÍA */}

          <div className="mt-20">

            <h2 className="text-3xl font-bold mb-8">
              Galería
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

              {[1,2,3,4].map((item)=>(

                <img
                  key={item}
                  src={`https://picsum.photos/500/50${item}`}
                  alt=""
                  className="rounded-3xl h-52 object-cover w-full hover:scale-105 transition duration-300"
                />

              ))}

            </div>

          </div>

        </div>

        {/* COLUMNA DERECHA */}

        <aside className="bg-white rounded-3xl shadow-lg p-8 h-fit sticky top-28">

          <h3 className="text-2xl font-bold">
            Contacto
          </h3>

          <div className="space-y-5 mt-8">

            <p>
              📍 Ibarra, Ecuador
            </p>

            <p>
              📱 0995289310
            </p>

            <p>
              📸 @lamy_ibarra
            </p>

          </div>

          <button className="w-full mt-8 bg-[#25D366] text-white py-4 rounded-2xl font-semibold hover:scale-105 transition">

            Contactar por WhatsApp

          </button>

          <button className="w-full mt-4 border border-[#C54B43] text-[#C54B43] py-4 rounded-2xl hover:bg-[#C54B43] hover:text-white transition">

            Ver ubicación

          </button>

          <button className="w-full mt-4 bg-black text-white py-4 rounded-2xl hover:bg-gray-900 transition">

            Compartir emprendimiento

          </button>

          <div className="mt-10">

            <h3 className="font-bold text-lg">
              Redes sociales
            </h3>

            <div className="flex gap-4 mt-5">

              <button className="w-12 h-12 rounded-full border hover:bg-gray-100 transition">
                📷
              </button>

              <button className="w-12 h-12 rounded-full border hover:bg-gray-100 transition">
                👍
              </button>

              <button className="w-12 h-12 rounded-full border hover:bg-gray-100 transition">
                🎵
              </button>

            </div>

          </div>

        </aside>

      </section>

    </main>
  );
}