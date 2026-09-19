'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { SolarIcon } from '@/components/ui/solar-icon'
import { whatsappLink } from '@/data/site'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !phone || !message) {
      toast.error('Por favor completa los campos obligatorios.')
      return
    }

    const waText = `*Nuevo mensaje desde la web*\n\n- *Nombre:* ${name}\n- *Email:* ${email || 'No especificado'}\n- *Teléfono:* ${phone}\n- *Asunto:* ${subject || 'Consulta general'}\n- *Mensaje:* ${message}`
    
    setSubmitted(true)
    toast.success('¡Mensaje recibido con éxito!', {
      description: 'Te responderemos a la brevedad.',
    })

    window.open(whatsappLink(waText), '_blank')
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center space-y-4 shadow-xs">
        <div className="flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mx-auto border border-emerald-100">
          <SolarIcon icon="solar:check-circle-linear" className="size-8" />
        </div>
        <h3 className="text-base font-bold text-slate-900">¡Gracias por escribirnos!</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Hemos recibido tu solicitud. Nuestro equipo comercial te contactará en breve.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false)
            setMessage('')
          }}
          className="mt-2 inline-flex items-center rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors"
        >
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Row 1: Nombre + Correo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-800">
            Nombre completo <span className="text-red">*</span>
          </label>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingresa tu nombre"
            className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs text-slate-900 placeholder:text-slate-400 shadow-xs outline-none transition-colors focus:border-primary"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-800">
            Correo electrónico <span className="text-red">*</span>
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo electrónico"
            className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs text-slate-900 placeholder:text-slate-400 shadow-xs outline-none transition-colors focus:border-primary"
          />
        </div>
      </div>

      {/* Row 2: Teléfono + Asunto */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-800">
            Teléfono <span className="text-red">*</span>
          </label>
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ingresa tu número de teléfono"
            className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs text-slate-900 placeholder:text-slate-400 shadow-xs outline-none transition-colors focus:border-primary"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-800">
            Asunto <span className="text-red">*</span>
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="flex h-11 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-3.5 text-xs text-slate-700 shadow-xs outline-none transition-colors focus:border-primary"
          >
            <option value="">Selecciona un asunto</option>
            <option value="Cotización mayorista">Cotización mayorista</option>
            <option value="Consulta sobre productos">Consulta sobre productos</option>
            <option value="Estado de mi pedido">Estado de mi pedido</option>
            <option value="Sugerencia o reclamo">Sugerencia o reclamo</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
      </div>

      {/* Row 3: Mensaje */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-800">
          Mensaje <span className="text-red">*</span>
        </label>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe tu mensaje aquí..."
          className="flex w-full rounded-xl border border-slate-200 bg-white p-3.5 text-xs text-slate-900 placeholder:text-slate-400 shadow-xs outline-none transition-colors focus:border-primary resize-none"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-red px-6 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-colors hover:bg-red/90 active:scale-95"
        >
          <SolarIcon icon="solar:letter-linear" className="size-4" />
          <span>Enviar mensaje</span>
        </button>
      </div>

      {/* Privacy note */}
      <div className="flex items-center gap-1.5 pt-1 text-[11px] text-slate-400">
        <SolarIcon icon="solar:lock-linear" className="size-3.5 text-slate-400" />
        <span>Tu información está segura. No compartimos tus datos.</span>
      </div>
    </form>
  )
}
