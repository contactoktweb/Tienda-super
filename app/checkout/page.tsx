import type { Metadata } from 'next'
import { site } from '@/data/site'
import { CheckoutForm } from '@/components/checkout/checkout-form'
import { SolarIcon } from '@/components/ui/solar-icon'

export const metadata: Metadata = {
  title: `Finalizar Pedido | ${site.name}`,
  description: 'Completa los datos de envío para procesar tu pedido al detal o al por mayor.',
}

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1.5 border-b border-border pb-5">
        <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-primary">
          <SolarIcon icon="solar:check-circle-linear" className="size-3.5" />
          <span>Confirmación de Pedido</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl font-heading text-foreground">
          Finalizar y Confirmar Pedido
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
          Ingresa tus datos de contacto y destino. Podrás coordinar el pago y despacho directamente por WhatsApp.
        </p>
      </div>

      <CheckoutForm />
    </div>
  )
}
