import Link from "next/link";
import { Compass, Heart, LogIn, Store } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#eadbca]/80 bg-[#fffdf9]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-[#6f1519]">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#891C20] text-white shadow-sm"><Store size={20} /></span>
          <span className="text-lg font-black tracking-[.12em]">HECHO EN IBARRA</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-[#75685f] lg:flex">
          <Link href="/" className="hover:text-[#891C20]">Inicio</Link>
          <Link href="/explorar" className="hover:text-[#891C20]">Explorar</Link>
          <Link href="/emprendedores" className="hover:text-[#891C20]">Emprendimientos</Link>
          <Link href="/eventos" className="hover:text-[#891C20]">Eventos</Link>
          <Link href="/promociones" className="hover:text-[#891C20]">Promociones</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/auth/visitante" className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-[#6c7d68] hover:bg-[#eef1eb] sm:flex"><Heart size={16} /> Mi espacio</Link>
          <Link href="/auth/login" className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-[#6f1519] hover:bg-[#f4e7d9] sm:flex"><LogIn size={16} /> Ingresar</Link>
          <Link href="/dashboard" className="flex items-center gap-2 rounded-full bg-[#891C20] px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#6f1519]"><Compass size={16} /> Mi panel</Link>
        </div>
      </div>
    </header>
  );
}
