"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { signIn } from "../services/auth";

export default function AdministrationLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) { alert(error.message); return; }
    if (email.trim().toLowerCase() !== "guerrero.antonellaa11@gmail.com") {
      alert("Este acceso es únicamente para la administradora.");
      return;
    }
    router.push("/admin");
  }

  return <main className="grid min-h-screen place-items-center bg-[#f8f1e7] px-5 py-12"><section className="w-full max-w-md rounded-[32px] border border-[#eadbca] bg-[#fffdf9] p-8 shadow-[0_20px_60px_rgba(105,72,45,.12)] sm:p-10"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#833B38] text-white"><ShieldCheck size={28}/></div><div className="mt-6 text-center"><span className="text-xs font-black uppercase tracking-[.22em] text-[#A94743]">Zona protegida</span><h1 className="mt-3 text-3xl font-black">Acceso administrativo</h1><p className="mt-3 text-sm leading-6 text-[#75685f]">Esta entrada es solo para la administradora de Hecho en Ibarra.</p></div><form onSubmit={handleSubmit} className="mt-8 space-y-5"><label className="block text-sm font-bold">Correo de administradora<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu-correo@ejemplo.com" className="mt-2 w-full rounded-2xl border px-5 py-4" /></label><label className="block text-sm font-bold">Contraseña<input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Tu contraseña" className="mt-2 w-full rounded-2xl border px-5 py-4" /></label><button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#833B38] py-4 font-bold text-white hover:bg-[#6d302c]">{loading ? "Verificando…" : "Entrar al panel"}<ArrowRight size={18}/></button></form><div className="mt-6 flex items-start gap-3 rounded-2xl bg-[#f4e7d9] p-4 text-xs leading-5 text-[#833B38]"><LockKeyhole size={16} className="mt-0.5 shrink-0"/>El panel comprueba la cuenta autorizada antes de mostrar información administrativa.</div><Link href="/auth/login" className="mt-7 block text-center text-sm font-bold text-[#75685f] hover:text-[#A94743]">Volver al acceso de emprendedores</Link></section></main>;
}
