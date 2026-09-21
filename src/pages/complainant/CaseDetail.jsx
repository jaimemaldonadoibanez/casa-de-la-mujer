import { Link, useParams } from "react-router"

const cases = {
  "CM-2026-001": {
    id: "CM-2026-001",
    type: "Violencia psicológica",
    status: "En seguimiento",
    registered: "15/09/2026",
    lastUpdate: "18/09/2026",
    description:
      "Caso ficticio utilizado únicamente para demostrar el funcionamiento del prototipo.",
    history: [
      {
        date: "15/09/2026",
        title: "Denuncia recibida",
        description:
          "La denuncia fue registrada correctamente en el sistema.",
      },
      {
        date: "16/09/2026",
        title: "Caso en revisión",
        description:
          "El caso comenzó su proceso de revisión.",
      },
      {
        date: "18/09/2026",
        title: "En seguimiento",
        description:
          "El caso se encuentra actualmente en proceso de seguimiento.",
      },
    ],
  },

  "CM-2026-002": {
    id: "CM-2026-002",
    type: "Violencia económica",
    status: "Recibida",
    registered: "18/09/2026",
    lastUpdate: "18/09/2026",
    description:
      "Caso ficticio utilizado únicamente para demostrar el funcionamiento del prototipo.",
    history: [
      {
        date: "18/09/2026",
        title: "Denuncia recibida",
        description:
          "La denuncia fue registrada correctamente y está pendiente de revisión.",
      },
    ],
  },
}

export default function CaseDetail() {
  const { caseId } = useParams()

  const caseItem = cases[caseId]

  if (!caseItem) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <section className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Caso no encontrado
          </h1>

          <p className="mt-2 text-slate-600">
            El caso solicitado no existe en este prototipo.
          </p>

          <Link
            to="/mi/casos"
            className="mt-6 inline-block font-semibold text-emerald-700 underline"
          >
            Volver a mis casos
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-5">
          <p className="text-sm font-semibold text-emerald-700">
            Casa de la Mujer
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Estado de mi caso
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-4xl p-4 sm:p-6">
        <Link
          to="/mi/casos"
          className="
            font-medium text-emerald-700 underline
            focus:outline-none
            focus:ring-2
            focus:ring-emerald-600
            focus:ring-offset-2
          "
        >
          ← Volver a mis casos
        </Link>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Código del caso
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                {caseItem.id}
              </h2>

              <p className="mt-2 text-slate-700">
                {caseItem.type}
              </p>
            </div>

            <span className="w-fit rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900">
              {caseItem.status}
            </span>
          </div>

          <div className="mt-6 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">
                Fecha de registro
              </p>

              <p className="mt-1 font-medium text-slate-900">
                {caseItem.registered}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Última actualización
              </p>

              <p className="mt-1 font-medium text-slate-900">
                {caseItem.lastUpdate}
              </p>
            </div>
          </div>
        </section>

        <section
          className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
          aria-labelledby="history-title"
        >
          <h2
            id="history-title"
            className="text-xl font-bold text-slate-900"
          >
            Seguimiento
          </h2>

          <p className="mt-2 text-slate-600">
            Consulta las actualizaciones realizadas sobre tu caso.
          </p>

          <ol className="mt-6 space-y-6">
            {caseItem.history.map((item, index) => (
              <li
                key={`${item.date}-${index}`}
                className="border-l-4 border-emerald-600 pl-4"
              >
                <p className="text-sm text-slate-500">
                  {item.date}
                </p>

                <h3 className="mt-1 font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-1 text-slate-600">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <aside className="mt-6 rounded-xl bg-slate-100 p-4">
          <p className="text-sm text-slate-600">
            La información mostrada corresponde a datos ficticios
            utilizados únicamente para demostrar el prototipo académico.
          </p>
        </aside>
      </div>
    </main>
  )
}