"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getUser } from "../../../services/auth";
import { getBusiness } from "../../../services/business";
import {
  createProduct,
  uploadProductImage,
} from "../../../services/product";
import type { ProductStatus } from "../../../services/product";
import FileDropzone from "../../../components/ui/FileDropzone";

export default function NewProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState<File | null>(null);
const [category, setCategory] = useState("");
const [status, setStatus] = useState<ProductStatus>("available");
  const [itemType, setItemType] = useState<"product" | "service">("product");
  useEffect(() => { setItemType(new URLSearchParams(window.location.search).get("tipo") === "servicio" ? "service" : "product"); }, []);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const user = await getUser();

    if (!user) return;

    const { data: business } = await getBusiness(user.id);

    if (!business) {
      alert("Business not found");
      return;
    }

    let imageUrl = "";

    if (image) {
      const { url, error } = await uploadProductImage(image);

      if (error) {
        alert(error.message);
        return;
      }

      imageUrl = url ?? "";
    }
const slug =
  `${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;
    const { error } = await createProduct({
  uid: user.id,
  business_id: business.id,
  name,
  slug,
  description,
  price: Number(price),
  stock: itemType === "service" ? 0 : Number(stock),
  image: imageUrl,
  category,
  item_type: itemType,
  status,
});

    if (error) {
      alert(error.message);
      return;
    }

    alert("Producto o servicio creado correctamente.");

    router.push("/dashboard/productos");
  }

  return (
    <main className="min-h-screen bg-[#F8F5EF] p-10">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-10">

        <h1 className="text-4xl font-bold text-[#891C20]">
          {itemType === "service" ? "Nuevo servicio" : "Nuevo producto"}
        </h1>

        <p className="text-gray-500 mt-2">
          {itemType === "service" ? "Publica un servicio o atención profesional de tu emprendimiento." : "Publica un producto de tu emprendimiento."}
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 mt-10"
        >

          <div>

            <label className="font-semibold">
              Nombre del producto o servicio
            </label>

            <input
              className="w-full border rounded-xl p-4 mt-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          </div>

          <div>

  <label className="font-semibold">
    Description
  </label>

  <textarea
    className="w-full border rounded-xl p-4 mt-2 h-32"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />

</div>

<div>

  <label className="font-semibold">
    Category
  </label>

  <select
    className="w-full border rounded-xl p-4 mt-2"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >

    <option value="">
      Select a category
    </option>

    <option>Perfumes</option>
    <option>Candles</option>
    <option>Soap</option>
    <option>Cosmetics</option>
    <option>Crafts</option>
    <option>Decoration</option>
    <option>Food</option>
    <option>Health & Beauty</option>

  </select>

</div>

<div className="grid grid-cols-2 gap-6">

            <div>

              <label className="font-semibold">
                Price
              </label>

              <input
                type="number"
                className="w-full border rounded-xl p-4 mt-2"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

            </div>

            {itemType === "product" && <div>
              <label className="font-semibold">Stock</label>
              <input type="number" className="w-full border rounded-xl p-4 mt-2" value={stock} onChange={(e) => setStock(e.target.value)} />
            </div>}

          </div>
<div>

  <label className="font-semibold">
    Category
  </label>

  <input
    className="w-full border rounded-xl p-4 mt-2"
    placeholder="Ej: Artesanías"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  />

</div>

<div>

  <label className="font-semibold">
    Status
  </label>

  <select
    className="w-full border rounded-xl p-4 mt-2"
    value={status}
      onChange={(e) => setStatus(e.target.value as ProductStatus)}
  >
    <option value="available">
      Disponible
    </option>

    <option value="out_of_stock">
      Agotado
    </option>

    <option value="hidden">
      Oculto
    </option>

  </select>

</div>
          <FileDropzone value={image} onChange={setImage} label="Imagen o video del producto o servicio" />

          <button
            type="submit"
            className="bg-[#891C20] text-white px-8 py-4 rounded-xl hover:opacity-90"
          >
            Guardar producto o servicio
          </button>

        </form>

      </div>

    </main>
  );
}
