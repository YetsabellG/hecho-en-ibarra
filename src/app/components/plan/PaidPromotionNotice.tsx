import Link from "next/link";
import { LockKeyhole, Sparkles } from "lucide-react";
import { promotionPlanNotice } from "@/app/lib/planAccess";

export default function PaidPromotionNotice() {
  return (
    <section className="mx-auto max-w-3xl rounded-[28px] border border-[#ead6d0] bg-[#fffdf9] p-8 text-center shadow-sm sm:p-12">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#f2dfe0] text-[#891C20]">
        <LockKeyhole size={25} />
      </span>
      <p className="mt-5 text-xs font-black uppercase tracking-[.22em] text-[#891C20]">
        Función para planes de pago
      </p>
      <h1 className="mt-3 text-3xl font-black text-[#32262b]">
        Desbloquea tus promociones
      </h1>
      <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#6d5960]">
        {promotionPlanNotice()}
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link
          href="/dashboard/plan"
          className="inline-flex items-center gap-2 rounded-full bg-[#891C20] px-6 py-3 font-bold text-white transition hover:bg-[#75181c]"
        >
          <Sparkles size={17} />
          Ver planes disponibles
        </Link>
        <Link
          href="/dashboard"
          className="rounded-full border border-[#ead6d0] px-6 py-3 font-bold text-[#891C20] transition hover:bg-[#faf0eb]"
        >
          Volver al panel
        </Link>
      </div>
    </section>
  );
}
