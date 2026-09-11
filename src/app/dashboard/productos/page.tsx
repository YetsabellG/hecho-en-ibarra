"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { getUser } from "../../services/auth";
import { getBusiness } from "../../services/business";
import {
  getProducts,
  deleteProduct,
} from "../../services/product";
import type { ProductRecord } from "../../services/product";

export default function ProductsPage() {

  const [products, setProducts] = useState<ProductRecord[]>([]);

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("Todas");

  const [statusFilter, setStatusFilter] =
    useState("Todos");

  const [sortBy, setSortBy] =
    useState("newest");

  useEffect(() => {

    async function loadProducts() {

      const user = await getUser();

      if (!user) return;

      const { data: business } =
        await getBusiness(user.id);

      if (!business) return;

      const { data } =
        await getProducts(business.id);

      if (data) {
        setProducts(data);
      }

    }

    loadProducts();

  }, []);

  async function handleDelete(id: number) {

    const confirmDelete = confirm(
      "¿Eliminar este producto?"
    );

    if (!confirmDelete) return;

    const { error } =
      await deleteProduct(id);

    if (error) {
      alert(error.message);
      return;
    }

    setProducts((current) =>
      current.filter(
        (product) => product.id !== id
      )
    );

  }

  const totalProducts = products.length;

  const totalInventoryValue =
    products.reduce(
      (total, product) =>
        total + Number(product.price || 0) * Number(product.stock || 0),
      0
    );

  const totalAvailable =
    products.filter(
      (product) =>
        product.status === "available"
    ).length;

  const totalCategories =
    new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    ).size;

  const filteredProducts = useMemo(() => {

    const filtered = products.filter((product) => {

      const searchMatch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const categoryMatch =
        categoryFilter === "Todas" ||
        product.category === categoryFilter;

      const statusMatch =
        statusFilter === "Todos" ||
        (statusFilter === "Disponible"
          ? product.status === "available"
          : product.status === "out_of_stock");

      return (
        searchMatch &&
        categoryMatch &&
        statusMatch
      );

    });

    filtered.sort((a, b) => {

      switch (sortBy) {

        case "oldest":
          return a.id - b.id;

        case "priceAsc":
          return Number(a.price || 0) - Number(b.price || 0);

        case "priceDesc":
          return Number(b.price || 0) - Number(a.price || 0);

        case "stockAsc":
          return Number(a.stock || 0) - Number(b.stock || 0);

        case "stockDesc":
          return Number(b.stock || 0) - Number(a.stock || 0);

        default:
          return b.id - a.id;

      }

    });

    return filtered;

  }, [
    products,
    search,
    categoryFilter,
    statusFilter,
    sortBy,
  ]);

  return (

    <main className="min-h-screen bg-[#F8F5EF] p-10">
            <div className="flex flex-col gap-8">

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-gray-500 text-sm">
              📦 Productos y servicios
            </p>
            <h2 className="text-4xl font-bold mt-3">
              {totalProducts}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-gray-500 text-sm">
              💲 Valor Inventario
            </p>
            <h2 className="text-4xl font-bold mt-3 text-[#891C20]">
              ${totalInventoryValue}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-gray-500 text-sm">
              🟢 Disponibles
            </p>
            <h2 className="text-4xl font-bold mt-3">
              {totalAvailable}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-gray-500 text-sm">
              🏷️ Categorías
            </p>
            <h2 className="text-4xl font-bold mt-3">
              {totalCategories}
            </h2>
          </div>

        </div>

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-5xl font-bold">
              Mis productos y servicios
            </h1>

            <p className="text-gray-500 mt-2">
              Administra tus productos y servicios desde un solo lugar.
            </p>

          </div>

          <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/productos/new?tipo=producto" className="bg-[#891C20] text-white px-6 py-4 rounded-full hover:bg-[#75181c] transition font-bold">+ Nuevo producto</Link>
          <Link href="/dashboard/productos/new?tipo=servicio" className="border-2 border-[#891C20] text-[#891C20] px-6 py-4 rounded-full hover:bg-[#f4e7d9] transition font-bold">+ Nuevo servicio</Link>
          </div>

        </div>

        <div className="bg-white rounded-3xl shadow p-6 border border-gray-100">

          <div className="grid md:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="Buscar producto o servicio..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="border rounded-xl p-3"
            />

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value)
              }
              className="border rounded-xl p-3"
            >

              <option>Todas</option>

              {[...new Set(products.map(
                (p) => p.category
              ))]
                .filter(Boolean)
                .map((category) => (

                  <option
                    key={category}
                    value={category || ""}
                  >
                    {category}
                  </option>

                ))}

            </select>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="border rounded-xl p-3"
            >

              <option>Todos</option>
              <option>Disponible</option>
              <option>Agotado</option>

            </select>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="border rounded-xl p-3"
            >

              <option value="newest">
                Más recientes
              </option>

              <option value="oldest">
                Más antiguos
              </option>

              <option value="priceAsc">
                Precio menor
              </option>

              <option value="priceDesc">
                Precio mayor
              </option>

              <option value="stockAsc">
                Menor stock
              </option>

              <option value="stockDesc">
                Mayor stock
              </option>

            </select>

          </div>

        </div>
                {filteredProducts.length === 0 ? (

          <div className="bg-white rounded-3xl p-20 text-center shadow">

            <h2 className="text-2xl font-bold">
              No hay productos
            </h2>

            <p className="text-gray-500 mt-3">
              No se encontraron productos con esos filtros.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">

            {filteredProducts.map((product) => (

              <div
                key={product.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >

                <div className="h-72 bg-gray-100 overflow-hidden">

                  {product.image ? (

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />

                  ) : (

                    <div className="w-full h-full flex items-center justify-center text-gray-400">

                      Sin imagen

                    </div>

                  )}

                </div>

                <div className="p-6 flex flex-col h-80">

                  <div className="flex justify-between items-center mb-3">

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        product.status === "available"
                          ? "bg-green-100 text-green-700"
                          : product.status === "out_of_stock"
                          ? "bg-[#f2dfe0] text-[#891C20]"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >

                      {product.status === "available"
                        ? "Disponible"
                        : product.status === "out_of_stock"
                        ? "Agotado"
                        : "Oculto"}

                    </span>

                  </div>

                  <h2 className="text-2xl font-bold line-clamp-1">
                    {product.name}
                  </h2>

                  <p className="text-gray-500 mt-3 text-sm leading-6 line-clamp-3">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-6">

                    <span className="font-semibold text-[#891C20]">
                      💲 ${product.price}
                    </span>

                    <span className="text-gray-600">
                      📦 Stock: {product.stock}
                    </span>

                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                      🏷️ {product.category || "Sin categoría"}
                    </span>

                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-3">
                                        <Link
                      href={`/dashboard/productos/edit/${product.id}`}
                      className="text-center bg-[#891C20] text-white py-3 rounded-xl hover:bg-[#75181c] transition"
                    >
                      Editar
                    </Link>

                    <button
                      onClick={() => handleDelete(product.id)}
                      className="border border-[#891C20] text-[#891C20] rounded-xl hover:bg-[#891C20] hover:text-white transition"
                    >
                      Eliminar
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>

  );

}
