import Link from "next/link";
import BusinessCard from "../ui/BusinessCard";
import { getPublicBusinesses } from "../../services/business";

export default async function Recent() {
  const { data } = await getPublicBusinesses();
  return <section className="bg-[#F8F5EF] py-20"><div className="mx-auto max-w-7xl px-6"><p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C54B43]">Descubre</p><h2 className="mt-3 text-4xl font-bold sm:text-5xl">Emprendedores locales</h2><p className="mt-3 text-[#766D67]">Descubre productos y servicios creados en Ibarra.</p>{data && data.length > 0 ? <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">{data.slice(0, 6).map((business) => <Link key={business.id} href={`/emprendedores/${business.slug}`}><BusinessCard name={business.name} category={business.category || "Emprendimiento local"} description={business.description || "Conoce este emprendimiento de Ibarra."} image={business.image || "https://placehold.co/900x600/F2E8DD/C54B43?text=Hecho+en+Ibarra"} location={business.city || "Ibarra"} verified={business.verified} premium={business.premium} /></Link>)}</div> : <div className="mt-10 rounded-3xl border border-dashed border-[#D9CFC7] bg-white p-8 text-center text-[#766D67]">Todavía no hay emprendimientos publicados.</div>}</div></section>;
}
