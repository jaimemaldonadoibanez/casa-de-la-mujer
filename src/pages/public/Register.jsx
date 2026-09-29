import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUp } from '../../services/auth'

const schema = z.object({
  email: z.string().trim().email('Ingresa un correo válido.'),
  password: z.string().min(8, 'Mínimo 8 caracteres.'),
  confirmPassword: z.string().min(1, 'Confirma la contraseña.'),
}).refine(v => v.password === v.confirmPassword, { message: 'Las contraseñas no coinciden.', path: ['confirmPassword'] })

export default function Register() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [serverError, setServerError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  async function onSubmit(values) {
    setServerError('')
    try {
      const data = await signUp(values.email, values.password)
      if (data.session) {
        navigate('/mi')
      } else {
        setMessage('Cuenta creada. Revisa tu correo para confirmar la cuenta y luego inicia sesión.')
      }
    } catch (error) { setServerError(error?.message || 'No se pudo crear la cuenta.') }
  }

  return <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4"><section className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
    <p className="text-sm font-semibold text-emerald-700">Registro seguro</p><h1 className="mt-2 text-3xl font-bold">Crear una cuenta</h1><p className="mt-2 text-slate-600">Usa datos ficticios durante la demostración académica.</p>
    {message && <div role="status" className="mt-5 rounded-lg bg-emerald-50 p-4 text-emerald-900">{message}</div>}{serverError && <div role="alert" className="mt-5 rounded-lg bg-red-50 p-4 text-red-800">{serverError}</div>}
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
      <div><label className="mb-2 block font-medium">Correo *</label><input type="email" {...register('email')} className="w-full rounded-lg border px-4 py-3" />{errors.email && <p className="mt-1 text-sm text-red-700">{errors.email.message}</p>}</div>
      <div><label className="mb-2 block font-medium">Contraseña *</label><input type="password" {...register('password')} className="w-full rounded-lg border px-4 py-3" />{errors.password && <p className="mt-1 text-sm text-red-700">{errors.password.message}</p>}</div>
      <div><label className="mb-2 block font-medium">Confirmar contraseña *</label><input type="password" {...register('confirmPassword')} className="w-full rounded-lg border px-4 py-3" />{errors.confirmPassword && <p className="mt-1 text-sm text-red-700">{errors.confirmPassword.message}</p>}</div>
      <button disabled={isSubmitting} className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white disabled:opacity-50">{isSubmitting ? 'Creando...' : 'Crear cuenta'}</button>
    </form><p className="mt-6 text-center text-sm"><Link to="/login" className="font-semibold text-emerald-700 underline">Volver al inicio de sesión</Link></p>
  </section></main>
}
