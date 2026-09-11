type Props = {
  name: string;
  category: string;
  price: string;
};

export default function ProductCard({
  name,
  category,
  price,
}: Props) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition">

      <div className="h-52 bg-gray-200 flex items-center justify-center">

        FOTO

      </div>

      <div className="p-6">

        <p className="text-sm text-[#891C20]">
          {category}
        </p>

        <h3 className="text-xl font-bold mt-2">
          {name}
        </h3>

        <p className="text-2xl font-bold mt-4">
          {price}
        </p>

        <button className="mt-5 w-full bg-[#891C20] text-white rounded-xl py-3">
          Editar producto
        </button>

      </div>

    </div>
  );
}