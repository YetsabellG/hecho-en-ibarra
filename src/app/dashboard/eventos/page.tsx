"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarDays, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { getUser } from "../../services/auth";
import { getBusiness } from "../../services/business";
import { deleteEvent, getBusinessEvents, updateEvent } from "../../services/event";

type EventRow = { id: number; title: string; description: string | null; event_date: string | null; event_time: string | null; location: string | null; status: "draft" | "published" | "hidden" };

export default function EventsDashboardPage() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function load() {
    const user = await getUser();
    if (!user) return;
    const { data: business } = await getBusiness(user.id);
    if (!business) return;
    const { data } = await getBusinessEvents(business.id);
    setEvents((data || []) as EventRow[]);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function toggle(event: EventRow) {
    const next = event.status === "published" ? "hidden" : "published";
    const { error } = await updateEvent(event.id, { status: next });
    if (error) { setMessage(error.message); return; }
    setEvents((current) => current.map((item) => item.id === event.id ? { ...item, status: next } : item));
  }

  async function remove(id: number) {
    if (!window.confirm("¿Eliminar este evento?")) return;
    const { error } = await deleteEvent(id);
    if (error) { setMessage(error.message); return; }
    setEvents((current) => current.filter((event) => event.id !== id));
  }

  return <main className="min-h-screen bg-[#F8F5EF] px-5 py-8 text-[#2D2926] sm:px-8 lg:px-10"><div className="mx-auto max-w-6xl"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C54B43]">Dashboard</p><h1 className="mt-2 text-4xl font-bold">Mis eventos</h1><p className="mt-3 text-[#766D67]">Publica actividades, ferias y capacitaciones de tu emprendimiento.</p></div><Link href="/dashboard/eventos/new" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#C54B43] px-5 py-4 font-semibold text-white hover:bg-[#A53D36]"><Plus size={19} /> Nuevo evento</Link></div>{message && <p className="mt-6 rounded-2xl bg-[#FFF4F2] p-4 text-sm text-[#8A3029]">{message}</p>}{loading ? <div className="mt-10 rounded-3xl bg-white p-10 text-center text-[#766D67]">Cargando eventos…</div> : events.length === 0 ? <div className="mt-10 rounded-3xl border border-dashed border-[#D9CFC7] bg-white p-12 text-center"><CalendarDays className="mx-auto text-[#C54B43]" size={34} /><h2 className="mt-4 text-2xl font-bold">Todavía no tienes eventos</h2><p className="mt-2 text-[#766D67]">Crea el primero cuando tengas una actividad que compartir.</p></div> : <div className="mt-10 grid gap-5 md:grid-cols-2">{events.map((event) => <article key={event.id} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5"><div className="flex items-start justify-between gap-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${event.status === "published" ? "bg-[#E8F2EB] text-[#39724A]" : "bg-[#FFF2D8] text-[#9A6A16]"}`}>{event.status === "published" ? "Publicado" : event.status === "hidden" ? "Oculto" : "Borrador"}</span><CalendarDays size={20} className="text-[#C54B43]" /></div><h2 className="mt-5 text-2xl font-bold">{event.title}</h2><p className="mt-2 line-clamp-3 text-sm leading-6 text-[#766D67]">{event.description}</p><p className="mt-5 text-sm text-[#766D67]">{event.event_date || "Fecha por confirmar"}{event.event_time ? ` · ${event.event_time}` : ""}{event.location ? ` · ${event.location}` : ""}</p><div className="mt-6 flex gap-2"><button type="button" onClick={() => toggle(event)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#E2D9D2] py-3 text-sm font-semibold hover:border-[#C54B43]">{event.status === "published" ? <EyeOff size={16} /> : <Eye size={16} />}{event.status === "published" ? "Ocultar" : "Publicar"}</button><button type="button" onClick={() => remove(event.id)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E7B4AE] px-4 py-3 text-sm font-semibold text-[#A53D36] hover:bg-[#FFF4F2]"><Trash2 size={16} /> Eliminar</button></div></article>)}</div>}</div></main>;
}
