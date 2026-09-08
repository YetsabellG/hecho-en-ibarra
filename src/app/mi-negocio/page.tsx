"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getUser } from "../services/auth";
import { getBusiness, createBusiness } from "../services/business";

export default function MyBusinessPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    async function checkBusiness() {
      const user = await getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { data } = await getBusiness(user.id);

      if (data) {
        router.push("/dashboard");
      }
    }

    checkBusiness();
  }, [router]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const user = await getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { error } = await createBusiness({
       uid: user.id,
  name: name,
  slug: name.toLowerCase().replace(/\s+/g, "-"),
  description: description,
  category: category,
  city: city,
  address: address,
  whatsapp: whatsapp,
  instagram: instagram,
  facebook: facebook,
  tiktok: tiktok,
  website: website,
  image: "",
  verified: false,
  premium: false,
  products: 0,
  rating: 0,
  visits: 0,
  favorites: 0,
});

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#F8F5EF] py-14 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold text-[#C54B43]">
          Mi emprendimiento
        </h1>

        <p className="text-gray-500 mt-3">
          Completa la información de tu negocio.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6 mt-10"
        >

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del emprendimiento"
            className="border rounded-2xl px-5 py-4"
          />

          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Categoría"
            className="border rounded-2xl px-5 py-4"
          />

          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Ciudad"
            className="border rounded-2xl px-5 py-4"
          />

          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Dirección"
            className="border rounded-2xl px-5 py-4"
          />

          <input
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="WhatsApp"
            className="border rounded-2xl px-5 py-4"
          />

          <input
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="Instagram"
            className="border rounded-2xl px-5 py-4"
          />

          <input
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            placeholder="Facebook"
            className="border rounded-2xl px-5 py-4"
          />

          <input
            value={tiktok}
            onChange={(e) => setTiktok(e.target.value)}
            placeholder="TikTok"
            className="border rounded-2xl px-5 py-4"
          />

          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Sitio web"
            className="border rounded-2xl px-5 py-4 md:col-span-2"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción del emprendimiento"
            rows={6}
            className="border rounded-2xl px-5 py-4 md:col-span-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-[#C54B43] text-white py-4 rounded-2xl hover:bg-[#A53D36] transition"
          >
            {loading
              ? "Guardando..."
              : "Guardar emprendimiento"}
          </button>

        </form>

      </div>
    </main>
  );
}