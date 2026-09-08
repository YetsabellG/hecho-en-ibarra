import Link from "next/link";
import BusinessCard from "../components/ui/BusinessCard";
import { getPublicBusinesses } from "../services/business";

export default async function EmprendedoresPage() {
  const { data: businesses, error } = await getPublicBusinesses();

  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="font-semibold uppercase tracking-[0.25em] text-[#C54B43]">
          Emprendedores
        </p>
        <h1 className="mt-2 text-4xl font-bold text-[#2D2926] sm:text-5xl">
          Descubre el talento local de Ibarra
        </h1>
        <p className="mt-5 max-w-2xl text-[#766D67]">
          Encuentra emprendimientos verificados, conoce su historia, revisa su catálogo y contacta directamente con cada negocio.
        </p>

        {error ? (
          <div className="mt-12 rounded-3xl border border-[#E7B4AE] bg-[#FFF4F2] p-8 text-[#8A3029]">
            No pudimos cargar los emprendimientos en este momento. Intenta nuevamente más tarde.
          </div>
        ) : businesses && businesses.length > 0 ? (
          <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {businesses.map((business) => (
              <Link key={business.id} href={`/emprendedores/${business.slug}`} className="block">
                <BusinessCard
                  name={business.name}
                  category={business.category || "Emprendimiento local"}
                  description={business.description || "Conoce este emprendimiento de Ibarra."}
                  image={business.image || "https://placehold.co/900x600/F2E8DD/C54B43?text=Hecho+en+Ibarra"}
                  location={business.city || "Ibarra"}
                  verified={business.verified}
                  premium={business.premium}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5">
            <h2 className="text-2xl font-bold">Pronto conocerás nuevos emprendimientos</h2>
            <p className="mt-3 text-[#766D67]">Estamos preparando el directorio local de Ibarra.</p>
          </div>
        )}
      </section>
    </main>
  );
}
