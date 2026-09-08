import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, MapPin, MessageCircle, Package, Share2, Sparkles } from "lucide-react";
import { getBusinessBySlug } from "../../services/business";
import { getProductsByBusiness } from "../../services/product";
import { getPromotions } from "../../services/promotion";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BusinessPage({ params }: Props) {
  const { slug } = await params;
  const { data: business } = await getBusinessBySlug(slug);

  if (!business) notFound();

  const [{ data: products }, { data: promotions }] = await Promise.all([
    getProductsByBusiness(business.id),
    getPromotions(business.id),
  ]);

  const visibleProducts = (products ?? []).filter((product) => product.active !== false && product.status !== "hidden");
  const visiblePromotions = (promotions ?? []).filter((promotion) => promotion.status === "active");
  const whatsapp = business.whatsapp?.replace(/\D/g, "");
  const whatsappHref = whatsapp ? `https://wa.me/${whatsapp}` : null;

  return (
    <main className="min-h-screen bg-[#F8F5EF] text-[#2D2926]">
      <section className="relative min-h-[390px] overflow-hidden bg-[#2D2926]">
        <img
          src={business.image || "https://placehold.co/1600x700/2D2926/F5C8A9?text=Hecho+en+Ibarra"}
          alt={business.name}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D2926] via-[#2D2926]/45 to-transparent" />
        <div className="relative mx-auto flex min-h-[390px] max-w-7xl flex-col justify-end px-6 py-12 sm:px-10">
          <Link href="/emprendedores" className="mb-auto flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-white/25">
            <ArrowLeft size={16} /> Volver a emprendimientos
          </Link>
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {business.verified && <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#A53D36]">Emprendimiento verificado</span>}
              {business.premium && <span className="rounded-full bg-[#F5C8A9] px-4 py-2 text-sm font-semibold text-[#7D3D34]">Destacado</span>}
            </div>
            <h1 className="mt-5 text-4xl font-bold text-white sm:text-6xl">{business.name}</h1>
            <p className="mt-4 text-lg text-white/85">{business.category || "Emprendimiento local"} · {business.city || "Ibarra"}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          <section className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Stat icon={Package} value={String(visibleProducts.length)} label="Productos" />
            <Stat icon={Sparkles} value={String(visiblePromotions.length)} label="Promociones activas" />
            <Stat icon={MapPin} value={business.city || "Ibarra"} label="Ubicación" />
          </section>

          <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-9">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C54B43]">Conoce el negocio</p>
            <h2 className="mt-2 text-3xl font-bold">Sobre {business.name}</h2>
            <p className="mt-5 whitespace-pre-line leading-8 text-[#766D67]">
              {business.description || "Este emprendimiento todavía está completando su información pública."}
            </p>
          </section>

          {visiblePromotions.length > 0 && (
            <section>
              <div className="mb-5 flex items-end justify-between gap-4">
                <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C54B43]">Ofertas</p><h2 className="mt-2 text-3xl font-bold">Promociones activas</h2></div>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {visiblePromotions.map((promotion) => (
                  <article key={promotion.id} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
                    {promotion.image && <img src={promotion.image} alt={promotion.title} className="h-44 w-full object-cover" />}
                    <div className="p-6"><span className="text-sm font-semibold text-[#C54B43]">{promotion.promotion_type === "percentage" ? `${promotion.discount}% de descuento` : "Oferta especial"}</span><h3 className="mt-2 text-xl font-bold">{promotion.title}</h3><p className="mt-2 text-sm leading-6 text-[#766D67]">{promotion.description}</p></div>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C54B43]">Catálogo</p>
            <h2 className="mt-2 text-3xl font-bold">Productos disponibles</h2>
            {visibleProducts.length > 0 ? (
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {visibleProducts.map((product) => (
                  <article key={product.id} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
                    <div className="h-48 bg-[#F2E8DD]">{product.image ? <img src={product.image} alt={product.name} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-[#A69A91]">Imagen próximamente</div>}</div>
                    <div className="p-6"><span className="text-sm text-[#A69A91]">{product.category || "Producto"}</span><h3 className="mt-1 text-xl font-bold">{product.name}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-[#766D67]">{product.description || "Consulta disponibilidad directamente con el negocio."}</p><div className="mt-5 flex items-center justify-between"><strong className="text-xl text-[#C54B43]">${Number(product.price || 0).toFixed(2)}</strong><span className="text-sm text-[#766D67]">{product.stock > 0 ? "Disponible" : "Agotado"}</span></div></div>
                  </article>
                ))}
              </div>
            ) : <EmptyState text="Este negocio todavía no ha publicado productos." />}
          </section>
        </div>

        <aside className="h-fit rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5 lg:sticky lg:top-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C54B43]">Contacto</p>
          <h2 className="mt-2 text-2xl font-bold">Habla directamente</h2>
          <div className="mt-6 space-y-4 text-sm text-[#766D67]">
            {business.address && <p className="flex gap-3"><MapPin size={19} className="shrink-0 text-[#C54B43]" />{business.address}, {business.city}</p>}
            {business.instagram && <p>Instagram: {business.instagram}</p>}
            {business.website && <a href={business.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#C54B43] hover:underline">Visitar sitio web <ExternalLink size={15} /></a>}
          </div>
          {whatsappHref ? <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-7 flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-4 font-semibold text-white transition hover:brightness-95"><MessageCircle size={19} /> Contactar por WhatsApp</a> : <p className="mt-7 rounded-2xl bg-[#F8F5EF] p-4 text-sm text-[#766D67]">El negocio todavía no ha agregado WhatsApp.</p>}
          <button type="button" onClick={() => typeof navigator !== "undefined" && navigator.share?.({ title: business.name, url: window.location.href })} className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-[#E6DDD5] py-4 font-semibold text-[#766D67] transition hover:border-[#C54B43] hover:text-[#C54B43]"><Share2 size={18} /> Compartir emprendimiento</button>
        </aside>
      </section>
    </main>
  );
}

function Stat({ icon: Icon, value, label }: { icon: typeof Package; value: string; label: string }) {
  return <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5"><Icon size={20} className="text-[#C54B43]" /><p className="mt-4 text-2xl font-bold">{value}</p><p className="mt-1 text-sm text-[#766D67]">{label}</p></div>;
}

function EmptyState({ text }: { text: string }) {
  return <div className="mt-5 rounded-3xl border border-dashed border-[#D9CFC7] bg-white/60 p-8 text-center text-[#766D67]">{text}</div>;
}
