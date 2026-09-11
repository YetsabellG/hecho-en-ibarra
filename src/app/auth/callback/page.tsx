"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();
  useEffect(() => {
    let active = true;
    async function finish() {
      const url = new URL(window.location.href);
      const next = url.searchParams.get("next") || "/dashboard";
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const accessToken = hash.get("access_token");
      const refreshToken = hash.get("refresh_token");
      if (accessToken && refreshToken) await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
      else if (url.searchParams.get("code")) await supabase.auth.exchangeCodeForSession(window.location.href);
      if (active) router.replace(next.startsWith("/") ? next : "/dashboard");
    }
    void finish();
    return () => { active = false; };
  }, [router]);
  return <main className="grid min-h-screen place-items-center bg-[#f8f1e7] px-5"><div className="rounded-3xl bg-[#fffdf9] p-10 text-center shadow-xl"><h1 className="text-2xl font-black text-[#891C20]">Confirmando tu correo…</h1><p className="mt-3 text-[#75685f]">Te llevaremos a tu panel de emprendedor.</p></div></main>;
}
