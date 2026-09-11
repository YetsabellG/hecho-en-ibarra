"use client";

import Header from "../components/layout/Header";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type EventRecord = { title: string; description: string | null; event_date: string | null; event_time: string | null; location: string | null; image: string | null };
export default function EventsPublicPage() {
  const [event, setEvent] = useState<EventRecord | null>(null);
  useEffect(() => { let active = true; async function load() { const { data } = await supabase.from("events").select("title,description,event_date,event_time,location,image").eq("status", "published").order("event_date", { ascending: false }).limit(1).maybeSingle(); if (active) setEvent(data); } void load(); return () => { active = false; }; }, []);
  const dateLabel = event?.event_date ? new Date(`${event.event_date}T12:00:00`).toLocaleDateString("es-EC", { day: "numeric", month: "long", year: "numeric" }) : "Fecha por confirmar";
  return <main className="min-h-screen bg-[#f8f1e7]"><Header/><section className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><span className="text-xs font-black uppercase tracking-[.25em] text-[#891C20]">Agenda local</span><h1 className="mt-3 text-5xl font-black text-[#342821]">Eventos de Ibarra</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-[#75685f]">Consulta actividades reales de nuestra ciudad.</p>{!event ? <div className="mt-12 rounded-[28px] border border-dashed border-[#d9c3ad] bg-[#fffdf9] p-16 text-center"><CalendarDays className="mx-auto text-[#891C20]" size={42}/><h2 className="mt-4 text-2xl font-black">Próximamente habrá eventos</h2></div> : <article className="mt-12 overflow-hidden rounded-[28px] border border-[#eadbca] bg-[#fffdf9] shadow-sm"><div className="grid min-h-[360px] place-items-center bg-[#dfe5db] text-[#6c7d68]">{event.image ? <img src={event.image} alt={event.title} className="h-full max-h-[520px] w-full object-cover"/> : <CalendarDays size={64}/>}</div><div className="p-8"><span className="rounded-full bg-[#f4e7d9] px-3 py-1 text-xs font-bold text-[#6f1519]">Feria local</span><h2 className="mt-4 text-3xl font-black">{event.title}</h2><p className="mt-3 max-w-2xl leading-7 text-[#75685f]">{event.description || "Conoce este evento local de Ibarra."}</p><div className="mt-6 grid gap-3 text-sm text-[#75685f] sm:grid-cols-3"><p className="flex gap-2"><CalendarDays size={17} className="text-[#891C20]"/>{dateLabel}</p><p className="flex gap-2"><Clock size={17} className="text-[#891C20]"/>{event.event_time || "Horario por confirmar"}</p><p className="flex gap-2"><MapPin size={17} className="text-[#891C20]"/>{event.location || "Ibarra"}</p></div></div></article>}</section></main>;
}
