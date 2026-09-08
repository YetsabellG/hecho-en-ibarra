"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "../../../services/auth";
import { getBusiness } from "../../../services/business";
import { createEvent } from "../../../services/event";

export default function NewEventPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", event_date: "", event_time: "", location: "", link: "", status: "draft" as "draft" | "published" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  function setField(field: keyof typeof form, value: string) { setForm((current) => ({ ...current, [field]: value })); }
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setSaving(true); setError("");
    const user = await getUser();
    if (!user) { router.replace("/auth/login"); return; }
    const { data: business } = await getBusiness(user.id);
    if (!business) { setError("Primero debes crear el perfil de tu negocio."); setSaving(false); return; }
    const slug = `${form.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}-${Date.now()}`;
    const { error: createError } = await createEvent({ ...form, uid: user.id, business_id: business.id, slug });
    setSaving(false);
    if (createError) { setError(createError.message); return; }
    router.push("/dashboard/eventos");
  }
  return <main className="min-h-screen bg-[#F8F5EF] px-5 py-8 text-[#2D2926] sm:px-8"><div className="mx-auto max-w-3xl"><Link href="/dashboard/eventos" className="text-sm font-semibold text-[#C54B43]">← Volver a eventos</Link><div className="mt-6 rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-10"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C54B43]">Nuevo evento</p><h1 className="mt-2 text-4xl font-bold">Comparte una actividad</h1>{error && <p className="mt-6 rounded-2xl bg-[#FFF4F2] p-4 text-sm text-[#8A3029]">{error}</p>}<form onSubmit={submit} className="mt-8 grid gap-5 md:grid-cols-2"><label className="md:col-span-2"><span className="mb-2 block text-sm font-semibold">Título</span><input required value={form.title} onChange={(e) => setField("title", e.target.value)} placeholder="Ej. Feria artesanal de Ibarra" className="w-full rounded-2xl border border-[#E2D9D2] px-5 py-4 outline-none focus:border-[#C54B43]" /></label><label className="md:col-span-2"><span className="mb-2 block text-sm font-semibold">Descripción</span><textarea value={form.description} onChange={(e) => setField("description", e.target.value)} rows={5} placeholder="Cuenta de qué se trata" className="w-full rounded-2xl border border-[#E2D9D2] px-5 py-4 outline-none focus:border-[#C54B43]" /></label><label><span className="mb-2 block text-sm font-semibold">Fecha</span><input type="date" value={form.event_date} onChange={(e) => setField("event_date", e.target.value)} className="w-full rounded-2xl border border-[#E2D9D2] px-5 py-4 outline-none focus:border-[#C54B43]" /></label><label><span className="mb-2 block text-sm font-semibold">Hora</span><input value={form.event_time} onChange={(e) => setField("event_time", e.target.value)} placeholder="10:00" className="w-full rounded-2xl border border-[#E2D9D2] px-5 py-4 outline-none focus:border-[#C54B43]" /></label><label className="md:col-span-2"><span className="mb-2 block text-sm font-semibold">Lugar</span><input value={form.location} onChange={(e) => setField("location", e.target.value)} placeholder="Lugar del evento" className="w-full rounded-2xl border border-[#E2D9D2] px-5 py-4 outline-none focus:border-[#C54B43]" /></label><label className="md:col-span-2"><span className="mb-2 block text-sm font-semibold">Enlace opcional</span><input type="url" value={form.link} onChange={(e) => setField("link", e.target.value)} placeholder="https://..." className="w-full rounded-2xl border border-[#E2D9D2] px-5 py-4 outline-none focus:border-[#C54B43]" /></label><div className="md:col-span-2 flex flex-col gap-3 rounded-2xl bg-[#F8F5EF] p-5"><p className="text-sm font-semibold">¿Cómo quieres guardarlo?</p><label className="flex gap-3 text-sm"><input type="radio" checked={form.status === "draft"} onChange={() => setField("status", "draft")} /> Guardar como borrador</label><label className="flex gap-3 text-sm"><input type="radio" checked={form.status === "published"} onChange={() => setField("status", "published")} /> Publicar inmediatamente</label></div><button disabled={saving} className="md:col-span-2 rounded-2xl bg-[#C54B43] py-4 font-semibold text-white hover:bg-[#A53D36] disabled:opacity-60">{saving ? "Guardando…" : "Guardar evento"}</button></form></div></div></main>;
}
