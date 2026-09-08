"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "../../services/auth";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const { error } = await signIn(email, password);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#F8F5EF] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-[#C54B43]">
            HECHO EN IBARRA
          </h1>

          <p className="text-gray-500 mt-3">
            Inicia sesión para administrar tu emprendimiento
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="mt-10 space-y-5"
        >

          <div>

            <label className="block text-sm font-medium mb-2">
              Correo electrónico
            </label>

            <input
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#C54B43]"
            />

          </div>

          <div>

            <label className="block text-sm font-medium mb-2">
              Contraseña
            </label>

            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#C54B43]"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C54B43] hover:bg-[#A53D36] text-white py-4 rounded-2xl font-semibold transition"
          >
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>

        </form>

        <div className="mt-8 text-center">

          <Link
            href="/auth/register"
            className="text-[#C54B43] font-medium hover:underline"
          >
            ¿No tienes una cuenta? Regístrate
          </Link>

        </div>

      </div>

    </main>
  );
}