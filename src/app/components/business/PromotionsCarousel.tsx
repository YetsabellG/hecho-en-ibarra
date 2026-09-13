"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

type Promotion = { id: number; title: string; description: string | null; image: string | null; discount: number | null; special_price: number | null };

export default function PromotionsCarousel({ promotions, businessName, whatsapp }: { promotions: Promotion[]; businessName: string; whatsapp?: string | null }) {
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  useEffect(() => {
    if (promotions.length < 2) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % promotions.length), 5000);
    return () => window.clearInterval(timer);
  }, [promotions.length]);
  const promotion = promotions[index % promotions.length];
  const move = (direction: number) => setIndex((current) => (current + direction + promotions.length) % promotions.length);
  const phone = whatsapp ? whatsapp.replace(/\D/g, "").replace(/^0/, "593") : "";
  const message = encodeURIComponent(`Hola, vengo desde Hecho en Ibarra. Vi la promoción ${promotion.title}. ¿Está disponible en ${businessName}?`);
  return <div className="mt-6"><div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-[#eadbca] bg-[#fffdf9] shadow-sm touch-pan-y" onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const distance = event.changedTouches[0]?.clientX - touchStart.current; if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1); touchStart.current = null; }}><div className="h-64 bg-[#f4e7d9] sm:h-80">{promotion.image && <img src={promotion.image} alt={promotion.title} className="h-full w-full object-cover"/>}</div><div className="min-h-[170px] p-6 text-center"><span className="text-xs font-black uppercase tracking-wider text-[#891C20]">Oferta activa · {index + 1} de {promotions.length}</span><h3 className="mt-2 text-2xl font-black">{promotion.title}</h3><p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#75685f]">{promotion.description || "Consulta esta promoción directamente con el emprendimiento."}</p>{promotion.discount ? <p className="mt-3 text-lg font-black text-[#6f1519]">{promotion.discount}% de descuento</p> : promotion.special_price ? <p className="mt-3 text-lg font-black text-[#6f1519]">Precio especial: ${Number(promotion.special_price).toFixed(2)}</p> : null}{phone && <a href={`https://wa.me/${phone}?text=${message}`} target="_blank" rel="noreferrer" className="mx-auto mt-5 flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-[#2f9b62] px-4 py-3 text-sm font-bold text-white"><MessageCircle size={17}/> Consultar por WhatsApp</a>}</div><button type="button" onClick={() => move(-1)} aria-label="Promoción anterior" className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[#eadbca] bg-white/95 text-[#891C20] shadow-sm"><ChevronLeft size={20}/></button><button type="button" onClick={() => move(1)} aria-label="Siguiente promoción" className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[#eadbca] bg-white/95 text-[#891C20] shadow-sm"><ChevronRight size={20}/></button></div><div className="mt-3 flex justify-center gap-2">{promotions.map((item, dot) => <button type="button" key={item.id} onClick={() => setIndex(dot)} aria-label={`Ver promoción ${dot + 1}`} className={`h-2 rounded-full transition-all ${dot === index ? "w-7 bg-[#891C20]" : "w-2 bg-[#d8b9bd]"}`}/>)}</div></div>;
}
