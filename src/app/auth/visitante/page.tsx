"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass, Heart, LogIn, UserRound } from "lucide-react";
import { signIn, signUp } from "../../services/auth";

export default function VisitorAccessPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const result = mode === "register" ? await signUp(email, password) : await signIn(email, password);
    setLoading(false);
    if (result.error) { alert(result.error.message); return; }
    if (mode === "register") {
      alert("Cuenta de visitante creada. Si Supabase solicita confirmación, revisa tu correo.");
      setMode("login");
      return;
    }
    router.push("/visitante");
  }

  return <main className="min-h-screen bg-[#f8f1e7] px-5 py-12"><div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-center"><section className="rounded-[32px] bg-[#6f1519] p-10 text-white"><Link href="/" className="text-sm font-black tracking-[.2em] text-[#f7d9c7]">HECHO EN IBARRA</Link><h1 className="mt-16 text-5xl font-black leading-tight">Tu espacio para descubrir lo local.</h1><p className="mt-6 text-lg leading-8 text-[#f7e8dd]">Guarda tus emprendimientos favoritos, recibe una experiencia más personalizada y vuelve fácilmente a lo que te gustó.</p><div className="mt-10 flex items-center gap-3 text-[#f7d9c7]"><Heart size={20}/> Favoritos, preferencias e historial</div></section><section className="rounded-[32px] border border-[#eadbca] bg-[#fffdf9] p-7 shadow-xl sm:p-10"><div className="flex items-center gap-3 text-[#891C20]"><UserRound size={22}/><span className="text-xs font-black uppercase tracking-[.22em]">Cuenta de visitante</span></div><h2 className="mt-4 text-4xl font-black text-[#342821]">{mode === "register" ? "Crea tu espacio" : "Bienvenido de vuelta"}</h2><p className="mt-3 text-[#75685f]">{mode === "register" ? "Regístrate para guardar lo que te gusta." : "Ingresa para ver tus favoritos y preferencias."}</p><form onSubmit={submit} className="mt-8 space-y-5">{mode === "register" && <label className="block text-sm font-bold">Nombre<input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-2xl border px-5 py-4" placeholder="Tu nombre" /></label>}<label className="block text-sm font-bold">Correo electrónico<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-2xl border px-5 py-4" placeholder="correo@ejemplo.com" /></label><label className="block text-sm font-bold">Contraseña<input required minLength={6} type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-2xl border px-5 py-4" placeholder="Mínimo 6 caracteres" /></label><button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#891C20] py-4 font-bold text-white">{mode === "register" ? <UserRound size={18}/> : <LogIn size={18}/>} {loading ? "Procesando…" : mode === "register" ? "Crear cuenta de visitante" : "Entrar a mi espacio"}</button></form><button onClick={() => setMode(mode === "register" ? "login" : "register")} className="mt-6 w-full text-sm font-bold text-[#891C20] hover:underline">{mode === "register" ? "Ya tengo una cuenta" : "Quiero crear una cuenta"}</button><Link href="/auth/login" className="mt-5 flex items-center justify-center gap-2 text-sm text-[#75685f] hover:text-[#891C20]"><Compass size={16}/> Volver al acceso de emprendedores</Link></section></div></main>;
}
