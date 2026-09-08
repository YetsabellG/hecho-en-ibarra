"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, BarChart3, Building2, Check, ClipboardList, Eye, EyeOff, LayoutDashboard, Package, ShieldCheck, Tags, Users, X } from "lucide-react";
import { getUser } from "../services/auth";
import { supabase } from "../lib/supabase";

const ADMIN_EMAIL = "guerrero.antonellaa11@gmail.com";

type AdminStats = { businesses: number; products: number; promotions: number };
type BusinessRow = { id: number; name: string; slug: string; category: string | null; city: string | null; verified: boolean; premium: boolean };

const cards = [
  { key: "businesses" as const, label: "Emprendimientos", icon: Building2, color: "bg-[#FDE8E5] text-[#A53D36]" },
  { key: "products" as const, label: "Productos", icon: Package, color: "bg-[#FFF2D8] text-[#9A6A16]" },
  { key: "promotions" as const, label: "Promociones", icon: Tags, color: "bg-[#E8F2EB] text-[#39724A]" },
];

export default function AdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [stats, setStats] = useState<AdminStats>({ businesses: 0, products: 0, promotions: 0 });
  const [businesses, setBusinesses] = useState<BusinessRow[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function loadAdminPanel() {
      const user = await getUser();
      if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL) { router.replace("/auth/login"); return; }
      const [businessResult, products, promotions] = await Promise.all([
        supabase.from("businesses").select("id,name,slug,category,city,verified,premium").order("created_at", { ascending: false }),
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("promotions").select("id", { count: "exact", head: true }),
      ]);
      if (!active) return;
      const firstError = businessResult.error || products.error || promotions.error;
      if (firstError) setError("No se pudieron cargar todos los datos del panel.");
      const rows = (businessResult.data || []) as BusinessRow[];
      setBusinesses(rows);
      setStats({ businesses: businessResult.count ?? rows.length, products: products.count ?? 0, promotions: promotions.count ?? 0 });
      setAuthorized(true); setLoading(false);
    }
    loadAdminPanel();
    return () => { active = false; };
  }, [router]);

  async function toggleVerification(business: BusinessRow) {
    setSavingId(business.id); setError("");
    const { error: updateError } = await supabase.from("businesses").update({ verified: !business.verified }).eq("id", business.id);
    setSavingId(null);
    if (updateError) { setError(updateError.message); return; }
    setBusinesses((current) => current.map((item) => item.id === business.id ? { ...item, verified: !item.verified } : item));
  }

  if (loading || !authorized) return <main className="min-h-screen bg-[#F8F5EF] flex items-center justify-center px-6"><div className="rounded-3xl bg-white px-8 py-10 text-center shadow-sm"><ShieldCheck className="mx-auto h-10 w-10 text-[#C54B43]" /><p className="mt-4 font-semibold text-[#2D2926]">Verificando acceso seguro…</p></div></main>;

  return (
    <main className="min-h-screen bg-[#F8F5EF] text-[#2D2926]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-5 rounded-[2rem] bg-[#2D2926] p-7 text-white shadow-xl sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div><div className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#F5C8A9]"><ShieldCheck size={18} /> Administración segura</div><h1 className="text-3xl font-bold sm:text-5xl">Hola, Antonella</h1><p className="mt-3 max-w-xl text-white/70">Controla el contenido y el crecimiento de Hecho en Ibarra desde un solo lugar.</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm text-white/80"><p className="font-semibold text-white">Administradora única</p><p className="mt-1 break-all">{ADMIN_EMAIL}</p></div>
        </header>
        {error && <div className="rounded-2xl border border-[#E7B4AE] bg-[#FFF4F2] px-5 py-4 text-sm text-[#8A3029]">{error}</div>}

        <section className="grid gap-5 sm:grid-cols-3">{cards.map(({ key, label, icon: Icon, color }) => <div key={key} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5"><div className={`mb-8 flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}><Icon size={23} /></div><p className="text-sm font-medium text-[#766D67]">{label}</p><p className="mt-2 text-4xl font-bold">{stats[key]}</p></div>)}</section>

        <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C54B43]">Moderación</p><h2 className="mt-2 text-2xl font-bold">Emprendimientos registrados</h2><p className="mt-2 text-sm text-[#766D67]">Aprueba únicamente los perfiles que estén listos para mostrarse públicamente.</p></div><ClipboardList className="text-[#C54B43]" /></div>
          <div className="mt-7 overflow-x-auto">{businesses.length === 0 ? <div className="rounded-2xl bg-[#F8F5EF] p-8 text-center text-[#766D67]">Todavía no hay emprendimientos registrados.</div> : <table className="w-full min-w-[650px] text-left text-sm"><thead><tr className="border-b border-[#EEE6DF] text-[#766D67]"><th className="pb-3 font-semibold">Negocio</th><th className="pb-3 font-semibold">Categoría</th><th className="pb-3 font-semibold">Estado</th><th className="pb-3 text-right font-semibold">Acción</th></tr></thead><tbody>{businesses.map((business) => <tr key={business.id} className="border-b border-[#F1EBE6] last:border-0"><td className="py-5"><p className="font-semibold">{business.name}</p><p className="mt-1 text-xs text-[#A69A91]">{business.city || "Sin ciudad"}</p></td><td className="py-5 text-[#766D67]">{business.category || "Sin categoría"}</td><td className="py-5"><span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${business.verified ? "bg-[#E8F2EB] text-[#39724A]" : "bg-[#FFF2D8] text-[#9A6A16]"}`}>{business.verified ? <><Check size={13} /> Publicado</> : <><X size={13} /> Pendiente</>}</span></td><td className="py-5 text-right"><button type="button" disabled={savingId === business.id} onClick={() => toggleVerification(business)} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition disabled:opacity-50 ${business.verified ? "border border-[#E7B4AE] text-[#A53D36] hover:bg-[#FFF4F2]" : "bg-[#C54B43] text-white hover:bg-[#A53D36]"}`}>{business.verified ? <EyeOff size={15} /> : <Eye size={15} />}{business.verified ? "Ocultar" : "Publicar"}</button></td></tr>)}</tbody></table>}</div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.25fr_.75fr]"><div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-8"><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C54B43]">Gestión</p><h2 className="mt-2 text-2xl font-bold">Accesos rápidos</h2></div><LayoutDashboard className="text-[#C54B43]" /></div><div className="mt-7 grid gap-3 sm:grid-cols-2"><AdminLink href="/emprendedores" icon={Building2} label="Ver directorio público" /><AdminLink href="/dashboard/productos" icon={Package} label="Revisar productos" /><AdminLink href="/dashboard/promociones" icon={Tags} label="Revisar promociones" /><AdminLink href="/dashboard" icon={BarChart3} label="Dashboard del negocio" /></div></div><div className="rounded-3xl bg-[#C54B43] p-7 text-white shadow-sm sm:p-8"><Users className="mb-8" size={28} /><h2 className="text-2xl font-bold">Crecimiento ordenado</h2><p className="mt-3 leading-7 text-white/80">Lamy es tu negocio destacado inicial. Los demás perfiles aparecerán aquí para que los revises antes de publicarlos.</p></div></section>
      </div>
    </main>
  );
}

function AdminLink({ href, icon: Icon, label }: { href: string; icon: typeof Building2; label: string }) { return <Link href={href} className="group flex items-center justify-between rounded-2xl border border-[#EEE6DF] px-4 py-4 transition hover:border-[#C54B43] hover:bg-[#FFF8F5]"><span className="flex items-center gap-3 text-sm font-semibold"><Icon size={19} className="text-[#C54B43]" />{label}</span><ArrowRight size={17} className="text-[#B7AAA1] transition group-hover:translate-x-1 group-hover:text-[#C54B43]" /></Link>; }
