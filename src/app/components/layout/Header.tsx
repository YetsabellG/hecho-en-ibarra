"use client";

import Link from "next/link";
import { Compass, Heart, LogIn, Menu, Store, X } from "lucide-react";
import { useState } from "react";

const links = [["Inicio", "/"], ["Explorar", "/explorar"], ["Emprendimientos", "/emprendedores"], ["Eventos", "/eventos"], ["Promociones", "/promociones"]];

export default function Header() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-[#eadbca]/80 bg-[#fffdf9]/95 shadow-sm backdrop-blur-xl">
    <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-5 lg:px-8">
      <Link href="/" onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-2 text-[#6f1519] sm:gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#891C20] text-white shadow-sm"><Store size={20} /></span><span className="max-w-[190px] text-base font-black leading-tight tracking-[.1em] sm:max-w-none sm:text-lg">HECHO EN IBARRA</span></Link>
      <nav className="hidden items-center gap-5 text-sm font-semibold text-[#75685f] xl:flex">{links.map(([label, href]) => <Link key={href} href={href} className="hover:text-[#891C20]">{label}</Link>)}</nav>
      <div className="flex shrink-0 items-center gap-2"><Link href="/auth/visitante" className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-[#6c7d68] hover:bg-[#eef1eb] md:flex"><Heart size={16} /> Mi espacio</Link><Link href="/auth/login" className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-[#6f1519] hover:bg-[#f4e7d9] lg:flex"><LogIn size={16} /> Ingresar</Link><Link href="/dashboard" className="flex items-center gap-2 rounded-full bg-[#891C20] px-3 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#6f1519] sm:px-4 sm:text-sm"><Compass size={16} /> <span className="hidden sm:inline">Mi panel</span></Link><button type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} className="grid h-11 w-11 place-items-center rounded-full border border-[#eadbca] bg-white text-[#891C20] xl:hidden">{open ? <X size={22} /> : <Menu size={22} />}</button></div>
    </div>
    {open && <nav className="border-t border-[#eadbca] bg-[#fffdf9] px-4 py-3 shadow-lg xl:hidden">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-bold text-[#6f1519] hover:bg-[#f4e7d9]">{label}</Link>)}<div className="mt-2 grid grid-cols-2 gap-2 border-t border-[#eadbca] pt-3"><Link href="/auth/visitante" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-center text-sm font-bold text-[#6c7d68] hover:bg-[#eef1eb]">Mi espacio</Link><Link href="/auth/login" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-center text-sm font-bold text-[#6f1519] hover:bg-[#f4e7d9]">Ingresar</Link></div></nav>}
  </header>;
}
