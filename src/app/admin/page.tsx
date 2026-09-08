"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Building2,
  ClipboardList,
  LayoutDashboard,
  Package,
  ShieldCheck,
  Tags,
  Users,
} from "lucide-react";
import { getUser } from "../services/auth";
import { supabase } from "../lib/supabase";

const ADMIN_EMAIL = "guerrero.antonellaa11@gmail.com";

type AdminStats = {
  businesses: number;
  products: number;
  promotions: number;
};

const cards = [
  {
    key: "businesses" as const,
    label: "Emprendimientos",
    icon: Building2,
    color: "bg-[#FDE8E5] text-[#A53D36]",
  },
  {
    key: "products" as const,
    label: "Productos",
    icon: Package,
    color: "bg-[#FFF2D8] text-[#9A6A16]",
  },
  {
    key: "promotions" as const,
    label: "Promociones",
    icon: Tags,
    color: "bg-[#E8F2EB] text-[#39724A]",
  },
];

export default function AdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats>({
    businesses: 0,
    products: 0,
    promotions: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadAdminPanel() {
      const user = await getUser();

      if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL) {
        router.replace("/auth/login");
        return;
      }

      const [businesses, products, promotions] = await Promise.all([
        supabase.from("businesses").select("id", { count: "exact", head: true }),
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("promotions").select("id", { count: "exact", head: true }),
      ]);

      if (!active) return;

      const firstError = businesses.error || products.error || promotions.error;
      if (firstError) {
        setError("No se pudieron cargar todos los datos del panel.");
      }

      setStats({
        businesses: businesses.count ?? 0,
        products: products.count ?? 0,
        promotions: promotions.count ?? 0,
      });
      setAuthorized(true);
      setLoading(false);
    }

    loadAdminPanel();

    return () => {
      active = false;
    };
  }, [router]);

  if (loading || !authorized) {
    return (
      <main className="min-h-screen bg-[#F8F5EF] flex items-center justify-center px-6">
        <div className="rounded-3xl bg-white px-8 py-10 text-center shadow-sm">
          <ShieldCheck className="mx-auto h-10 w-10 text-[#C54B43]" />
          <p className="mt-4 font-semibold text-[#2D2926]">Verificando acceso seguro…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F5EF] text-[#2D2926]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-5 rounded-[2rem] bg-[#2D2926] p-7 text-white shadow-xl sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <div className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#F5C8A9]">
              <ShieldCheck size={18} /> Administración segura
            </div>
            <h1 className="text-3xl font-bold sm:text-5xl">Hola, Antonella</h1>
            <p className="mt-3 max-w-xl text-white/70">
              Controla el contenido y el crecimiento de Hecho en Ibarra desde un solo lugar.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm text-white/80">
            <p className="font-semibold text-white">Administradora única</p>
            <p className="mt-1 break-all">{ADMIN_EMAIL}</p>
          </div>
        </header>

        {error && (
          <div className="rounded-2xl border border-[#E7B4AE] bg-[#FFF4F2] px-5 py-4 text-sm text-[#8A3029]">
            {error}
          </div>
        )}

        <section className="grid gap-5 sm:grid-cols-3">
          {cards.map(({ key, label, icon: Icon, color }) => (
            <div key={key} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className={`mb-8 flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}>
                <Icon size={23} />
              </div>
              <p className="text-sm font-medium text-[#766D67]">{label}</p>
              <p className="mt-2 text-4xl font-bold">{stats[key]}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
          <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C54B43]">Gestión</p>
                <h2 className="mt-2 text-2xl font-bold">Accesos rápidos</h2>
              </div>
              <LayoutDashboard className="text-[#C54B43]" />
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <AdminLink href="/emprendedores" icon={Building2} label="Revisar emprendimientos" />
              <AdminLink href="/dashboard/productos" icon={Package} label="Revisar productos" />
              <AdminLink href="/dashboard/promociones" icon={Tags} label="Revisar promociones" />
              <AdminLink href="/dashboard" icon={BarChart3} label="Ver dashboard del negocio" />
            </div>
          </div>

          <div className="rounded-3xl bg-[#C54B43] p-7 text-white shadow-sm sm:p-8">
            <ClipboardList className="mb-8" size={28} />
            <h2 className="text-2xl font-bold">Siguiente etapa</h2>
            <p className="mt-3 leading-7 text-white/80">
              Aquí añadiremos moderación, estados de publicación, usuarios y estadísticas a medida que terminemos cada módulo.
            </p>
            <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-[#FFE3D1]">
              <Users size={18} /> Panel preparado para crecer
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function AdminLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof Building2;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-2xl border border-[#EEE6DF] px-4 py-4 transition hover:border-[#C54B43] hover:bg-[#FFF8F5]"
    >
      <span className="flex items-center gap-3 text-sm font-semibold">
        <Icon size={19} className="text-[#C54B43]" />
        {label}
      </span>
      <ArrowRight size={17} className="text-[#B7AAA1] transition group-hover:translate-x-1 group-hover:text-[#C54B43]" />
    </Link>
  );
}
