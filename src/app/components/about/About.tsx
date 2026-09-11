"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Stats = { businesses: number; products: number; events: number; promotions: number };

export default function About() {
  const [stats, setStats] = useState<Stats>({ businesses: 0, products: 0, events: 0, promotions: 0 });

  useEffect(() => {
    let active = true;
    async function load() {
      const [businesses, products, events, promotions] = await Promise.all([
        supabase.from("businesses").select("id", { count: "exact", head: true }),
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("events").select("id", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("promotions").select("id", { count: "exact", head: true }).eq("status", "active"),
      ]);
      if (active) setStats({ businesses: businesses.count ?? 0, products: products.count ?? 0, events: events.count ?? 0, promotions: promotions.count ?? 0 });
    }
    void load();
    return () => { active = false; };
  }, []);

  const items = [[stats.businesses, "Emprendimientos"], [stats.products, "Productos"], [stats.events, "Eventos"], [stats.promotions, "Promociones"]];
  return <section className="bg-[#F8F5EF] py-24"><div className="mx-auto max-w-7xl px-6"><div className="grid items-center gap-16 lg:grid-cols-2"><div><p className="uppercase tracking-[4px] text-[#891C20]">SOBRE NOSOTROS</p><h2 className="mt-4 text-5xl font-bold leading-tight">Hecho en Ibarra conecta el talento local con toda la ciudad.</h2><p className="mt-8 text-lg leading-8 text-gray-600">Somos una plataforma creada para impulsar a los emprendedores de Ibarra mediante un espacio digital donde puedan mostrar sus productos, servicios, promociones, eventos y fortalecer su crecimiento.</p><div className="mt-12 grid grid-cols-2 gap-8">{items.map(([value, label]) => <div key={label}><h3 className="text-4xl font-bold text-[#891C20]">{value}</h3><p className="mt-2 text-gray-600">{label}</p></div>)}</div></div><div className="overflow-hidden rounded-[40px] shadow-2xl"><img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" alt="Emprendedores colaborando" className="h-[550px] w-full object-cover" /></div></div></div></section>;
}
