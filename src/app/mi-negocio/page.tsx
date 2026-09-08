"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "../services/auth";
import { createBusiness, getBusiness, updateBusiness } from "../services/business";

const emptyForm = { name: "", description: "", category: "", city: "", address: "", whatsapp: "", instagram: "", facebook: "", tiktok: "", website: "" };
type FormState = typeof emptyForm;

export default function MyBusinessPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [businessId, setBusinessId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadBusiness() {
      const user = await getUser();
      if (!user) { router.replace("/auth/login"); return; }
      const { data } = await getBusiness(user.id);
      if (data) {
        setBusinessId(data.id);
        setForm({
          name: data.name || "", description: data.description || "", category: data.category || "", city: data.city || "", address: data.address || "",
          whatsapp: data.whatsapp || "", instagram: data.instagram || "", facebook: data.facebook || "", tiktok: data.tiktok || "", website: data.website || "",
        });
      }
      setLoading(false);
    }
    loadBusiness();
  }, [router]);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.name.trim() || !form.category.trim()) { setMessage("Completa al menos el nombre y la categoría."); return; }
    setSaving(true); setMessage("");
    const user = await getUser();
    if (!user) { router.replace("/auth/login"); return; }
    const slug = form.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const result = businessId ? await updateBusiness(businessId, { ...form, slug }) : await createBusiness({ ...form, slug, uid: user.id });
    setSaving(false);
    if (result.error) { setMessage(result.error.message); return; }
    setMessage("Información guardada correctamente. Tu perfil podrá publicarse después de ser verificado.");
    if (!businessId) setTimeout(() => router.push("/dashboard"), 900);
  }

  if (loading) return <main className="min-h-screen bg-[#F8F5EF] p-10 text-center text-[#766D67]">Cargando tu negocio…</main>;

  const fields: Array<[keyof FormState, string, string]> = [
    ["name", "Nombre del emprendimiento", "Ej. Lamy Aromas & Bienestar"], ["category", "Categoría", "Ej. Salud y belleza"], ["city", "Ciudad", "Ibarra"], ["address", "Dirección", "Dirección o referencia"], ["whatsapp", "WhatsApp", "593 99 999 9999"], ["instagram", "Instagram", "@tuemprendimiento"], ["facebook", "Facebook", "facebook.com/tuemprendimiento"], ["tiktok", "TikTok", "@tuemprendimiento"], ["website", "Sitio web", "https://..."],
  ];

  return (
    <main className="min-h-screen bg-[#F8F5EF] px-5 py-10 text-[#2D2926] sm:px-8 sm:py-14">
      <div className="mx-auto max-w-5xl rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-10">
        <p className="font-semibold uppercase tracking-[0.2em] text-[#C54B43]">Perfil del negocio</p>
        <h1 className="mt-2 text-4xl font-bold">{businessId ? "Edita tu emprendimiento" : "Crea tu emprendimiento"}</h1>
        <p className="mt-3 max-w-2xl text-[#766D67]">Completa la información que verán tus clientes. El perfil permanecerá pendiente hasta que sea verificado.</p>
        {message && <div className="mt-7 rounded-2xl border border-[#E7B4AE] bg-[#FFF4F2] px-5 py-4 text-sm text-[#8A3029]">{message}</div>}
        <form onSubmit={handleSubmit} className="mt-9 grid gap-5 md:grid-cols-2">
          {fields.map(([field, label, placeholder]) => <label key={field} className={field === "website" ? "md:col-span-2" : ""}><span className="mb-2 block text-sm font-semibold">{label}</span><input value={form[field]} onChange={(e) => updateField(field, e.target.value)} placeholder={placeholder} className="w-full rounded-2xl border border-[#E2D9D2] px-5 py-4 outline-none transition focus:border-[#C54B43] focus:ring-2 focus:ring-[#C54B43]/10" /></label>)}
          <label className="md:col-span-2"><span className="mb-2 block text-sm font-semibold">Descripción</span><textarea value={form.description} onChange={(e) => updateField("description", e.target.value)} placeholder="Cuenta qué hace especial a tu negocio" rows={6} className="w-full rounded-2xl border border-[#E2D9D2] px-5 py-4 outline-none transition focus:border-[#C54B43] focus:ring-2 focus:ring-[#C54B43]/10" /></label>
          <button type="submit" disabled={saving} className="md:col-span-2 rounded-2xl bg-[#C54B43] py-4 font-semibold text-white transition hover:bg-[#A53D36] disabled:opacity-60">{saving ? "Guardando…" : "Guardar información"}</button>
        </form>
      </div>
    </main>
  );
}
