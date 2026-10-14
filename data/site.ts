/**
 * Configuración central de la tienda.
 * Los valores marcados como PLACEHOLDER deben ser reemplazados por la
 * información oficial de Super Más antes de publicar.
 */
export const site = {
  name: 'Super Más',
  shortName: 'Super Más',
  description:
    'Super Más, todo lo que necesitas en un solo lugar. Productos de despensa, aseo, cuidado personal y canasta familiar al detal y al por mayor.',
  url: 'https://distribuidora-super-plus.example.com', // PLACEHOLDER

  logo: '/logo-super.webp',
  logoWhite: '/logo-super-white.webp',

  // ---- Contacto (PLACEHOLDER: reemplazar con datos oficiales) ----
  contact: {
    // Número en formato internacional sin signos para el enlace de WhatsApp.
    whatsapp: '000000000000', // PLACEHOLDER
    whatsappDisplay: '+00 000 000 0000', // PLACEHOLDER
    phone: '+00 000 000 0000', // PLACEHOLDER
    email: 'contacto@ejemplo.com', // PLACEHOLDER
    address: 'Dirección por definir', // PLACEHOLDER
    city: 'Ciudad por definir', // PLACEHOLDER
    hours: 'Horario por definir', // PLACEHOLDER
  },

  social: {
    instagram: '#', // PLACEHOLDER
    facebook: '#', // PLACEHOLDER
    tiktok: '#', // PLACEHOLDER
  },

  // Moneda usada para el formateo de precios.
  currency: {
    code: 'COP',
    locale: 'es-CO',
  },

  // Textos promocionales editables.
  topBar: {
    left: 'Venta al detal y al por mayor',
    whatsappCta: 'Atención por WhatsApp',
  },

  // Envío: aún no definido. Se mantiene en 0 y claramente marcado.
  shipping: {
    // null => "por calcular / a convenir"; no inventamos tarifas.
    flatFee: null as number | null,
    note: 'El costo de envío se coordina al confirmar el pedido.',
  },
} as const

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.contact.whatsapp}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}
