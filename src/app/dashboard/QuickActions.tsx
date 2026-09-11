export default function QuickActions() {
  const actions = [
    { icon: "📦", title: "Nuevo producto" },
    { icon: "🔥", title: "Nueva promoción" },
    { icon: "📅", title: "Nuevo evento" },
    { icon: "⚙️", title: "Editar perfil" },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6 mt-10">
      {actions.map((item) => (
        <button
          key={item.title}
          className="bg-white rounded-3xl shadow p-8 text-left hover:shadow-xl hover:-translate-y-1 transition"
        >
          <div className="text-4xl mb-4">{item.icon}</div>

          <h3 className="font-bold text-xl">
            {item.title}
          </h3>
        </button>
      ))}
    </div>
  );
}