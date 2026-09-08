type Props = {
  name: string;
  category: string;
  description?: string;
  image: string;
  logo?: string;
  location: string;
  promotion?: boolean;
  isNew?: boolean;
  verified?: boolean;
  premium?: boolean;
};

export default function BusinessCard({
  name,
  category,
  description,
  image,
  location,
  verified,
  premium,
}: Props) {
  return (
    <div className="group bg-white rounded-[28px] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

      <div className="relative">

        <img
          src={image}
          alt={name}
          className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
        />

        {verified && (
          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-semibold shadow">
            ✓ Verificado
          </div>
        )}

        {premium && (
          <div className="absolute top-4 right-4 bg-[#C54B43] text-white px-3 py-1 rounded-full text-xs">
            Destacado
          </div>
        )}

      </div>

      <div className="p-6">

        <span className="text-sm text-[#C54B43] font-semibold">
          {category}
        </span>

        <h3 className="text-2xl font-bold mt-2">
          {name}
        </h3>

        <p className="text-gray-500 mt-3 line-clamp-2">
          {description}
        </p>

        <p className="text-gray-400 mt-4">
          📍 {location}
        </p>

        <button className="mt-6 w-full bg-[#C54B43] hover:bg-[#A53D36] text-white py-3 rounded-full transition">
          Ver emprendimiento
        </button>

      </div>

    </div>
  );
}
