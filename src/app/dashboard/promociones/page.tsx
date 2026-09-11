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
useEffect(() => {

  async function loadPromotions() {

    const user = await getUser();

    if (!user) return;

    const { data: business } =
      await getBusiness(user.id);

    if (!business) return;

    const { data } =
      await getPromotions(business.id);

    setPromotions(data ?? []);

    setLoading(false);

  }

  loadPromotions();

}, []);
  return (

    <main className="min-h-screen bg-[#F8F5EF] p-10">

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold">
            Mis Promociones
          </h1>

          <p className="text-gray-500 mt-3">
            Administra todas las promociones de tu negocio.
          </p>

        </div>

        <Link
          href="/dashboard/promociones/new"
          className="bg-[#A94743] text-white px-8 py-4 rounded-full hover:bg-[#8F3F3B] transition"
        >
          + Nueva Promoción
        </Link>

      </div>

      {loading ? (

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

  <div className="mt-4 flex items-center gap-2 text-[#A94743] font-semibold">

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
    className="flex-1 text-center bg-[#A94743] text-white py-3 rounded-xl hover:bg-[#8F3F3B] transition"
  >
    Editar
  </Link>

  <button
    type="button"
    onClick={() => handleDelete(promotion.id)}
    className="flex-1 border border-red-500 text-red-500 py-3 rounded-xl hover:bg-red-500 hover:text-white transition"
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
