"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BusinessCard from "../ui/BusinessCard";
import { supabase } from "../../lib/supabase";

type Card = { name: string; category: string; description: string; image: string; slug: string; city: string; subcategories: string[] };
const categoryImages: Record<string, string> = {
  Gastronomía: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900",
  Artesanías: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=900",
  Textiles: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900",
};
const emptyCards: Card[] = [
  { name: "Próximamente", category: "Gastronomía", description: "Muy pronto conocerás nuevos sabores y emprendimientos de Ibarra.", image: categoryImages.Gastronomía, slug: "", city: "Ibarra", subcategories: [] },
  { name: "Próximamente", category: "Artesanías", description: "Más manos creadoras, tejidos y piezas únicas llegarán pronto.", image: categoryImages.Artesanías, slug: "", city: "Ibarra", subcategories: [] },
  { name: "Próximamente", category: "Textiles", description: "Estamos preparando nuevas historias de emprendedores locales.", image: categoryImages.Textiles, slug: "", city: "Ibarra", subcategories: [] },
];

export default function Recent() {
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const [items, setItems] = useState<Card[]>(emptyCards);
  useEffect(() => {
    let active = true;
    async function load() {
      const { data } = await supabase.from("businesses").select("id,name,slug,description,category,city,image,verified,premium,created_at").eq("verified", true).order("created_at", { ascending: false });
      if (!active || !data?.length) return;
      const real = data.map((business) => ({ name: business.name, category: business.category || "Emprendimiento local", description: business.description || "Conoce este emprendimiento de Ibarra.", image: business.image || "/ibarra-hero.png", slug: business.slug, city: business.city || "Ibarra", subcategories: ["Productos locales"] }));
      for (let i = real.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [real[i], real[j]] = [real[j], real[i]]; }
      setItems(real.concat(emptyCards).slice(0, Math.max(4, real.length)));
    }
    void load();
    return () => { active = false; };
  }, []);
  const realCount = items.filter((item) => item.slug).length;
  return <section className="bg-[#f8f1e7] py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><span className="text-xs font-black uppercase tracking-[.25em] text-[#891C20]">Descubre</span><h2 className="mt-3 text-4xl font-black text-[#32262b]">Emprendedores Locales</h2><p className="mt-3 text-[#6d5960]">Conoce productos y servicios creados en Ibarra.</p><p className="mt-4 inline-flex rounded-full bg-[#f2dfe0] px-4 py-2 text-sm font-black text-[#891C20]">{realCount} emprendimiento{realCount === 1 ? "" : "s"} activo{realCount === 1 ? "" : "s"}</p></div><div className="flex items-center gap-2"><button onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)} className="grid h-11 w-11 place-items-center rounded-full border border-[#ead6d0] bg-white text-[#891C20]" aria-label="Emprendimiento anterior"><ChevronLeft size={20} /></button><button onClick={() => setIndex((i) => (i + 1) % items.length)} className="grid h-11 w-11 place-items-center rounded-full border border-[#ead6d0] bg-white text-[#891C20]" aria-label="Siguiente emprendimiento"><ChevronRight size={20} /></button><Link href="/emprendedores" className="hidden rounded-full border border-[#ead6d0] px-5 py-3 text-sm font-bold text-[#891C20] md:block">Explorar todos →</Link></div></div><div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 touch-pan-y" onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const distance = event.changedTouches[0]?.clientX - touchStart.current; if (Math.abs(distance) > 45) setIndex((current) => (current + (distance < 0 ? 1 : -1) + (items.length || 1)) % (items.length || 1)); touchStart.current = null; }}>{items.map((_, offset) => { const card = items[(index + offset) % items.length]; return card.slug ? <BusinessCard key={offset} name={card.name} category={card.category} description={card.description} image={card.image} location={card.city} verified premium={false} slug={card.slug} subcategories={card.subcategories} rating={5} favorites={0} /> : <article key={offset} className="overflow-hidden rounded-[28px] border border-[#ead6d0] bg-[#fffdf9] shadow-sm"><img src={card.image} alt={`Próximamente ${card.category}`} className="h-48 w-full object-cover" /><div className="p-7"><span className="rounded-full bg-[#f2dfe0] px-3 py-1 text-xs font-black uppercase tracking-wider text-[#891C20]">Próximamente</span><h3 className="mt-5 text-2xl font-black text-[#32262b]">{card.category}</h3><p className="mt-4 leading-7 text-[#6d5960]">{card.description}</p><Link href={`/explorar?categoria=${encodeURIComponent(card.category)}`} className="mt-6 inline-flex w-fit rounded-full bg-[#891C20] px-5 py-3 font-bold text-white">Explorar categoría</Link></div></article>; })}</div></div></section>;
}
