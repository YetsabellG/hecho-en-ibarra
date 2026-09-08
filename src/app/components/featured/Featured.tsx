import Link from "next/link";
import BusinessCard from "../ui/BusinessCard";
import { getPublicBusinesses } from "../../services/business";

export default async function Featured() {
  const { data } = await getPublicBusinesses();
  const featured = (data || []).filter((business) => business.premium);
  return <section className="bg-white py-20"><div className="mx-auto max-w-7xl px-6"><p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C54B43]">Destacado</p><h2 className="mt-3 text-4xl font-bold sm:text-5xl">Emprendimientos que inspiran</h2><p className="mt-3 text-[#766D67]">Una selección especial de negocios locales verificados.</p>{featured.length > 0 ? <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">{featured.map((business) => <Link key={business.id} href={`/emprendedores/${business.slug}`}><BusinessCard name={business.name} category={business.category || "Emprendimiento local"} description={business.description || "Conoce este emprendimiento de Ibarra."} image={business.image || "https://placehold.co/900x600/F2E8DD/C54B43?text=Hecho+en+Ibarra"} location={business.city || "Ibarra"} verified={business.verified} premium /></Link>)}</div> : <Empty text="Pronto aparecerán aquí los emprendimientos destacados." />}</div></section>;
}

function Empty({ text }: { text: string }) { return <div className="mt-10 rounded-3xl border border-dashed border-[#D9CFC7] bg-[#F8F5EF] p-8 text-center text-[#766D67]">{text}</div>; }
