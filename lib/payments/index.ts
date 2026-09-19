/**
 * Capa de abstracción de pagos.
 *
 * Permite integrar posteriormente una pasarela real (Wompi, Mercado Pago,
 * Stripe, etc.) sin cambiar el flujo del checkout.
 *
 * Mientras no existan credenciales configuradas, opera en MODO DESARROLLO:
 * NO simula un cobro real. Únicamente registra el pedido localmente y
 * genera un número de pedido para dar seguimiento manual (p. ej. por WhatsApp).
 */
import type { CartItem } from '@/types'
import type { CheckoutFormValues } from '@/lib/validation/checkout'

export type PaymentProvider = 'wompi' | 'mercadopago' | 'stripe' | 'dev'

export interface OrderPayload {
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

function generateOrderNumber(): string {
  const date = new Date()
  const y = date.getFullYear().toString().slice(-2)
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `SP-${y}${m}${d}-${rand}`
}

/**
 * Crea un pedido. En modo desarrollo no cobra: deja el pedido en estado
 * `pending_manual` para coordinar el pago y la entrega por otro canal.
 * Cuando se configure una pasarela, aquí se debe iniciar la transacción real.
 */
export async function createOrder(payload: OrderPayload): Promise<OrderResult> {
  const provider = getConfiguredProvider()
  const orderNumber = generateOrderNumber()
  const createdAt = new Date().toISOString()

  // Punto de extensión: iniciar transacción con la pasarela configurada.
  // switch (provider) { case 'wompi': ... }

  return {
    orderNumber,
    provider,
    status: 'pending_manual',
    createdAt,
    message:
      provider === 'dev'
        ? 'Pedido registrado en modo desarrollo. Aún no se ha procesado ningún pago. Coordina el pago y la entrega para completarlo.'
        : 'Pedido registrado. Continúa con el proceso de pago para completarlo.',
  }
}
