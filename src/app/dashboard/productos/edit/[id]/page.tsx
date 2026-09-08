"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import {
  getProduct,
  updateProduct,
  uploadProductImage,
} from "../../../../services/product";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);
const [category, setCategory] = useState("");
const [status, setStatus] = useState("available");

  useEffect(() => {
    loadProduct();
  }, []);

  async function loadProduct() {
    const { data, error } = await getProduct(id);

    if (error || !data) {
      alert("Product not found");
      router.push("/dashboard/productos");
      return;
    }

    setName(data.name);
    setDescription(data.description);
    setPrice(String(data.price));
    setStock(String(data.stock));
    setImage(data.image || "");
setCategory(data.category || "");
setStatus(data.status || "available");

    setLoading(false);
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    let imageUrl = image;

    if (newImage) {
      const { url, error } = await uploadProductImage(newImage);

      if (error) {
        alert(error.message);
        return;
      }

      imageUrl = url ?? image;
    }

    const { error } = await updateProduct(id, {
      name,
  slug: `${name.toLowerCase().replace(/\s+/g, "-")}-${id}`,
  description,
  price: Number(price),
  stock: Number(stock),
  image: imageUrl,
  category,
  status,
});

    if (error) {
      alert(error.message);
      return;
    }

    alert("Product updated!");

    router.push("/dashboard/productos");
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F5EF] p-10">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-10">

        <h1 className="text-4xl font-bold text-[#C54B43]">
          Edit Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 mt-10"
        >

          <div>

            <label className="font-semibold">
              Product Name
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

            <div>

              <label className="font-semibold">
                Stock
              </label>

              <input
                type="number"
                className="w-full border rounded-xl p-4 mt-2"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />

            </div>
<div>

  <label className="font-semibold">
    Category
  </label>

  <input
    className="w-full border rounded-xl p-4 mt-2"
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
    onChange={(e) => setStatus(e.target.value)}
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
          </div>

          {image && (

            <div>

              <label className="font-semibold">
                Current Image
              </label>

              <img
                src={image}
                alt={name}
                className="w-40 h-40 object-cover rounded-xl mt-3"
              />

            </div>

          )}

          <div>

            <label className="font-semibold">
              Change Image
            </label>

            <input
              type="file"
              accept="image/*"
              className="w-full border rounded-xl p-4 mt-2"
              onChange={(e) => {
                if (e.target.files?.length) {
                  setNewImage(e.target.files[0]);
                }
              }}
            />

          </div>

          <button
            className="bg-[#C54B43] text-white px-8 py-4 rounded-xl"
          >
            Save Changes
          </button>

        </form>

      </div>

    </main>
  );
}