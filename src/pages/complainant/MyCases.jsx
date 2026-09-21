import { Link } from "react-router"

const cases = [
  {
    id: "CM-2026-001",
    type: "Violencia psicológica",
    status: "En seguimiento",
    date: "15/09/2026",
    update: "18/09/2026",
  },
  {
    id: "CM-2026-002",
    type: "Violencia económica",
    status: "Recibida",
    date: "18/09/2026",
    update: "18/09/2026",
  },
]

export default function MyCases() {
  return (
    <main className="min-h-screen bg-slate-50">

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-5">

          <p className="text-sm font-semibold text-emerald-700">
            Casa de la Mujer
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Mis casos
          </h1>

        </div>
      </header>

      <div className="mx-auto max-w-5xl p-4 sm:p-6">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <Link
            to="/mi"
            className="font-medium text-emerald-700 underline"
          >
            ← Volver a mi espacio
          </Link>

          <Link
            to="/mi/nueva-denuncia"
            className="
              rounded-lg bg-emerald-700
              px-4 py-3 text-center
              font-semibold text-white
              hover:bg-emerald-800
              focus:outline-none
              focus:ring-2
              focus:ring-emerald-600
              focus:ring-offset-2
            "
          >
            Nueva denuncia
          </Link>

        </div>

        <section
          className="mt-6"
          aria-labelledby="cases-title"
        >

          <div className="mb-5">

            <h2
              id="cases-title"
              className="text-xl font-bold text-slate-900"
            >
              Tus denuncias
            </h2>

            <p className="mt-1 text-slate-600">
              Consulta el estado actual de tus casos.
            </p>

          </div>

          <div className="space-y-4">

            {cases.map((caseItem) => (
              <article
                key={caseItem.id}
                className="
                  rounded-xl border border-slate-200
                  bg-white p-5 shadow-sm
                "
              >

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                  <div>

                    <p className="text-sm text-slate-500">
                      Código del caso
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-slate-900">
                      {caseItem.id}
                    </h3>

                    <p className="mt-3 text-slate-700">
                      {caseItem.type}
                    </p>

                  </div>

                  <span
                    className="
                      w-fit rounded-full
                      bg-amber-100
                      px-3 py-1
                      text-sm font-semibold
                      text-amber-900
                    "
                  >
                    {caseItem.status}
                  </span>

                </div>

                <div className="mt-5 border-t border-slate-100 pt-4">

                  <p className="text-sm text-slate-600">
                    Registrado: {caseItem.date}
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    Última actualización: {caseItem.update}
                  </p>

                  <Link
                    to={`/mi/casos/${caseItem.id}`}
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
                    Ver estado del caso
                  </Link>

                </div>

              </article>
            ))}

          </div>

        </section>

        <aside className="mt-6 rounded-xl bg-slate-100 p-4">

          <p className="text-sm text-slate-600">
            Los casos mostrados en esta versión son datos ficticios
            utilizados únicamente para demostrar el funcionamiento
            del prototipo académico.
          </p>

        </aside>

      </div>

    </main>
  )
}