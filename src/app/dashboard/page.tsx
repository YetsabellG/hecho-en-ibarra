"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StatsCard from "./StatsCard";
import ProductTable from "./ProductTable";
import QuickActions from "./QuickActions";

import { getUser } from "../services/auth";
import { getBusiness } from "../services/business";
import { getProducts } from "../services/product";

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
const [totalProducts, setTotalProducts] = useState(0);

const [totalStock, setTotalStock] = useState(0);

const [inventoryValue, setInventoryValue] = useState(0);
  useEffect(() => {

  async function loadDashboard() {

    const user = await getUser();

    if (!user) return;

    setUserEmail(user.email ?? "");

    const { data: business } =
      await getBusiness(user.id);

    if (!business) return;
setBusinessName(
  business.name || "Emprendedor"
);
    const { data: products } =
      await getProducts(business.id);

    if (!products) return;

    setTotalProducts(products.length);

    setTotalStock(

      products.reduce(

        (sum, product) =>

          sum + Number(product.stock),

        0

      )

    );

    setInventoryValue(

      products.reduce(

        (sum, product) =>

          sum +

          Number(product.price) *

          Number(product.stock),

        0

      )

    );

  }

  loadDashboard();

}, []);

  return (
    <main className="min-h-screen bg-[#F8F5EF] flex">

      <aside className="w-72 bg-white border-r border-gray-200 p-8">

        <h2 className="text-3xl font-bold text-[#C54B43]">
          HECHO EN IBARRA
        </h2>

        <p className="text-gray-500 mt-2">
          Panel del Emprendedor
        </p>

        <nav className="mt-10 space-y-2">

          <button className="w-full text-left p-4 rounded-xl bg-[#C54B43] text-white">
            🏠 Inicio
          </button>

          <button className="w-full text-left p-4 rounded-xl hover:bg-gray-100">
            📦 Productos
          </button>

          <Link
  href="/dashboard/promociones"
  className="block w-full text-left p-4 rounded-xl hover:bg-gray-100"
>
  🔥 Promociones
</Link>

              <Link href="/dashboard/eventos" className="block w-full text-left p-4 rounded-xl hover:bg-gray-100">
                📅 Eventos
              </Link>

          <button className="w-full text-left p-4 rounded-xl hover:bg-gray-100">
            ⭐ Destacados
          </button>

          <button className="w-full text-left p-4 rounded-xl hover:bg-gray-100">
            💳 Mi Plan
          </button>

          <button className="w-full text-left p-4 rounded-xl hover:bg-gray-100">
            ⚙ Configuración
          </button>

        </nav>

      </aside>

      <section className="flex-1 p-10">

        <h1 className="text-5xl font-bold">
          Hola, {businessName} 👋
        </h1>

        <p className="text-gray-600 mt-3">
          Bienvenido al panel de administración de tu emprendimiento.
        </p>

        <div className="grid md:grid-cols-4 gap-6 mt-12">

          <StatsCard
  title="Productos"
  value={String(totalProducts)}
/>

<StatsCard
  title="Stock Total"
  value={String(totalStock)}
  color="#C54B43"
/>

<StatsCard
  title="Valor Inventario"
  value={`$${inventoryValue.toFixed(2)}`}
  color="#8B5E3C"
/>

<StatsCard
  title="Usuario"
  value={userEmail || "-"}
  color="#D4AF37"
/>

        </div>

        <QuickActions />

        <ProductTable />

      </section>

    </main>
  );
}
