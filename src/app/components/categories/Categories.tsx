import {
  UtensilsCrossed,
  Palette,
  Shirt,
  Sparkles,
  Leaf,
  Home,
  Laptop,
  Gift,
} from "lucide-react";

const categorias = [
  {
    nombre: "Gastronomía",
    icono: UtensilsCrossed,
  },
  {
    nombre: "Artesanías",
    icono: Palette,
  },
  {
    nombre: "Textiles",
    icono: Shirt,
  },
  {
    nombre: "Belleza",
    icono: Sparkles,
  },
  {
    nombre: "Productos Naturales",
    icono: Leaf,
  },
  {
    nombre: "Hogar y Decoración",
    icono: Home,
  },
  {
    nombre: "Tecnología",
    icono: Laptop,
  },
  {
    nombre: "Regalos",
    icono: Gift,
  },
];

export default function Categories() {
  return (
    <section className="bg-[#FAF7F2] py-24">
      <div className="max-w-7xl mx-auto px-6">

        <p className="uppercase tracking-widest text-red-600 text-sm mb-2">
          Explora
        </p>

        <h2 className="text-4xl font-bold text-gray-900">
          Categorías destacadas
        </h2>

        <p className="text-gray-500 mt-3 mb-12">
          Encuentra fácilmente emprendimientos según la categoría que buscas.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {categorias.map((cat) => {
            const Icon = cat.icono;

            return (
              <div
                key={cat.nombre}
                className="bg-[#F7F2E8] rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm mb-6">
                  <Icon
                    size={26}
                    className="text-red-600"
                  />
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {cat.nombre}
                </h3>

                <p className="text-gray-500 text-sm">
                  0 emprendimientos
                </p>

                <p className="text-gray-500 text-sm mb-6">
                  0 productos
                </p>

                <span className="text-red-600 font-medium">
                  Ver categoría →
                </span>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}