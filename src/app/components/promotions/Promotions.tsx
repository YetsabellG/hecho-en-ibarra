import BusinessCard from "../ui/BusinessCard";

export default function Promotions() {
  return (
    <section className="py-24 bg-[#F8F5EF]">

      <div className="max-w-7xl mx-auto px-6">

        <span className="uppercase tracking-[4px] text-[#C54B43] text-sm">
          Promociones
        </span>

        <div className="flex justify-between items-center mt-3">

          <div>
            <h2 className="text-5xl font-bold">
              Ofertas disponibles
            </h2>

            <p className="text-gray-500 mt-3">
              Promociones activas de los emprendimientos registrados.
            </p>
          </div>

          <button className="hidden md:block border rounded-full px-6 py-3 hover:bg-white transition">
            Ver todas →
          </button>

        </div>

        <div className="grid lg:grid-cols-4 gap-8 mt-14">

          <BusinessCard
            name="LAMY"
            category="Spa y Cosmética"
            image="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900"
            logo="https://placehold.co/120"
            location="Ibarra"
            promotion
            verified
          />

          <BusinessCard
            name="Arte Andino"
            category="Artesanías"
            image="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900"
            logo="https://placehold.co/120"
            location="San Antonio"
            promotion
          />

          <BusinessCard
            name="Chocolate Imbabura"
            category="Gastronomía"
            image="https://images.unsplash.com/photo-1511381939415-e44015466834?w=900"
            logo="https://placehold.co/120"
            location="Ibarra"
            promotion
          />

          <BusinessCard
            name="Tejidos Ibarra"
            category="Textiles"
            image="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900"
            logo="https://placehold.co/120"
            location="Yahuarcocha"
            promotion
          />

        </div>

      </div>

    </section>
  );
}