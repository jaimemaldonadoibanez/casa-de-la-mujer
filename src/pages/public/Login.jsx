import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "El correo electrónico es obligatorio.")
    .email("Ingresa un correo electrónico válido."),

  password: z
    .string()
    .min(1, "La contraseña es obligatoria.")
    .min(8, "La contraseña debe tener al menos 8 caracteres."),
})

export default function Login() {
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit() {
    setLoginError("")

    // Autenticación simulada para esta etapa frontend.
    navigate("/mi")
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <section
        className="
          w-full max-w-md rounded-2xl
          border border-slate-200
          bg-white p-6 shadow-sm sm:p-8
        "
        aria-labelledby="login-title"
      >
        <header className="mb-7">
          <p className="text-sm font-semibold text-emerald-700">
            Privacidad reforzada
          </p>

          <h1
            id="login-title"
            className="mt-2 text-3xl font-bold text-slate-900"
          >
            Casa de la Mujer
          </h1>

          <p className="mt-2 text-slate-600">
            Ingresa con tu cuenta para consultar y dar seguimiento
            a tus casos.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Los campos obligatorios están identificados con *.
          </p>
        </header>

        {loginError && (
          <div
            role="alert"
            className="
              mb-5 rounded-lg border border-red-200
              bg-red-50 p-4 text-red-800
            "
          >
            {loginError}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-medium text-slate-800"
            >
              Correo electrónico *
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={
                errors.email ? "login-email-error" : undefined
              }
              className={`
                w-full rounded-lg border px-4 py-3
                focus:outline-none focus:ring-2
                focus:ring-emerald-600
                ${
                  errors.email
                    ? "border-red-600"
                    : "border-slate-300"
                }
              `}
            />

            {errors.email && (
              <p
                id="login-email-error"
                role="alert"
                className="mt-2 text-sm font-medium text-red-700"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-medium text-slate-800"
            >
              Contraseña *
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password")}
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={
                errors.password
                  ? "login-password-error"
                  : undefined
              }
              className={`
                w-full rounded-lg border px-4 py-3
                focus:outline-none focus:ring-2
                focus:ring-emerald-600
                ${
                  errors.password
                    ? "border-red-600"
                    : "border-slate-300"
                }
              `}
            />

            {errors.password && (
              <p
                id="login-password-error"
                role="alert"
                className="mt-2 text-sm font-medium text-red-700"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full rounded-lg bg-emerald-700
              px-4 py-3 font-semibold text-white
              hover:bg-emerald-800
              focus:outline-none focus:ring-2
              focus:ring-emerald-600 focus:ring-offset-2
              disabled:cursor-not-allowed disabled:opacity-50
            "
          >
            {isSubmitting
              ? "Ingresando..."
              : "Iniciar sesión"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          ¿Necesitas realizar una denuncia?{" "}

          <Link
            to="/registro"
            className="
              font-semibold text-emerald-700 underline
              focus:outline-none focus:ring-2
              focus:ring-emerald-600 focus:ring-offset-2
            "
          >
            Crear una cuenta
          </Link>
        </p>
      </section>
    </main>
  )
}