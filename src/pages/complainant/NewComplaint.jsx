import { useState } from 'react'
import { Link } from 'react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createComplaint } from '../../services/complaints'

const schema = z.object({ type: z.string().min(1, 'Selecciona un tipo.'), description: z.string().trim().min(20, 'Usa al menos 20 caracteres.').max(1000, 'Máximo 1000 caracteres.'), date: z.string().optional() })
export default function NewComplaint() {
 const [message,setMessage]=useState(''); const [serverError,setServerError]=useState('')
 const {register,handleSubmit,reset,formState:{errors,isSubmitting}}=useForm({resolver:zodResolver(schema),defaultValues:{type:'',description:'',date:''}})
 async function onSubmit(values){setMessage('');setServerError('');try{const row=await createComplaint(values);setMessage(`Denuncia registrada correctamente. Código: ${row.id}`);reset();window.scrollTo({top:0,behavior:'smooth'})}catch(e){setServerError(e?.message||'No se pudo registrar la denuncia.')}}
 return <main className="min-h-screen bg-slate-50"><header className="border-b bg-white"><div className="mx-auto max-w-3xl px-4 py-5"><p className="text-sm font-semibold text-emerald-700">Casa de la Mujer</p><h1 className="mt-1 text-2xl font-bold">Realizar una denuncia</h1></div></header><div className="mx-auto max-w-3xl p-4 sm:p-6"><Link to="/mi" className="font-medium text-emerald-700 underline">← Volver</Link>
 {message&&<div role="status" className="mt-5 rounded-xl bg-emerald-50 p-4 text-emerald-900">{message}</div>}{serverError&&<div role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-red-800">{serverError}</div>}
 <section className="mt-5 rounded-2xl border bg-white p-5 shadow-sm sm:p-8"><h2 className="text-2xl font-bold">Cuéntanos lo ocurrido</h2><p className="mt-2 text-slate-600">Para la demostración utiliza únicamente información ficticia.</p><form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
 <div><label className="mb-2 block font-medium">Tipo de situación *</label><select {...register('type')} className="w-full rounded-lg border bg-white px-4 py-3"><option value="">Selecciona</option><option value="fisica">Violencia física</option><option value="psicologica">Violencia psicológica</option><option value="sexual">Violencia sexual</option><option value="economica">Violencia económica</option><option value="laboral">Discriminación o situación laboral</option><option value="otra">Otra situación</option></select>{errors.type&&<p className="mt-1 text-sm text-red-700">{errors.type.message}</p>}</div>
 <div><label className="mb-2 block font-medium">Descripción *</label><textarea rows="6" {...register('description')} className="w-full rounded-lg border px-4 py-3" />{errors.description&&<p className="mt-1 text-sm text-red-700">{errors.description.message}</p>}</div>
 <div><label className="mb-2 block font-medium">Fecha aproximada</label><input type="date" {...register('date')} className="w-full rounded-lg border px-4 py-3" /></div>
 <button disabled={isSubmitting} className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white disabled:opacity-50">{isSubmitting?'Enviando...':'Enviar denuncia'}</button></form></section></div></main>
}
