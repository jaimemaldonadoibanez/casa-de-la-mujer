import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const registerSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, "El correo electrónico es obligatorio.")
      .email("Ingresa un correo electrónico válido."),

    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres."),

    confirmPassword: z
      .string()
      .min(1, "Debes confirmar tu contraseña."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  })

export default function Register() {
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit() {
    // En esta actividad se simula el registro.
    // La persistencia real se implementará con el backend.
    setSuccess(true)

    setTimeout(() => {
      navigate("/login")
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <section
        className="
          w-full max-w-md rounded-2xl
          border border-slate-200
          bg-white p-6 shadow-sm sm:p-8
        "
        aria-labelledby="register-title"
      >
        <header className="mb-7">
          <p className="text-sm font-semibold text-emerald-700">
            Registro seguro
          </p>

          <h1
            id="register-title"
            className="mt-2 text-3xl font-bold text-slate-900"
          >
            Crear una cuenta
          </h1>

          <p className="mt-2 text-slate-600">
            Crea tu cuenta para registrar y consultar tus casos.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Los campos obligatorios están identificados con *.
          </p>
        </header>

        {success && (
          <div
            role="status"
            aria-live="polite"
            className="
              mb-5 rounded-lg border border-emerald-200
              bg-emerald-50 p-4 text-emerald-900
            "
          >
            <p className="font-semibold">
              Cuenta creada correctamente.
            </p>

            <p className="mt-1 text-sm">
              Serás dirigida al inicio de sesión.
            </p>
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
                errors.email ? "email-error" : undefined
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
                id="email-error"
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
              autoComplete="new-password"
              {...register("password")}
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={
                errors.password
                  ? "password-help password-error"
                  : "password-help"
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

            <p
              id="password-help"
              className="mt-2 text-sm text-slate-500"
            >
              Utiliza al menos 8 caracteres.
            </p>

            {errors.password && (
              <p
                id="password-error"
                role="alert"
                className="mt-2 text-sm font-medium text-red-700"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block font-medium text-slate-800"
            >
              Confirmar contraseña *
            </label>

            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              {...register("confirmPassword")}
              aria-invalid={
                errors.confirmPassword ? "true" : "false"
              }
              aria-describedby={
                errors.confirmPassword
                  ? "confirm-password-error"
                  : undefined
              }
              className={`
                w-full rounded-lg border px-4 py-3
                focus:outline-none focus:ring-2
                focus:ring-emerald-600
                ${
                  errors.confirmPassword
                    ? "border-red-600"
                    : "border-slate-300"
                }
              `}
            />

            {errors.confirmPassword && (
              <p
                id="confirm-password-error"
                role="alert"
                className="mt-2 text-sm font-medium text-red-700"
              >
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || success}
            className="
              w-full rounded-lg bg-emerald-700
              px-4 py-3 font-semibold text-white
              hover:bg-emerald-800
              focus:outline-none
              focus:ring-2
              focus:ring-emerald-600
              focus:ring-offset-2
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {success ? "Cuenta creada" : "Crear cuenta"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          ¿Ya tienes una cuenta?{" "}

          <Link
            to="/login"
            className="
              font-semibold text-emerald-700 underline
              focus:outline-none focus:ring-2
              focus:ring-emerald-600 focus:ring-offset-2
            "
          >
            Iniciar sesión
          </Link>
        </p>
      </section>
    </main>
  )
}