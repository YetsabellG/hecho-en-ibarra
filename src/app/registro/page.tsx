"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Store } from "lucide-react";
import { getUser } from "@/app/services/auth";
import { createBusiness, getBusiness } from "@/app/services/business";

type FormState = {
  name: string;
  category: string;
  description: string;
  city: string;
  address: string;
  whatsapp: string;
};

type PageState = "checking" | "ready" | "unauthenticated" | "already-registered";

const initialForm: FormState = {
  name: "",
  category: "",
  description: "",
  city: "Ibarra",
  address: "",
  whatsapp: "",
};

function createSlug(name: string) {
  const normalized = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${normalized}-${Date.now()}`;
}

export default function Registro() {
  const router = useRouter();
  const [pageState, setPageState] = useState<PageState>("checking");
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;
    async function checkAccount() {
      const user = await getUser();
      if (!active) return;
      if (!user) {
        setPageState("unauthenticated");
        return;
      }
      const { data: business } = await getBusiness(user.id);
      if (!active) return;
      if (business) {
        setPageState("already-registered");
        router.replace("/mi-negocio");
        return;
      }
      setPageState("ready");
    }
    void checkAccount();
    return () => { active = false; };
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSaving(true);

    const user = await getUser();
    if (!user) {
      setSaving(false);
      setPageState("unauthenticated");
      return;
    }

    const { data: existingBusiness } = await getBusiness(user.id);
    if (existingBusiness) {
      setSaving(false);
      router.replace("/mi-negocio");
      return;
    }

    const { error } = await createBusiness({
      uid: user.id,
      name: form.name.trim(),
      slug: createSlug(form.name),
      category: form.category.trim(),
      description: form.description.trim(),
      city: form.city.trim() || "Ibarra",
      address: form.address.trim() || null,
      whatsapp: form.whatsapp.trim() || null,
    });

    setSaving(false);
    if (error) {
      setErrorMessage(error.message);
      return;
    }

    router.replace("/dashboard");
  }

  if (pageState === "checking" || pageState === "already-registered") {
    return <main className="grid min-h-screen place-items-center bg-[#F8F5EF] px-5"><p className="font-bold text-[#891C20]">Revisando tu cuenta…</p></main>;
  }

  if (pageState === "unauthenticated") {
    return (
      <main className="grid min-h-screen place-items-center bg-[#F8F5EF] px-5 py-12">
        <section className="max-w-lg rounded-[28px] bg-white p-8 text-center shadow-xl sm:p-10">
          <Store className="mx-auto text-[#891C20]" size={42} />
          <h1 className="mt-5 text-3xl font-black text-[#32262b]">Primero crea tu cuenta</h1>
          <p className="mt-3 leading-7 text-[#6d5960]">Para registrar tu emprendimiento necesitas iniciar sesión. La ficha se crea automáticamente con el plan Gratis.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/auth/register" className="rounded-full bg-[#891C20] px-6 py-3 font-bold text-white">Crear cuenta</Link>
            <Link href="/auth/login" className="rounded-full border border-[#ead6d0] px-6 py-3 font-bold text-[#891C20]">Iniciar sesión</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F5EF] px-5 py-10 sm:py-16">
      <section className="mx-auto max-w-3xl overflow-hidden rounded-[30px] bg-white shadow-xl">
        <div className="bg-[#891C20] px-7 py-8 text-white sm:px-10">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15"><Store size={23} /></span>
            <div>
              <p className="text-xs font-black uppercase tracking-[.22em] text-[#f4dfe1]">Bienvenido a Hecho en Ibarra</p>
              <h1 className="mt-1 text-3xl font-black">Registra tu emprendimiento</h1>
            </div>
          </div>
          <p className="mt-4 max-w-2xl leading-7 text-[#f4dfe1]">Completa esta información para crear tu perfil. Tu cuenta empezará con el plan Gratis; podrás solicitar un plan de pago cuando quieras acceder a promociones y otras funciones.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5 p-7 sm:grid-cols-2 sm:p-10">
          <label className="text-sm font-bold text-[#342821] sm:col-span-2">
            Nombre del emprendimiento
            <input required maxLength={100} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Ej.: Lamy Spa & Bienestar" className="mt-2 w-full rounded-2xl border border-[#eadbca] px-5 py-3.5 outline-none focus:border-[#891C20]" />
          </label>
          <label className="text-sm font-bold text-[#342821]">
            Categoría
            <input required maxLength={80} value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} placeholder="Ej.: Salud y belleza" className="mt-2 w-full rounded-2xl border border-[#eadbca] px-5 py-3.5 outline-none focus:border-[#891C20]" />
          </label>
          <label className="text-sm font-bold text-[#342821]">
            Ciudad
            <input maxLength={80} value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} className="mt-2 w-full rounded-2xl border border-[#eadbca] px-5 py-3.5 outline-none focus:border-[#891C20]" />
          </label>
          <label className="text-sm font-bold text-[#342821] sm:col-span-2">
            Descripción
            <textarea required maxLength={1000} rows={4} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Cuéntales a tus clientes qué ofreces." className="mt-2 w-full rounded-2xl border border-[#eadbca] px-5 py-3.5 outline-none focus:border-[#891C20]" />
          </label>
          <label className="text-sm font-bold text-[#342821]">
            Dirección (opcional)
            <input maxLength={200} value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} className="mt-2 w-full rounded-2xl border border-[#eadbca] px-5 py-3.5 outline-none focus:border-[#891C20]" />
          </label>
          <label className="text-sm font-bold text-[#342821]">
            WhatsApp (opcional)
            <input type="tel" maxLength={30} value={form.whatsapp} onChange={(event) => setForm({ ...form, whatsapp: event.target.value })} placeholder="Ej.: 593 98 123 4567" className="mt-2 w-full rounded-2xl border border-[#eadbca] px-5 py-3.5 outline-none focus:border-[#891C20]" />
          </label>

          <div className="flex items-start gap-3 rounded-2xl bg-[#faf0eb] p-4 text-sm text-[#6d5960] sm:col-span-2">
            <CheckCircle2 className="mt-0.5 shrink-0 text-[#39724d]" size={19} />
            <p><strong className="text-[#32262b]">Plan inicial: Gratis.</strong> Puedes completar tu perfil y catálogo básico. Las promociones se habilitan al activar un plan de pago.</p>
          </div>

          {errorMessage && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700 sm:col-span-2">No se pudo registrar el emprendimiento: {errorMessage}</p>}

          <button disabled={saving} className="rounded-2xl bg-[#891C20] px-6 py-4 font-bold text-white transition hover:bg-[#75181c] disabled:opacity-60 sm:col-span-2">
            {saving ? "Guardando tu emprendimiento…" : "Crear perfil gratuito"}
          </button>
        </form>
      </section>
    </main>
  );
}
