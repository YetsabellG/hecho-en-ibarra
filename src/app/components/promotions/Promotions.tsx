import Link from "next/link";
import { getPublicBusinesses } from "../../services/business";
import { getPromotions } from "../../services/promotion";

export default async function Promotions() {
  const { data: businesses } = await getPublicBusinesses();
  const results = await Promise.all((businesses || []).map(async (business) => { const { data } = await getPromotions(business.id); return (data || []).filter((promotion) => promotion.status === "active").map((promotion) => ({ ...promotion, business })); }));
  const promotions = results.flat();
  return <section className="bg-white py-20"><div className="mx-auto max-w-7xl px-6"><p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C54B43]">Promociones</p><h2 className="mt-3 text-4xl font-bold sm:text-5xl">Ofertas disponibles</h2><p className="mt-3 text-[#766D67]">Promociones activas de emprendimientos verificados.</p>{promotions.length > 0 ? <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">{promotions.slice(0, 6).map((promotion) => <article key={promotion.id} className="overflow-hidden rounded-3xl border border-[#EEE6DF] bg-[#F8F5EF] shadow-sm">{promotion.image && <img src={promotion.image} alt={promotion.title} className="h-52 w-full object-cover" />}<div className="p-6"><p className="text-sm font-semibold text-[#C54B43]">{promotion.business.name}</p><h3 className="mt-2 text-2xl font-bold">{promotion.title}</h3><p className="mt-2 line-clamp-3 text-[#766D67]">{promotion.description}</p><Link href={`/emprendedores/${promotion.business.slug}`} className="mt-6 inline-flex rounded-full bg-[#C54B43] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#A53D36]">Ver emprendimiento</Link></div></article>)}</div> : <div className="mt-10 rounded-3xl border border-dashed border-[#D9CFC7] bg-[#F8F5EF] p-8 text-center text-[#766D67]">Todavía no hay promociones activas.</div>}</div></section>;
}
