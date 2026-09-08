import BusinessCard from "../components/ui/BusinessCard";

export default function Explorar() {
  return (
    <main className="bg-[#F8F5EF] min-h-screen">

      <section className="max-w-7xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold">
          Explorar emprendimientos
        </h1>

        <p className="text-gray-600 mt-3">
          Descubre productos, servicios y negocios locales.
        </p>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <BusinessCard
            name="LAMY"
            category="Spa y Cosmética"
            image="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900"
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
          />

          <BusinessCard
            name="Chocolate Imbabura"
            category="Gastronomía"
            image="https://images.unsplash.com/photo-1511381939415-e44015466834?w=900"
            logo="https://placehold.co/120"
            location="Ibarra"
          />

          <BusinessCard
            name="Tejidos Ibarra"
            category="Textiles"
            image="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900"
            logo="https://placehold.co/120"
            location="Yahuarcocha"
          />

        </div>

      </section>

    </main>
  );
}