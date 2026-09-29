import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from '../../services/auth'

const schema = z.object({
  email: z.string().trim().min(1, 'El correo es obligatorio.').email('Ingresa un correo válido.'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres.'),
})

export default function Login() {
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  async function onSubmit(values) {
    setLoginError('')
    try {
      await signIn(values.email, values.password)
      navigate('/mi')
    } catch (error) {
      setLoginError(error?.message || 'No se pudo iniciar sesión.')
    }
  }

  return <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
    <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="login-title">
      <p className="text-sm font-semibold text-emerald-700">Privacidad reforzada</p>
      <h1 id="login-title" className="mt-2 text-3xl font-bold text-slate-900">Casa de la Mujer</h1>
      <p className="mt-2 text-slate-600">Ingresa para registrar y consultar tus casos.</p>
      {loginError && <div role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">{loginError}</div>}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-5">
        <div><label htmlFor="email" className="mb-2 block font-medium">Correo electrónico *</label><input id="email" type="email" autoComplete="email" {...register('email')} className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-emerald-600" />{errors.email && <p role="alert" className="mt-2 text-sm text-red-700">{errors.email.message}</p>}</div>
        <div><label htmlFor="password" className="mb-2 block font-medium">Contraseña *</label><input id="password" type="password" autoComplete="current-password" {...register('password')} className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-emerald-600" />{errors.password && <p role="alert" className="mt-2 text-sm text-red-700">{errors.password.message}</p>}</div>
        <button disabled={isSubmitting} className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white disabled:opacity-50">{isSubmitting ? 'Ingresando...' : 'Iniciar sesión'}</button>
      </form>
      <p className="mt-6 text-center text-sm">¿No tienes cuenta? <Link to="/registro" className="font-semibold text-emerald-700 underline">Crear una cuenta</Link></p>
    </section>
  </main>
}
