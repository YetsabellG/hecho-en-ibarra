"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { supabase } from "../../lib/supabase";

type EventRecord = { title: string; description: string | null; event_date: string | null; event_time: string | null; location: string | null; image: string | null };
const fallback: EventRecord = { title: "Verano Day", description: "Una jornada para disfrutar Ibarra, conocer productos locales y compartir con nuestra comunidad emprendedora.", event_date: "2026-08-21", event_time: "10:00 - 22:00", location: "Plaza Imbabura", image: null };

export default function Events() {
  const [event, setEvent] = useState<EventRecord>(fallback);
  useEffect(() => {
    let active = true;
    async function load() {
      const { data } = await supabase.from("events").select("title,description,event_date,event_time,location,image").eq("status", "published").order("event_date", { ascending: false }).limit(1).maybeSingle();
      if (active && data) setEvent(data);
    }
    void load();
    return () => { active = false; };
  }, []);
  const dateLabel = event.event_date ? new Date(`${event.event_date}T12:00:00`).toLocaleDateString("es-EC", { day: "numeric", month: "long", year: "numeric" }) : "Fecha por confirmar";
  return <section className="bg-[#f8f1e7] py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="flex items-end justify-between gap-4"><div><span className="text-xs font-black uppercase tracking-[.25em] text-[#891C20]">Agenda local</span><h2 className="mt-3 text-4xl font-black text-[#342821]">Eventos de Ibarra</h2><p className="mt-3 text-[#75685f]">Actividades y encuentros reales de nuestra ciudad.</p></div><Link href="/eventos" className="hidden rounded-full border border-[#eadbca] px-5 py-3 text-sm font-bold text-[#6f1519] hover:bg-[#fffdf9] md:block">Ver agenda →</Link></div><article className="mt-10 grid overflow-hidden rounded-[28px] border border-[#eadbca] bg-[#fffdf9] shadow-sm md:grid-cols-[.85fr_1.15fr]">{event.image ? <img src={event.image} alt={event.title} className="h-full min-h-[280px] w-full object-cover" /> : <div className="grid min-h-[280px] place-items-center bg-[#dfe5db] text-[#6c7d68]"><CalendarDays size={62} /></div>}<div className="p-8"><span className="rounded-full bg-[#f4e7d9] px-3 py-1 text-xs font-bold text-[#6f1519]">Feria local</span><h3 className="mt-4 text-3xl font-black">{event.title}</h3><p className="mt-3 max-w-xl leading-7 text-[#75685f]">{event.description || "Conoce este evento local de Ibarra."}</p><div className="mt-6 grid gap-3 text-sm text-[#75685f] sm:grid-cols-3"><p className="flex gap-2"><CalendarDays size={17} className="text-[#891C20]" />{dateLabel}</p><p className="flex gap-2"><Clock size={17} className="text-[#891C20]" />{event.event_time || "Horario por confirmar"}</p><p className="flex gap-2"><MapPin size={17} className="text-[#891C20]" />{event.location || "Ibarra"}</p></div><Link href="/eventos" className="mt-7 inline-flex rounded-full bg-[#891C20] px-6 py-3 text-sm font-bold text-white hover:bg-[#6f1519]">Ver evento</Link></div></article></div></section>;
}
