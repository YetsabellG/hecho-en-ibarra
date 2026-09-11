"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { CreditCard, Home, LogOut, Menu, Package, Store, Tag, X } from "lucide-react";
import { signOut } from "../services/auth";

const items = [
  ["/dashboard", "Inicio", Home],
  ["/dashboard/productos", "Productos", Package],
  ["/dashboard/promociones", "Promociones", Tag],
  ["/mi-negocio", "Mi negocio", Store],
  ["/dashboard/plan", "Planes y pagos", CreditCard],
] as const;

export default function DashboardMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  async function logout() { await signOut(); router.push("/auth/login"); }
  return <><button aria-label="Abrir menú del emprendedor" onClick={() => setOpen(true)} className="fixed left-5 top-5 z-[70] grid h-12 w-12 place-items-center rounded-2xl bg-[#891C20] text-white shadow-lg hover:bg-[#6f1519]"><Menu size={23}/></button>{open && <div className="fixed inset-0 z-[80]"><button aria-label="Cerrar menú" onClick={() => setOpen(false)} className="absolute inset-0 bg-[#342821]/40 backdrop-blur-sm"/><aside className="relative h-full w-[min(330px,88vw)] bg-[#fffdf9] p-7 shadow-2xl"><div className="flex items-center justify-between"><Link href="/dashboard" onClick={() => setOpen(false)} className="text-sm font-black tracking-[.12em] text-[#6f1519]">HECHO EN IBARRA</Link><button aria-label="Cerrar menú" onClick={() => setOpen(false)} className="rounded-full p-2 text-[#6f1519] hover:bg-[#f4e7d9]"><X size={21}/></button></div><p className="mt-3 text-sm text-[#75685f]">Panel del emprendedor</p><nav className="mt-9 space-y-2">{items.map(([href, label, Icon]) => <Link key={href} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold ${pathname === href || (href !== "/dashboard" && pathname.startsWith(href)) ? "bg-[#891C20] text-white" : "text-[#75685f] hover:bg-[#f4e7d9] hover:text-[#6f1519]"}`}><Icon size={19}/>{label}</Link>)}</nav><div className="absolute bottom-8 left-7 right-7 space-y-2"><Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-[#75685f] hover:bg-[#f4e7d9]"><Home size={18}/> Ver sitio público</Link><button onClick={logout} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-[#75685f] hover:bg-[#f4e7d9] hover:text-[#891C20]"><LogOut size={18}/> Cerrar sesión</button></div></aside></div>}</>;
}
