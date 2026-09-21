import { useState } from "react"
import { Link } from "react-router"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const complaintSchema = z.object({
  type: z.string().min(1, "Selecciona un tipo de situación."),

  description: z
    .string()
    .trim()
    .min(20, "Describe lo ocurrido utilizando al menos 20 caracteres.")
    .max(1000, "La descripción no puede superar los 1000 caracteres."),

  date: z.string().optional(),
})

export default function NewComplaint() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      type: "",
      description: "",
      date: "",
    },
  })

  function onSubmit(data) {
    // Datos simulados para el prototipo frontend.
    console.log("Datos ficticios validados:", data)

    setSubmitted(true)
    reset()

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-5">
          <p className="text-sm font-semibold text-emerald-700">
            Casa de la Mujer
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Realizar una denuncia
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-3xl p-4 sm:p-6">
        <Link
          to="/mi"
          className="
            inline-block font-medium text-emerald-700 underline
            focus:outline-none focus:ring-2
            focus:ring-emerald-600 focus:ring-offset-2
          "
        >
          ← Volver a mi espacio
        </Link>

        {submitted && (
          <div
            role="status"
            className="
              mt-5 rounded-xl border border-emerald-200
              bg-emerald-50 p-4 text-emerald-900
            "
          >
            <p className="font-bold">
              Denuncia registrada correctamente
            </p>

            <p className="mt-1 text-sm">
              En este prototipo académico se simuló correctamente
              el registro de la denuncia.
            </p>
          </div>
        )}

        <section
          className="
            mt-5 rounded-2xl border border-slate-200
            bg-white p-5 shadow-sm sm:p-8
          "
          aria-labelledby="complaint-title"
        >
          <header className="mb-7">
            <h2
              id="complaint-title"
              className="text-2xl font-bold text-slate-900"
            >
              Cuéntanos lo ocurrido
            </h2>

            <p className="mt-2 text-slate-600">
              Completa únicamente la información que corresponda
              a tu situación.
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Los campos obligatorios están identificados con *.
            </p>
          </header>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="type"
                className="mb-2 block font-medium text-slate-900"
              >
                Tipo de situación *
              </label>

              <select
                id="type"
                {...register("type")}
                aria-invalid={errors.type ? "true" : "false"}
                aria-describedby={
                  errors.type ? "type-error" : undefined
                }
                className={`
                  w-full rounded-lg border bg-white px-4 py-3
                  focus:outline-none focus:ring-2
                  focus:ring-emerald-600
                  ${
                    errors.type
                      ? "border-red-600"
                      : "border-slate-300"
                  }
                `}
              >
                <option value="">
                  Selecciona una opción
                </option>

                <option value="fisica">
                  Violencia física
                </option>

                <option value="psicologica">
                  Violencia psicológica
                </option>

                <option value="sexual">
                  Violencia sexual
                </option>

                <option value="economica">
                  Violencia económica
                </option>

                <option value="laboral">
                  Discriminación o situación laboral
                </option>

                <option value="otra">
                  Otra situación
                </option>
              </select>

              {errors.type && (
                <p
                  id="type-error"
                  role="alert"
                  className="mt-2 text-sm font-medium text-red-700"
                >
                  {errors.type.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block font-medium text-slate-900"
              >
                Describe lo ocurrido *
              </label>

              <textarea
                id="description"
                rows="6"
                {...register("description")}
                aria-invalid={
                  errors.description ? "true" : "false"
                }
                aria-describedby={
                  errors.description
                    ? "description-help description-error"
                    : "description-help"
                }
                placeholder="Describe la situación con tus propias palabras."
                className={`
                  w-full resize-y rounded-lg border px-4 py-3
                  focus:outline-none focus:ring-2
                  focus:ring-emerald-600
                  ${
                    errors.description
                      ? "border-red-600"
                      : "border-slate-300"
                  }
                `}
              />

              <p
                id="description-help"
                className="mt-2 text-sm text-slate-500"
              >
                Escribe entre 20 y 1000 caracteres. No incluyas
                información que no consideres necesaria.
              </p>

              {errors.description && (
                <p
                  id="description-error"
                  role="alert"
                  className="mt-2 text-sm font-medium text-red-700"
                >
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="date"
                className="mb-2 block font-medium text-slate-900"
              >
                Fecha aproximada del hecho
              </label>

              <input
                id="date"
                type="date"
                {...register("date")}
                className="
                  w-full rounded-lg border border-slate-300
                  px-4 py-3
                  focus:outline-none focus:ring-2
                  focus:ring-emerald-600
                "
              />

              <p className="mt-2 text-sm text-slate-500">
                Este campo es opcional.
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 p-4">
              <p className="text-sm text-amber-900">
                <strong>Importante:</strong> para esta versión
                académica utiliza únicamente información ficticia
                durante las pruebas.
              </p>
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
                ? "Enviando..."
                : "Enviar denuncia"}
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}