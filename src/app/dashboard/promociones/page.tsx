"use client";
import { useEffect, useState } from "react";
import { getUser } from "@/app/services/auth";
import { getBusiness } from "@/app/services/business";
import {
  getPromotions,
  deletePromotion,
} from "@/app/services/promotion";
import type { PromotionRecord } from "@/app/services/promotion";
import Link from "next/link";
import {
  Gift,
  BadgeDollarSign,
  Truck,
  Tag,
  Sparkles,
} from "lucide-react";
export default function PromotionsPage() {
const [promotions, setPromotions] = useState<PromotionRecord[]>([]);
const [loading, setLoading] = useState(true);
const [errorMessage, setErrorMessage] = useState("");
const [lastUpdated, setLastUpdated] = useState("");
async function handleDelete(id: number) {

  const confirmed = window.confirm(
    "¿Seguro que deseas eliminar esta promoción?"
  );

  if (!confirmed) {
    return;
  }

  const { error } = await deletePromotion(id);

  if (error) {
    alert(error.message);
    return;
  }

  setPromotions((current) =>
    current.filter((promotion) => promotion.id !== id)
  );

  alert("Promoción eliminada correctamente.");
}
async function loadPromotions() {
  setErrorMessage("");
  const user = await getUser();
  if (!user) { setLoading(false); setErrorMessage("Inicia sesión para ver tus promociones."); return; }
  const { data: business, error: businessError } = await getBusiness(user.id);
  if (businessError || !business) { setLoading(false); setErrorMessage("No encontramos tu emprendimiento asociado."); return; }
  const { data, error } = await getPromotions(business.id, user.id);
  if (error) { setLoading(false); setErrorMessage(error.message); return; }
  setPromotions(data ?? []);
  setLastUpdated(new Date().toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit" }));
  setLoading(false);
}
useEffect(() => {
  void loadPromotions();
  const timer = window.setInterval(() => void loadPromotions(), 15000);
  const channel = window.setTimeout(() => void loadPromotions(), 800);
  return () => { window.clearInterval(timer); window.clearTimeout(channel); };
}, []);
  return (

    <main className="min-h-screen bg-[#F8F5EF] p-10">

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold">
            Mis Promociones
          </h1>

          <p className="text-gray-500 mt-3">Administra todas las promociones de tu negocio. Se actualiza automáticamente.</p>

        </div>

        <Link
          href="/dashboard/promociones/new"
          className="bg-[#891C20] text-white px-8 py-4 rounded-full hover:bg-[#75181c] transition"
        >
          + Nueva Promoción
        </Link>

      </div><span className="text-xs text-gray-400">{lastUpdated ? `Actualizado ${lastUpdated}` : ""}</span>

      {errorMessage ? (
  <div className="bg-white rounded-3xl shadow p-12 text-center"><h2 className="text-2xl font-bold text-[#891C20]">No se pudieron cargar tus promociones</h2><p className="mt-3 text-gray-500">{errorMessage}</p><button type="button" onClick={() => { setLoading(true); void loadPromotions(); }} className="mt-6 rounded-full bg-[#891C20] px-6 py-3 font-bold text-white">Reintentar</button></div>

) : loading ? (

  <div className="bg-white rounded-3xl shadow p-20 text-center">

    <h2 className="text-2xl font-bold">
      Cargando promociones...
    </h2>

  </div>

) : promotions.length === 0 ? (

  <div className="bg-white rounded-3xl shadow p-20 text-center">

    <h2 className="text-3xl font-bold">
      No tienes promociones
    </h2>

    <p className="text-gray-500 mt-4">
      Crea tu primera promoción para atraer más clientes.
    </p>

  </div>

) : (

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

    {promotions.map((promotion) => (

      <div
        key={promotion.id}
        className="bg-white rounded-3xl shadow overflow-hidden"
      >

        {promotion.image && (

          <img
            src={promotion.image}
            alt={promotion.title}
            className="w-full h-56 object-cover"
          />

        )}

        <div className="p-6">

  <h2 className="text-2xl font-bold">
    {promotion.title}
  </h2>

  <p className="text-gray-500 mt-2">
    {promotion.description}
  </p>

  <div className="mt-4 flex items-center gap-2 text-[#891C20] font-semibold">

  {promotion.promotion_type === "percentage" && (
    <>
      <Tag size={20} strokeWidth={2} />
      <span>
        {promotion.discount}% de descuento
      </span>
    </>
  )}

  {promotion.promotion_type === "2x1" && (
    <>
      <Gift size={20} strokeWidth={2} />
      <span>
        Promoción 2×1
      </span>
    </>
  )}

  {promotion.promotion_type === "3x2" && (
    <>
      <Gift size={20} strokeWidth={2} />
      <span>
        Promoción 3×2
      </span>
    </>
  )}

  {promotion.promotion_type === "special_price" && (
    <>
      <BadgeDollarSign size={20} strokeWidth={2} />
      <span>
        Precio especial: ${promotion.special_price}
      </span>
    </>
  )}

  {promotion.promotion_type === "free_shipping" && (
    <>
      <Truck size={20} strokeWidth={2} />
      <span>
        Envío gratis
      </span>
    </>
  )}

  {promotion.promotion_type === "coupon" && (
    <>
      <Tag size={20} strokeWidth={2} />
      <span>
        Cupón: {promotion.coupon_code}
      </span>
    </>
  )}

  {promotion.promotion_type === "custom" && (
    <>
      <Sparkles size={20} strokeWidth={2} />
      <span>
        {promotion.custom_text}
      </span>
    </>
  )}

</div>

  <p className="text-sm text-gray-400 mt-2">
    {promotion.start_date} - {promotion.end_date}
  </p>

  <div className="flex gap-3 mt-6">

  <Link
    href={`/dashboard/promociones/edit/${promotion.id}`}
    className="flex-1 text-center bg-[#891C20] text-white py-3 rounded-xl hover:bg-[#75181c] transition"
  >
    Editar
  </Link>

  <button
    type="button"
    onClick={() => handleDelete(promotion.id)}
    className="flex-1 border border-[#891C20] text-[#891C20] py-3 rounded-xl hover:bg-[#891C20] hover:text-white transition"
  >
    Eliminar
  </button>

</div>

</div>

      </div>

    ))}

  </div>

)}

    </main>

  );

}
