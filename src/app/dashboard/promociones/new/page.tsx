"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { getUser } from "@/app/services/auth";
import { getBusiness } from "@/app/services/business";
import {
  createPromotion,
  uploadPromotionImage,
} from "@/app/services/promotion";

export default function NewPromotionPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [promotionType, setPromotionType] =
    useState("percentage");

  const [discount, setDiscount] = useState("");
  const [specialPrice, setSpecialPrice] = useState("");

  const [couponCode, setCouponCode] = useState("");
  const [customText, setCustomText] = useState("");
  const [promotionLink, setPromotionLink] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const user = await getUser();

    if (!user) {
      alert("Debes iniciar sesión.");
      setLoading(false);
      return;
    }

    const { data: business } =
      await getBusiness(user.id);

    if (!business) {
      alert("No se encontró tu emprendimiento.");
      setLoading(false);
      return;
    }

    let imageUrl = "";

    if (image) {
      const {
        url,
        error: uploadError,
      } = await uploadPromotionImage(image);

      if (uploadError) {
        alert(uploadError.message);
        setLoading(false);
        return;
      }

      imageUrl = url ?? "";
    }

    let finalDiscount = 0;

    if (promotionType === "percentage") {
      finalDiscount = Number(discount);
    }

    const { error } =
      await createPromotion({
        business_id: business.id,

        title,

        description,

        promotion_type: promotionType,

        discount: finalDiscount,

        special_price:
          promotionType === "special_price"
            ? Number(specialPrice)
            : null,

        coupon_code:
          promotionType === "coupon"
            ? couponCode
            : null,

        custom_text:
          promotionType === "custom"
            ? customText
            : null,

        promotion_link:
          promotionLink.trim() || null,

        start_date: startDate || null,

        end_date: endDate || null,

        image: imageUrl,

        status: "active",
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Promoción creada correctamente.");

    router.push("/dashboard/promociones");
  }

  return (
    <main className="min-h-screen bg-[#F8F5EF] p-10">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-10">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h1 className="text-4xl font-bold text-[#76263d]">
              Nueva Promoción
            </h1>

            <p className="text-gray-500 mt-2">
              Crea una promoción para atraer más clientes.
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              router.push("/dashboard/promociones")
            }
            className="border border-gray-300 px-5 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            Volver
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 mt-10"
        >

          {/* TÍTULO */}

          <div>

            <label className="font-semibold">
              Título
            </label>

            <input
              className="w-full border rounded-xl p-4 mt-2"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Ej: Promoción de verano"
              required
            />

          </div>

          {/* DESCRIPCIÓN */}

          <div>

            <label className="font-semibold">
              Descripción
            </label>

            <textarea
              className="w-full border rounded-xl p-4 mt-2 h-32"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Describe brevemente la promoción..."
            />

          </div>

          {/* TIPO */}

          <div>

            <label className="font-semibold">
              Tipo de promoción
            </label>

            <select
              className="w-full border rounded-xl p-4 mt-2 bg-white"
              value={promotionType}
              onChange={(e) =>
                setPromotionType(e.target.value)
              }
            >

              <option value="percentage">
                Descuento porcentual
              </option>

              <option value="2x1">
                2×1
              </option>

              <option value="3x2">
                3×2
              </option>

              <option value="special_price">
                Precio especial
              </option>

              <option value="free_shipping">
                Envío gratis
              </option>

              <option value="coupon">
                Cupón / Código
              </option>

              <option value="custom">
                Personalizada
              </option>

            </select>

          </div>

          {/* PORCENTAJE */}

          {promotionType === "percentage" && (

            <div>

              <label className="font-semibold">
                Descuento
              </label>

              <div className="relative mt-2">

                <input
                  type="number"
                  min="1"
                  max="100"
                  className="w-full border rounded-xl p-4 pr-12"
                  value={discount}
                  onChange={(e) =>
                    setDiscount(e.target.value)
                  }
                  placeholder="Ej: 20"
                  required
                />

                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                  %
                </span>

              </div>

            </div>

          )}

          {/* PRECIO ESPECIAL */}

          {promotionType === "special_price" && (

            <div>

              <label className="font-semibold">
                Precio especial
              </label>

              <div className="relative mt-2">

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full border rounded-xl p-4 pl-10"
                  value={specialPrice}
                  onChange={(e) =>
                    setSpecialPrice(e.target.value)
                  }
                  placeholder="Ej: 10.00"
                  required
                />

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                  $
                </span>

              </div>

            </div>

          )}

          {/* CUPÓN */}

          {promotionType === "coupon" && (

            <div>

              <label className="font-semibold">
                Código del cupón
              </label>

              <input
                className="w-full border rounded-xl p-4 mt-2 uppercase"
                value={couponCode}
                onChange={(e) =>
                  setCouponCode(
                    e.target.value.toUpperCase()
                  )
                }
                placeholder="Ej: VERANO20"
                required
              />

              <p className="text-sm text-gray-500 mt-2">
                Este código podrá ser utilizado por tus clientes.
              </p>

            </div>

          )}

          {/* PERSONALIZADA */}

          {promotionType === "custom" && (

            <div>

              <label className="font-semibold">
                Describe tu promoción
              </label>

              <textarea
                className="w-full border rounded-xl p-4 mt-2 h-32"
                value={customText}
                onChange={(e) =>
                  setCustomText(e.target.value)
                }
                placeholder="Ej: Compra 2 productos y recibe un regalo."
                required
              />

            </div>

          )}

          {/* ENLACE */}

          <div>

            <label className="font-semibold">
              Enlace de la promoción
              <span className="text-gray-400 font-normal">
                {" "} (opcional)
              </span>
            </label>

            <input
              type="url"
              className="w-full border rounded-xl p-4 mt-2"
              value={promotionLink}
              onChange={(e) =>
                setPromotionLink(e.target.value)
              }
              placeholder="https://..."
            />

            <p className="text-sm text-gray-500 mt-2">
              Puedes colocar un enlace a tu catálogo,
              WhatsApp, página web o información adicional.
            </p>

          </div>

          {/* FECHAS */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>

              <label className="font-semibold">
                Fecha Inicio
              </label>

              <input
                type="date"
                className="w-full border rounded-xl p-4 mt-2"
                value={startDate}
                onChange={(e) =>
                  setStartDate(e.target.value)
                }
              />

            </div>

            <div>

              <label className="font-semibold">
                Fecha Fin
              </label>

              <input
                type="date"
                className="w-full border rounded-xl p-4 mt-2"
                value={endDate}
                onChange={(e) =>
                  setEndDate(e.target.value)
                }
              />

            </div>

          </div>

          {/* IMAGEN */}

          <div>

            <label className="font-semibold">
              Imagen de la promoción
            </label>

            <input
              type="file"
              accept="image/*"
              className="w-full border rounded-xl p-4 mt-2"
              onChange={(e) =>
                setImage(
                  e.target.files?.[0] ?? null
                )
              }
            />

          </div>

          {/* BOTÓN */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#76263d] text-white py-4 rounded-xl hover:bg-[#641f31] disabled:opacity-50 transition font-semibold"
          >

            {loading
              ? "Guardando..."
              : "Guardar Promoción"}

          </button>

        </form>

      </div>

    </main>
  );
}