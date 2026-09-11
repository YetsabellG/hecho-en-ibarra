"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "../../services/auth";

export default function RegisterPage() {
const [loading, setLoading] = useState(false);

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [name, setName] = useState("");

const router = useRouter();
async function handleRegister(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();
if (password !== confirmPassword) {
  alert("Las contraseñas no coinciden.");
  return;
}

  setLoading(true);

  const { error } = await signUp(email, password);

  setLoading(false);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Cuenta creada correctamente. Revisa tu correo electrónico.");

  router.push("/auth/login");
}

  return (
    <main className="min-h-screen bg-[#F8F5EF] flex items-center justify-center px-6">

      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-10">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-[#A94743]">
            Crear cuenta
          </h1>

          <p className="text-gray-500 mt-3">
            Registra tu emprendimiento en Hecho en Ibarra
          </p>

        </div>

<form
  onSubmit={handleRegister}
  className="mt-10 space-y-5"
>

          <input
  type="text"
  placeholder="Nombre completo"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full border rounded-2xl px-5 py-4"
/>

          <input
  type="email"
  placeholder="Correo electrónico"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full border rounded-2xl px-5 py-4"
/>

          <input
  type="password"
  placeholder="Contraseña"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full border rounded-2xl px-5 py-4"
/>

          <input
  type="password"
  placeholder="Confirmar contraseña"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  className="w-full border rounded-2xl px-5 py-4"
/>

          <button
            disabled={loading}
            className="w-full bg-[#A94743] text-white py-4 rounded-2xl hover:bg-[#8F3F3B] transition"
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>

        </form>

        <div className="mt-8 text-center">

          <Link
            href="/auth/login"
            className="text-[#A94743] font-semibold hover:underline"
          >
            Ya tengo una cuenta
          </Link>

        </div>

      </div>

    </main>
  );
}