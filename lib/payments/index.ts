/**
 * Capa de abstracción de pagos.
 *
 * Permite integrar posteriormente una pasarela real (Wompi, Mercado Pago,
 * Stripe, etc.) sin cambiar el flujo del checkout.
 *
 * Todo pedido se registra en el ERP Super Más (módulo Pedidos Web) a través de
 * /api/orders; el número de pedido lo asigna el ERP. Mientras no exista una
 * pasarela configurada no se cobra nada: el pago se coordina manualmente.
 */
import type { CartItem } from '@/types'
import type { CheckoutFormValues } from '@/lib/validation/checkout'

export type PaymentProvider = 'wompi' | 'mercadopago' | 'stripe' | 'dev'

export interface OrderPayload {
  /** Identifica el intento de compra: reintentarlo nunca duplica el pedido en el ERP. */
  idempotencyKey: string
  customer: CheckoutFormValues
  items: CartItem[]
  subtotal: number
  discount: number
  shipping: number | null
  total: number
}

export interface OrderResult {
  orderNumber: string
  provider: PaymentProvider
  status: 'pending_manual' | 'paid' | 'requires_action'
  createdAt: string
  /** Total calculado por el ERP con sus precios vigentes. */
  total: number
  /** Mensaje claro para el usuario sobre el estado real del pedido. */
  message: string
}

/** Detecta el proveedor configurado a partir de variables de entorno públicas. */
export function getConfiguredProvider(): PaymentProvider {
  if (process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY) return 'wompi'
  if (process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY) return 'mercadopago'
  if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) return 'stripe'
  return 'dev'
}

export function isDevPaymentMode(): boolean {
  return getConfiguredProvider() === 'dev'
}

/**
 * Registra el pedido en el ERP. Lanza un Error con un mensaje apto para el
 * cliente si el ERP lo rechaza (p. ej. sin existencias) o no responde.
 * Cuando se configure una pasarela, aquí se debe iniciar la transacción real.
 */
export async function createOrder(payload: OrderPayload): Promise<OrderResult> {
  const provider = getConfiguredProvider()

  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      idempotencyKey: payload.idempotencyKey,
      customer: payload.customer,
      items: payload.items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
    }),
  })
  const json = await res.json().catch(() => null)
  if (!res.ok || !json?.success) {
    throw new Error(json?.error || 'No pudimos registrar tu pedido. Intenta de nuevo en unos minutos.')
  }

  // Punto de extensión: iniciar transacción con la pasarela configurada.
  // switch (provider) { case 'wompi': ... }

  return {
    orderNumber: json.data.orderNumber,
    provider,
    status: 'pending_manual',
    createdAt: new Date().toISOString(),
    total: Number(json.data.total),
    message:
      provider === 'dev'
        ? 'Tu pedido quedó registrado. Aún no se ha procesado ningún pago: te contactaremos para coordinar el pago y la entrega.'
        : 'Pedido registrado. Continúa con el proceso de pago para completarlo.',
  }
}
