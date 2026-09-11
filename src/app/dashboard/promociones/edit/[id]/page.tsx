"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  getPromotion,
  updatePromotion,
  uploadPromotionImage,
} from "../../../../services/promotion";
import FileDropzone from "../../../../components/ui/FileDropzone";

export default function EditPromotionPage() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

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

  const [status, setStatus] = useState("active");

  const [currentImage, setCurrentImage] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadPromotion() {
      if (!id) {
        setLoading(false);
        return;
      }

      const { data, error } = await getPromotion(id);

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      if (!data) {
        alert("No se encontró la promoción.");
        setLoading(false);
        return;
      }

      setTitle(data.title ?? "");
      setDescription(data.description ?? "");

      setPromotionType(
        data.promotion_type ?? "percentage"
      );

      setDiscount(
        data.discount !== null &&
        data.discount !== undefined
          ? String(data.discount)
          : ""
      );

      setSpecialPrice(
        data.special_price !== null &&
        data.special_price !== undefined
          ? String(data.special_price)
          : ""
      );

      setCouponCode(
        data.coupon_code ?? ""
      );

      setCustomText(
        data.custom_text ?? ""
      );

      setPromotionLink(
        data.promotion_link ?? ""
      );

      setStartDate(
        data.start_date ?? ""
      );

      setEndDate(
        data.end_date ?? ""
      );

      setStatus(
        data.status ?? "active"
      );

      setCurrentImage(
        data.image ?? ""
      );

      setLoading(false);
    }

    loadPromotion();
  }, [id]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setSaving(true);

    let imageUrl = currentImage;

    if (image) {
      const {
        url,
        error: uploadError,
      } = await uploadPromotionImage(image);

      if (uploadError) {
        alert(uploadError.message);
        setSaving(false);
        return;
      }

      imageUrl = url ?? currentImage;
    }

    let finalDiscount = 0;

    if (promotionType === "percentage") {
      finalDiscount = Number(discount);
    }

    const { error } = await updatePromotion(id, {
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

      start_date:
        startDate || null,

      end_date:
        endDate || null,

      image:
        imageUrl || null,

      status,
    });

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Promoción actualizada correctamente."
    );

    router.push("/dashboard/promociones");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F5EF] p-10">

        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-10 text-center">

          <h1 className="text-2xl font-bold">
            Cargando promoción...
          </h1>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F5EF] p-10">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-10">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h1 className="text-4xl font-bold text-[#891C20]">
              Editar Promoción
            </h1>

            <p className="text-gray-500 mt-2">
              Actualiza la información de tu promoción.
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              router.push(
                "/dashboard/promociones"
              )
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

          {/* DESCUENTO */}

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
                    setSpecialPrice(
                      e.target.value
                    )
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
                  setCustomText(
                    e.target.value
                  )
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
                setPromotionLink(
                  e.target.value
                )
              }
              placeholder="https://..."
            />

            <p className="text-sm text-gray-500 mt-2">
              Puedes colocar un enlace a tu catálogo,
              WhatsApp, página web o información adicional.
            </p>

          </div>

          {/* ESTADO */}

          <div>

            <label className="font-semibold">
              Estado
            </label>

            <select
              className="w-full border rounded-xl p-4 mt-2 bg-white"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >

              <option value="active">
                Activa
              </option>

              <option value="inactive">
                Inactiva
              </option>

              <option value="hidden">
                Oculta
              </option>

            </select>

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
                  setStartDate(
                    e.target.value
                  )
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
                  setEndDate(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* IMAGEN ACTUAL */}

          {currentImage && (

            <div>

              <label className="font-semibold">
                Imagen actual
              </label>

              <div className="mt-3">

                <img
                  src={currentImage}
                  alt={title}
                  className="w-full max-h-72 object-cover rounded-2xl border"
                />

              </div>

            </div>

          )}

          {/* CAMBIAR IMAGEN */}

          <FileDropzone value={image} onChange={setImage} label="Cambiar imagen o video (opcional)" hint="La nueva carga reemplazará la imagen actual." />

          {/* GUARDAR */}

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-[#891C20] text-white py-4 rounded-xl hover:bg-[#75181c] disabled:opacity-50 transition font-semibold"
          >

            {saving
              ? "Guardando..."
              : "Guardar Cambios"}

          </button>

        </form>

      </div>

    </main>
  );
}
