import ProductCard from "./ProductCard";

export default function ProductTable() {
  return (
    <section className="mt-14">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-3xl font-bold">
            Mis productos
          </h2>

          <p className="text-gray-500 mt-1">
            Aquí aparecerán todos tus productos.
          </p>

        </div>

        <button className="bg-[#76263d] text-white px-6 py-3 rounded-full">
        <a
  href="/dashboard/productos"
  className="bg-[#76263d] text-white px-6 py-3 rounded-full"
>
  + Nuevo producto
</a>
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-8">

        <ProductCard
          name="Sin productos"
          category="Empieza agregando uno"
          price="$0"
        />

      </div>

    </section>
  );
}