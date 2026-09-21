import { Link } from "react-router"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">

      <section className="text-center">

        <p className="text-7xl font-bold text-emerald-700">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          Página no encontrada
        </h1>

        <p className="mt-2 text-slate-600">
          La dirección que ingresaste no existe.
        </p>

        <Link
          to="/dashboard"
          className="
            mt-6 inline-block
            rounded-lg bg-emerald-700
            px-5 py-3
            font-semibold text-white
            hover:bg-emerald-800
            focus:outline-none
            focus:ring-2
            focus:ring-emerald-600
            focus:ring-offset-2
          "
        >
          Volver al panel
        </Link>

      </section>

    </main>
  )
}