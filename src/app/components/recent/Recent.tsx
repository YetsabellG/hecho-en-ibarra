import BusinessCard from "../ui/BusinessCard";

export default function Recent() {
  return (
    <section className="py-24 bg-[#F8F5EF]">

      <div className="max-w-7xl mx-auto px-6">

        <span className="uppercase text-[#C54B43] tracking-[4px] text-sm">
          Descubre
        </span>

        <div className="flex items-center justify-between mt-2">

          <div>

            <h2 className="text-5xl font-bold">
              Emprendedores Locales
            </h2>

            <p className="text-gray-500 mt-3">
              Descubre productos y servicios creados en Ibarra.
            </p>

          </div>

          <button className="hidden md:block border rounded-full px-6 py-3 hover:bg-white transition">
            Ver todos →
          </button>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

          <BusinessCard
            name="LAMY"
            category="Salud y Belleza"
            image="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=900"
            logo="https://placehold.co/120"
            location="Ibarra"
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
            name="Café Sierra"
            category="Gastronomía"
            image="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900"
            logo="https://placehold.co/120"
            location="Centro"
            isNew
          />

          <BusinessCard
            name="Tejidos Ibarra"
            category="Textiles"
            image="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900"
            logo="https://placehold.co/120"
            location="Yahuarcocha"
            verified
          />

        </div>

      </div>

    </section>
  );
}