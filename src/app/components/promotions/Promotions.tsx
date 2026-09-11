"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Tag } from "lucide-react";
import BusinessCard from "../ui/BusinessCard";
import { supabase } from "../../lib/supabase";

type PromotionCard = { id: number; title: string; name: string; category: string; description: string; image: string; slug: string; subcategories: string[] };
export default function Promotions() {
  const [index, setIndex] = useState(0);
  const [items, setItems] = useState<PromotionCard[]>([]);
  useEffect(() => {
    let active = true;
    async function load() {
      const { data: promotions } = await supabase.from("promotions").select("id,title,description,image,business_id,status").eq("status", "active").order("created_at", { ascending: false });
      if (!active || !promotions?.length) { if (active) setItems([]); return; }
      const businessIds = [...new Set(promotions.map((promotion) => promotion.business_id).filter(Boolean))];
      const { data: businesses } = await supabase.from("businesses").select("id,name,slug,category,city,image").in("id", businessIds);
      const byId = new Map((businesses || []).map((business) => [business.id, business]));
      const real = promotions.map((promotion) => {
        const business = byId.get(promotion.business_id);
        return { id: promotion.id, title: promotion.title, name: business?.name || "Emprendimiento local", category: business?.category || "Oferta local", description: promotion.description || promotion.title || "Promoción disponible", image: promotion.image || business?.image || "/ibarra-hero.png", slug: business?.slug || "", subcategories: [promotion.title || "Oferta"] };
      });
      setItems(real);
      setIndex(0);
    }
    void load();
    const timer = window.setInterval(() => void load(), 15000);
    return () => { active = false; window.clearInterval(timer); };
  }, []);
  const cards = items.length ? items : [{ id: 0, title: "", name: "Próximamente", category: "Ofertas locales", description: "Pronto encontrarás nuevas ofertas de los emprendimientos de Ibarra.", image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=900", slug: "", subcategories: [] }];
  return <section className="bg-[#fffdf9] py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><span className="text-xs font-black uppercase tracking-[.25em] text-[#891C20]">Promociones</span><h2 className="mt-3 text-4xl font-black text-[#342821]">Ofertas disponibles</h2><p className="mt-3 text-[#75685f]">Promociones activas de los emprendimientos registrados.</p></div><div className="flex items-center gap-2"><button onClick={() => setIndex((i) => (i - 1 + cards.length) % cards.length)} className="grid h-11 w-11 place-items-center rounded-full border border-[#ead6d0] bg-white text-[#891C20]" aria-label="Oferta anterior"><ChevronLeft size={20} /></button><button onClick={() => setIndex((i) => (i + 1) % cards.length)} className="grid h-11 w-11 place-items-center rounded-full border border-[#ead6d0] bg-white text-[#891C20]" aria-label="Siguiente oferta"><ChevronRight size={20} /></button><Link href="/promociones" className="hidden rounded-full border border-[#ead6d0] px-5 py-3 text-sm font-bold text-[#6f1519] md:block">Ver todas →</Link></div></div><div className="mt-12 grid gap-5 md:grid-cols-3">{[0, 1, 2].map((offset) => { const card = cards[(index + offset) % cards.length]; return card.slug ? <BusinessCard key={`${card.id}-${offset}`} name={card.name} category={card.category} description={card.description} image={card.image} location="Ibarra" promotion verified premium={false} slug={card.slug} subcategories={card.subcategories} rating={5} favorites={0} /> : <article key={offset} className="flex min-h-[410px] flex-col justify-end overflow-hidden rounded-[28px] border border-[#ead6d0] bg-[#faf0eb]"><img src={card.image} alt="Ofertas locales" className="h-52 w-full object-cover" /><div className="p-7"><Tag className="text-[#891C20]" size={30} /><h3 className="mt-5 text-2xl font-black text-[#32262b]">{card.category}</h3><p className="mt-4 leading-7 text-[#6d5960]">{card.description}</p><Link href="/promociones" className="mt-6 inline-flex w-fit rounded-full bg-[#891C20] px-5 py-3 font-bold text-white">Explorar ofertas</Link></div></article>; })}</div></div></section>;
}
