interface Props {
  title: string;
  value: string;
  color?: string;
}

export default function StatsCard({
  title,
  value,
  color = "#891C20",
}: Props) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow hover:shadow-xl transition">
      <div
        className="w-14 h-14 rounded-2xl mb-6"
        style={{ background: color }}
      />

      <p className="text-gray-500">{title}</p>

      <h2 className="text-5xl font-bold mt-3">
        {value}
      </h2>
    </div>
  );
}