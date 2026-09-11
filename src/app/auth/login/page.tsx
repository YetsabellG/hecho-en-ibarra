"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Compass, Store, UserRound } from "lucide-react";
import { signIn } from "../../services/auth";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) { alert(error.message); return; }
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#f8f1e7] px-5 py-12 lg:px-8">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <section className="hidden rounded-[32px] bg-[#5a1d2e] p-10 text-white shadow-xl lg:block">
          <Link href="/" className="text-sm font-black tracking-[.2em] text-[#f7d9c7]">HECHO EN IBARRA</Link>
          <h1 className="mt-20 text-5xl font-black leading-tight">Un espacio para hacer crecer lo local.</h1>
          <p className="mt-6 text-lg leading-8 text-[#f7e8dd]">Gestiona tu emprendimiento y conecta con personas que quieren apoyar el talento de Ibarra.</p>
          <div className="mt-12 rounded-2xl bg-white/10 p-5 text-sm leading-6 text-[#f7e8dd]">Si solo quieres conocer negocios, productos y eventos, puedes entrar como visitante sin crear una cuenta.</div>
        </section>
        <section className="rounded-[32px] border border-[#eadbca] bg-[#fffdf9] p-7 shadow-[0_20px_60px_rgba(105,72,45,.12)] sm:p-10">
          <Link href="/" className="text-sm font-black tracking-[.2em] text-[#76263d] lg:hidden">HECHO EN IBARRA</Link>
          <div className="mt-6"><span className="text-xs font-black uppercase tracking-[.22em] text-[#76263d]">Acceso de emprendedor</span><h1 className="mt-3 text-4xl font-black text-[#342821]">Inicia sesión</h1><p className="mt-3 text-[#75685f]">Administra tu negocio, productos y promociones.</p></div>
          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <label className="block text-sm font-bold text-[#342821]">Correo electrónico<input required type="email" placeholder="correo@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-2xl border px-5 py-4" /></label>
            <label className="block text-sm font-bold text-[#342821]">Contraseña<input required type="password" placeholder="Tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-2xl border px-5 py-4" /></label>
            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#76263d] py-4 font-bold text-white hover:bg-[#5a1d2e]">{loading ? "Ingresando…" : "Entrar como emprendedor"}<ArrowRight size={18}/></button>
          </form>
          <div className="mt-4 text-right"><Link href="/auth/forgot-password" className="text-sm font-bold text-[#76263d] hover:underline">¿Olvidaste tu contraseña?</Link></div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2"><Link href="/auth/register" className="flex items-center justify-center gap-2 rounded-2xl border border-[#eadbca] px-4 py-3 text-center text-sm font-bold text-[#5a1d2e] hover:bg-[#f4e7d9]"><Store size={17}/> Crear cuenta de emprendedor</Link><Link href="/explorar" className="flex items-center justify-center gap-2 rounded-2xl border border-[#eadbca] px-4 py-3 text-center text-sm font-bold text-[#6c7d68] hover:bg-[#eef1eb]"><Compass size={17}/> Entrar como visitante</Link></div>
          <Link href="/administracion" className="mt-7 flex items-center justify-center gap-2 text-sm font-bold text-[#75685f] hover:text-[#76263d]"><UserRound size={16}/> Acceso separado para administradora</Link>
        </section>
      </div>
    </main>
  );
}
