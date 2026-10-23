import { z } from 'zod'
import { checkoutSchema } from '@/lib/validation/checkout'
import { getApiBaseUrl } from '@/lib/api/config'

/**
 * Registra el pedido del checkout en el ERP Super Más (POST /api/public/orders).
 * Corre en el servidor para que ERP_ORDERS_API_TOKEN nunca llegue al navegador.
 * El ERP recalcula precios y existencias; aquí solo se envían IDs y cantidades.
 */
const orderRequestSchema = z.object({
  idempotencyKey: z.string().uuid(),
  customer: checkoutSchema,
  items: z
    .array(
      z.object({
        productId: z.string().uuid(),
        quantity: z.number().int().positive().max(10000),
      }),
    )
    .min(1)
    .max(100),
})

function json(body: unknown, status: number) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(request: Request) {
  const token = process.env.ERP_ORDERS_API_TOKEN
  if (!token) {
    console.error('[Orders] ERP_ORDERS_API_TOKEN no está configurado.')
    return json({ success: false, error: 'La tienda no puede registrar pedidos en este momento.' }, 503)
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ success: false, error: 'Datos del pedido inválidos.' }, 400)
  }

  const parsed = orderRequestSchema.safeParse(body)
  if (!parsed.success) {
    const hasInvalidProduct = parsed.error.issues.some((i) => i.path[0] === 'items')
    return json(
      {
        success: false,
        error: hasInvalidProduct
          ? 'Tu carrito tiene productos que ya no están en el catálogo. Vacíalo y agrégalos de nuevo.'
          : 'Revisa los datos del formulario.',
      },
      400,
    )
  }

  const { customer, items, idempotencyKey } = parsed.data
  try {
    const res = await fetch(`${getApiBaseUrl()}/api/public/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        idempotencyKey,
        items,
        customer: {
          firstName: customer.firstName,
          lastName: customer.lastName,
          document: customer.document,
          email: customer.email,
          phone: customer.phone,
          department: customer.department,
          city: customer.cityName,
          address: customer.address,
          complement: customer.complement,
          neighborhood: customer.neighborhood,
          postalCode: customer.postalCode,
          notes: customer.notes,
        },
      }),
      cache: 'no-store',
    })

    const result = await res.json().catch(() => null)
    if (!res.ok || !result?.success) {
      if (res.status === 401) console.error('[Orders] El ERP rechazó el token de pedidos.')
      const clientError = res.status === 422 || res.status === 503
      return json(
        {
          success: false,
          error:
            clientError && result?.error
              ? result.error
              : 'No pudimos registrar tu pedido. Intenta de nuevo en unos minutos.',
        },
        clientError ? res.status : 502,
      )
    }

    return json({ success: true, data: result.data }, 201)
  } catch (error) {
    console.error('[Orders] Error conectando con el ERP:', error)
    return json(
      { success: false, error: 'No pudimos registrar tu pedido. Intenta de nuevo en unos minutos.' },
      502,
    )
  }
}
