export default function Registro() {
  return (
    <main className="min-h-screen bg-[#F8F5EF] py-20">

      <div className="max-w-3xl mx-auto bg-white rounded-[35px] shadow-xl p-10">

        <div className="flex justify-between items-center mb-10">

          <div className="text-center flex-1">
            <div className="w-10 h-10 rounded-full bg-red-700 text-white flex items-center justify-center mx-auto">
              1
            </div>
            <p className="mt-2 text-sm font-medium">
              Información
            </p>
          </div>

          <div className="flex-1 h-1 bg-gray-200"></div>

          <div className="text-center flex-1">
            <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center mx-auto">
              2
            </div>
            <p className="mt-2 text-sm">
              Contacto
            </p>
          </div>

          <div className="flex-1 h-1 bg-gray-200"></div>

          <div className="text-center flex-1">
            <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center mx-auto">
              3
            </div>
            <p className="mt-2 text-sm">
              Finalizar
            </p>
          </div>

        </div>

        <h1 className="text-4xl font-bold">
          Información del emprendimiento
        </h1>

        <p className="text-gray-600 mt-3 mb-10">
          Completa los datos principales.
        </p>

        <div className="space-y-6">

          <input
            placeholder="Nombre del emprendimiento"
            className="w-full border rounded-xl p-4"
          />

          <input
            placeholder="Propietario"
            className="w-full border rounded-xl p-4"
          />

          <textarea
            placeholder="Descripción"
            rows={5}
            className="w-full border rounded-xl p-4"
          />

          <button className="bg-red-700 text-white rounded-full px-10 py-4">
            Continuar →
          </button>

        </div>

      </div>

    </main>
  );
}