"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, LogOut, Search, Settings, Star } from "lucide-react";
import { supabase } from "../lib/supabase";
import { getUser, signOut } from "../services/auth";

type Favorite = { id: number; entity_type: string; title: string; href: string; image?: string | null };
export default function VisitorDashboard() {
  const [email, setEmail] = useState("");
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [preferences, setPreferences] = useState("Productos locales, ofertas y eventos");
  const [clicks, setClicks] = useState(0);
  useEffect(() => {
    async function load() {
      const user = await getUser();
      if (!user) { window.location.href = "/auth/visitante"; return; }
      setEmail(user.email || "");
      const [{ data: rows }, { count }] = await Promise.all([
        supabase.from("visitor_favorites").select("id,entity_type,entity_id").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20),
        supabase.from("visitor_clicks").select("id", { count: "exact", head: true }).eq("user_id", user.id),
      ]);
      setClicks(count || 0);
      const result: Favorite[] = [];
      for (const row of rows || []) {
        if (row.entity_type === "business") { const { data } = await supabase.from("businesses").select("name,slug,image").eq("id", row.entity_id).maybeSingle(); if (data) result.push({ id: row.id, entity_type: row.entity_type, title: data.name, href: `/emprendedores/${data.slug}`, image: data.image }); }
        if (row.entity_type === "product") { const { data } = await supabase.from("products").select("name,image").eq("id", row.entity_id).maybeSingle(); if (data) result.push({ id: row.id, entity_type: row.entity_type, title: data.name, href: "/explorar", image: data.image }); }
        if (row.entity_type === "promotion") { const { data } = await supabase.from("promotions").select("title,image").eq("id", row.entity_id).maybeSingle(); if (data) result.push({ id: row.id, entity_type: row.entity_type, title: data.title, href: "/promociones", image: data.image }); }
      }
      setFavorites(result);
      const { data: profile } = await supabase.from("visitor_profiles").select("preferences").eq("user_id", user.id).maybeSingle();
      if (profile?.preferences?.summary) setPreferences(profile.preferences.summary);
    }
    void load();
  }, []);
  async function savePreferences() { const user = await getUser(); if (!user) return; await supabase.from("visitor_profiles").upsert({ user_id: user.id, preferences: { summary: preferences }, updated_at: new Date().toISOString() }); alert("Preferencias guardadas."); }
  return <main className="min-h-screen bg-[#f8f1e7]"><header className="border-b border-[#eadbca] bg-[#fffdf9]"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8"><Link href="/" className="text-lg font-black tracking-[.12em] text-[#6f1519]">HECHO EN IBARRA</Link><button onClick={async () => { await signOut(); window.location.href = "/"; }} className="flex items-center gap-2 text-sm font-bold text-[#6f1519]"><LogOut size={17}/> Salir</button></div></header><section className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><span className="text-xs font-black uppercase tracking-[.25em] text-[#891C20]">Mi espacio</span><h1 className="mt-3 text-5xl font-black">Hola, visitante</h1><p className="mt-3 text-[#75685f]">{email} · Guarda y encuentra más rápido lo que te interesa.</p><div className="mt-10 grid gap-5 sm:grid-cols-3"><div className="rounded-3xl bg-[#fffdf9] p-6"><Heart className="text-[#891C20]"/><p className="mt-5 text-4xl font-black">{favorites.length}</p><p className="mt-1 text-sm text-[#75685f]">Favoritos guardados</p></div><div className="rounded-3xl bg-[#fffdf9] p-6"><Search className="text-[#6c7d68]"/><p className="mt-5 text-4xl font-black">{clicks}</p><p className="mt-1 text-sm text-[#75685f]">Interacciones</p></div><div className="rounded-3xl bg-[#fffdf9] p-6"><Star className="text-[#c6924b]"/><p className="mt-5 text-4xl font-black">Personal</p><p className="mt-1 text-sm text-[#75685f]">Tu experiencia local</p></div></div><div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]"><section className="rounded-3xl bg-[#fffdf9] p-7"><h2 className="text-2xl font-black">Mis favoritos</h2>{!favorites.length ? <div className="mt-6 rounded-2xl bg-[#faf0eb] p-6"><p className="font-bold text-[#6f1519]">Aún no tienes favoritos.</p><p className="mt-2 text-sm text-[#75685f]">Explora los negocios de Ibarra y guarda lo que te guste.</p><Link href="/explorar" className="mt-5 inline-flex rounded-full bg-[#891C20] px-5 py-3 text-sm font-bold text-white">Explorar ahora</Link></div> : <div className="mt-6 grid gap-4 sm:grid-cols-2">{favorites.map((item) => <Link key={item.id} href={item.href} className="flex gap-4 rounded-2xl border border-[#eadbca] p-4 hover:bg-[#faf0eb]"><div className="h-16 w-16 overflow-hidden rounded-xl bg-[#f4e7d9]">{item.image && <img src={item.image} alt="" className="h-full w-full object-cover"/>}</div><div><p className="text-xs font-bold uppercase text-[#891C20]">{item.entity_type}</p><h3 className="mt-1 font-black">{item.title}</h3></div></Link>)}</div>}</section><aside className="rounded-3xl bg-[#fffdf9] p-7"><div className="flex items-center gap-3"><Settings className="text-[#891C20]"/><h2 className="text-2xl font-black">Preferencias</h2></div><p className="mt-3 text-sm leading-6 text-[#75685f]">Cuéntanos qué deseas encontrar para personalizar tu experiencia.</p><textarea value={preferences} onChange={(e) => setPreferences(e.target.value)} className="mt-5 h-32 w-full rounded-2xl border border-[#eadbca] p-4"/><button onClick={savePreferences} className="mt-4 w-full rounded-full bg-[#891C20] py-3 font-bold text-white">Guardar preferencias</button></aside></div></section></main>;
}
