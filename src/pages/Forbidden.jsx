import { Link } from "react-router"

export default function Forbidden() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <section
        className="w-full max-w-md text-center"
        aria-labelledby="forbidden-title"
      >
        <p
          className="text-7xl font-bold text-emerald-700"
          aria-hidden="true"
        >
          403
        </p>

        <h1
          id="forbidden-title"
          className="mt-4 text-2xl font-bold text-slate-900"
        >
          Acceso denegado
        </h1>

        <p className="mt-3 text-slate-600">
          No tienes autorización para acceder a esta sección.
        </p>

        <Link
          to="/mi"
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
          Volver a mi espacio
        </Link>
      </section>
    </main>
  )
}