export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      <header>
        <p className="text-sm font-semibold text-emerald-700">
          Casa de la Mujer
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Panel principal
        </h1>

        <p className="mt-2 text-slate-600">
          Resumen general del sistema.
        </p>
      </header>

      <section
        className="
          mt-8 grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-3
        "
        aria-label="Resumen del sistema"
      >

        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-slate-600">
            Usuarias registradas
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            0
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-slate-600">
            Citas de hoy
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            0
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-slate-600">
            Atenciones
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            0
          </p>
        </article>

      </section>

    </main>
  )
}