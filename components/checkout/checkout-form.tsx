'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { SolarIcon } from '@/components/ui/solar-icon'
import { checkoutSchema, type CheckoutFormValues } from '@/lib/validation/checkout'
import { createOrder, type OrderResult } from '@/lib/payments'
import { useCartStore, selectCount, selectSubtotal } from '@/stores/cart-store'
import { useHydrated } from '@/hooks/use-hydrated'
import { formatPrice } from '@/lib/format'
import { site, whatsappLink } from '@/data/site'
import { Input, Textarea } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function CheckoutForm() {
  const items = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clear)
  const hydrated = useHydrated()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null)
  const [submittedData, setSubmittedData] = useState<CheckoutFormValues | null>(null)

  const subtotal = hydrated ? selectSubtotal(items) : 0
  const count = hydrated ? selectCount(items) : 0

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      document: '',
      email: '',
      phone: '',
      department: '',
      cityName: '',
      address: '',
      complement: '',
      neighborhood: '',
      postalCode: '',
      notes: '',
    },
  })

  async function onSubmit(data: CheckoutFormValues) {
    if (items.length === 0) {
      toast.error('Tu carrito está vacío.')
      return
    }

    try {
      setIsSubmitting(true)
      const res = await createOrder({
        customer: data,
        items,
        subtotal,
        discount: 0,
        shipping: null,
        total: subtotal,
      })

      setOrderResult(res)
      setSubmittedData(data)
      clearCart()
      toast.success('¡Pedido registrado con éxito!')
    } catch (err) {
      toast.error('Ocurrió un error al procesar el pedido. Por favor intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function buildWhatsAppConfirmation() {
    if (!orderResult || !submittedData) return ''
    let msg = `*¡Hola ${site.name}! Acabo de registrar el pedido #${orderResult.orderNumber} en la web.*\n\n`
    msg += `*Datos del Cliente:*\n`
    msg += `- Nombre: ${submittedData.firstName} ${submittedData.lastName}\n`
    msg += `- Teléfono: ${submittedData.phone}\n`
    msg += `- Ciudad: ${submittedData.cityName}, ${submittedData.department}\n`
    msg += `- Dirección: ${submittedData.address} (${submittedData.neighborhood})\n\n`
    msg += `*Subtotal:* ${formatPrice(subtotal)}\n`
    msg += `Quedo atento(a) para coordinar el pago y envío. ¡Muchas gracias!`
    return msg
  }

  // Order placed view
  if (orderResult && submittedData) {
    return (
      <div className="rounded-lg border border-border bg-card p-6 sm:p-10 text-center space-y-5 max-w-xl mx-auto shadow-xs">
        <div className="flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mx-auto border border-emerald-100">
          <SolarIcon icon="solar:check-circle-linear" className="size-8" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold font-heading text-foreground">
            ¡Tu Pedido ha sido Registrado!
          </h2>
          <p className="text-xs font-bold text-primary">
            Número de Orden: {orderResult.orderNumber}
          </p>
          <p className="text-xs text-muted-foreground max-w-md mx-auto pt-1">
            {orderResult.message}
          </p>
        </div>

        <div className="rounded border border-border bg-slate-50 p-3.5 text-xs text-muted-foreground text-left space-y-1">
          <p><span className="font-semibold text-foreground">Cliente:</span> {submittedData.firstName} {submittedData.lastName}</p>
          <p><span className="font-semibold text-foreground">Dirección:</span> {submittedData.address}, {submittedData.cityName}</p>
          <p><span className="font-semibold text-foreground">Teléfono:</span> {submittedData.phone}</p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <a
            href={whatsappLink(buildWhatsAppConfirmation())}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-emerald-500"
          >
            <SolarIcon icon="solar:chat-round-dots-linear" className="size-4" />
            <span>Confirmar por WhatsApp</span>
          </a>
          <Link
            href="/productos"
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg border border-border px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-slate-50 transition-colors"
          >
            Seguir Comprando
          </Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-10 text-center space-y-3 max-w-md mx-auto shadow-xs">
        <div className="flex size-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 mx-auto">
          <SolarIcon icon="solar:cart-large-minimalistic-linear" className="size-7" />
        </div>
        <h2 className="text-base font-bold text-foreground">Tu carrito está vacío</h2>
        <p className="text-xs text-muted-foreground">
          Agrega productos a tu carrito antes de proceder a la pantalla de checkout.
        </p>
        <div className="pt-2">
          <Link
            href="/productos"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-brand-dark"
          >
            <span>Explorar Catálogo</span>
            <SolarIcon icon="solar:arrow-right-linear" className="size-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Customer & Delivery Form */}
      <div className="lg:col-span-7 space-y-6">
        <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-4 shadow-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground border-b border-border pb-2.5">
            1. Información del Cliente
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Nombres *</label>
              <Input {...register('firstName')} placeholder="Ej: Carlos" />
              {errors.firstName && (
                <p className="text-xs text-destructive">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Apellidos *</label>
              <Input {...register('lastName')} placeholder="Ej: Pérez" />
              {errors.lastName && (
                <p className="text-xs text-destructive">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Teléfono / WhatsApp *</label>
              <Input {...register('phone')} type="tel" placeholder="Ej: 300 123 4567" />
              {errors.phone && (
                <p className="text-xs text-destructive">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Correo Electrónico *</label>
              <Input {...register('email')} type="email" placeholder="correo@ejemplo.com" />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">Cédula o NIT (Opcional)</label>
            <Input {...register('document')} placeholder="Número de documento para facturación" />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-4 shadow-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground border-b border-border pb-2.5">
            2. Dirección de Entrega
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Departamento *</label>
              <Input {...register('department')} placeholder="Ej: Antioquia" />
              {errors.department && (
                <p className="text-xs text-destructive">{errors.department.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Ciudad / Municipio *</label>
              <Input {...register('cityName')} placeholder="Ej: Medellín" />
              {errors.cityName && (
                <p className="text-xs text-destructive">{errors.cityName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">Dirección completa *</label>
            <Input {...register('address')} placeholder="Calle, Carrera, Número" />
            {errors.address && (
              <p className="text-xs text-destructive">{errors.address.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Barrio *</label>
              <Input {...register('neighborhood')} placeholder="Barrio o sector" />
              {errors.neighborhood && (
                <p className="text-xs text-destructive">{errors.neighborhood.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Complemento (Opcional)</label>
              <Input {...register('complement')} placeholder="Apto, Bloque..." />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">Notas para el pedido (Opcional)</label>
            <Textarea {...register('notes')} placeholder="Instrucciones especiales de despacho..." rows={2} />
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-5 space-y-6">
        <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-4 shadow-xs sticky top-24">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground border-b border-border pb-2.5">
            Resumen ({count} productos)
          </h2>

          <div className="space-y-2.5 max-h-64 overflow-y-auto divide-y divide-border/50 pr-1">
            {items.map((item) => (
              <div key={`${item.productId}-${item.variant || 'default'}`} className="pt-2.5 first:pt-0 flex items-center gap-2.5">
                <div className="relative size-10 shrink-0 overflow-hidden rounded border border-border bg-slate-50">
                  <Image
                    src={item.image || '/placeholder.svg'}
                    alt={item.name}
                    fill
                    sizes="40px"
                    className="object-contain p-1"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">{item.name}</p>
                  <p className="text-[11px] text-muted-foreground">{item.quantity} x {formatPrice(item.price)}</p>
                </div>
                <span className="text-xs font-bold text-foreground">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-3 space-y-2 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="font-semibold text-foreground">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Envío</span>
              <span className="text-primary font-medium">Por coordinar</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-foreground border-t border-border pt-2">
              <span>Total Estimado</span>
              <span className="text-primary">{formatPrice(subtotal)}</span>
            </div>
          </div>

          <div className="rounded border border-border bg-slate-50 p-2.5 text-[11px] text-muted-foreground flex items-start gap-2">
            <SolarIcon icon="solar:delivery-linear" className="size-4 text-primary shrink-0 mt-0.5" />
            <span>El flete se coordina al confirmar el pedido vía transportadora.</span>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 text-xs font-bold uppercase tracking-wider"
          >
            {isSubmitting ? 'Procesando pedido...' : 'Registrar y Continuar Pedido'}
          </Button>
        </div>
      </div>
    </form>
  )
}
