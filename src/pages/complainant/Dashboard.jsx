import { Link } from "react-router"

export default function ComplainantDashboard() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-5">
          <p className="text-sm font-semibold text-emerald-700">
            Casa de la Mujer
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Mi espacio
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-5xl p-4 sm:p-6">
        <section className="rounded-2xl bg-emerald-800 p-6 text-white">
          <h2 className="text-2xl font-bold">
            Estamos para orientarte
          </h2>

          <p className="mt-2 max-w-xl text-emerald-50">
            Puedes registrar un caso y consultar su estado desde este espacio.
          </p>

          <Link
            to="/mi/nueva-denuncia"
            className="
              mt-6 inline-block
              rounded-lg bg-white
              px-5 py-3
              font-semibold text-emerald-800
              focus:outline-none
              focus:ring-2
              focus:ring-white
              focus:ring-offset-2
              focus:ring-offset-emerald-800
            "
          >
            Realizar una denuncia
          </Link>
        </section>

        <section
          className="mt-8"
          aria-labelledby="cases-title"
        >
          <h2
            id="cases-title"
            className="text-xl font-bold text-slate-900"
          >
            Mis casos
          </h2>

          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6">
            <p className="font-medium text-slate-900">
              Tienes 2 casos de demostración.
            </p>

            <p className="mt-1 text-sm text-slate-600">
              Consulta el estado y las últimas actualizaciones de tus casos.
            </p>

            <Link
              to="/mi/casos"
              className="
                mt-4 inline-block
                font-semibold text-emerald-700
                underline
                focus:outline-none
                focus:ring-2
                focus:ring-emerald-600
                focus:ring-offset-2
              "
            >
              Ver mis casos
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}