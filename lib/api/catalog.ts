import { getApiBaseUrl } from './config'
import type {
  PublicSuperMasProduct,
  PublicDistributorProduct,
  CatalogApiResponse,
  CatalogPagination,
  CatalogQueryParams,
} from '@/types/catalog'
import type { Product } from '@/types'
import { products as localProducts } from '@/data/products'
import {
  slugifyCategory,
  categories as synchronizedCategories,
  isTestCategory,
  getCategoryBySlug,
} from '@/data/categories'

/**
 * Convierte un producto del API de Super Más al modelo de la tienda.
 */
export function adaptSuperMasProductToStore(p: PublicSuperMasProduct): Product {
  const isOutOfStock = p.availability === 'OUT_OF_STOCK' || !p.canBuyDirectly
  let rawImages: string[] = []
  if (Array.isArray(p.images) && p.images.length > 0) {
    rawImages = p.images.filter((img) => typeof img === 'string' && img.trim().length > 0)
  }
  if (rawImages.length === 0 && p.imageUrl && p.imageUrl.trim().length > 0) {
    rawImages = [p.imageUrl.trim()]
  }
  const images = rawImages.length > 0 ? rawImages : ['/placeholder.svg']

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.description || p.name,
    longDescription: p.description || p.name,
    category: p.category ? slugifyCategory(p.category) : 'general',
    price: p.price,
    previousPrice: null,
    wholesalePrice: null,
    wholesaleMinQty: null,
    sku: p.sku,
    images,
    stock: isOutOfStock ? 0 : (p.availability === 'LOW_STOCK' ? 5 : 999),
    unit: p.unitOfMeasure || 'unidad',
    presentation: p.unitOfMeasure || 'Unidad',
    featured: false,
    onSale: false,
    isNew: false,
    bestSeller: false,
    keywords: [p.name, p.category, p.brand, p.sku].filter(Boolean),
    variants: [],
    pricePlaceholder: !p.showPrice,
  }
}

/**
 * Convierte un producto local de fallback al formato del catálogo de Distribuidora.
 */
function adaptLocalProductToDistributor(p: Product): PublicDistributorProduct {
  const distributorPrice = p.wholesalePrice || Math.round(p.price * 0.85)
  return {
    id: p.id,
    sku: p.sku,
    barcode: null,
    name: p.name,
    slug: p.slug,
    description: p.description,
    category: p.category.replace(/-/g, ' '),
    brand: 'Super Más',
    unitOfMeasure: p.unit,
    imageUrl: p.images[0] || null,
    images: p.images,
    distributorPrice,
    normalPrice: p.price,
    availability: p.stock > 0 ? (p.stock < 10 ? 'LOW_STOCK' : 'AVAILABLE') : 'OUT_OF_STOCK',
    availabilityLabel: p.stock > 0 ? (p.stock < 10 ? 'Pocas unidades' : 'Disponible') : 'Agotado',
    canBuyDirectly: false,
    canContactWhatsApp: true,
    whatsappUrl: undefined,
    updatedAt: new Date().toISOString(),
  }
}

/**
 * Construye la URL con parámetros de consulta.
 */
function buildQueryString(params?: CatalogQueryParams): string {
  if (!params) return ''
  const q = new URLSearchParams()
  const searchTerm = (params.query || params.search || params.q || '').trim()
  if (searchTerm) {
    // El API del ERP Super Más requiere específicamente 'query' para búsqueda textual
    q.set('query', searchTerm)
  }
  if (params.category) {
    const cleanCat = params.category.trim()
    const foundCat = getCategoryBySlug(cleanCat)
    q.set('category', foundCat ? foundCat.name : cleanCat)
  }
  if (params.brand) q.set('brand', params.brand)
  if (params.availability) q.set('availability', params.availability)
  if (params.minPrice !== undefined) q.set('minPrice', String(params.minPrice))
  if (params.maxPrice !== undefined) q.set('maxPrice', String(params.maxPrice))
  if (params.directPurchase !== undefined) q.set('directPurchase', String(params.directPurchase))
  if (params.sortBy) q.set('sortBy', params.sortBy)
  if (params.sortOrder) q.set('sortOrder', params.sortOrder)
  if (params.page !== undefined) q.set('page', String(params.page))
  if (params.limit !== undefined) q.set('limit', String(params.limit))
  if (params.pageSize !== undefined) q.set('pageSize', String(params.pageSize))
  if (params.companyId) q.set('companyId', params.companyId)
  const qs = q.toString()
  return qs ? `?${qs}` : ''
}

// =============================================================================
// CATÁLOGO SUPER MÁS (B2C)
// =============================================================================

export async function fetchSuperMasCatalog(params?: CatalogQueryParams): Promise<{
  products: PublicSuperMasProduct[]
  pagination?: CatalogPagination
  isLive: boolean
}> {
  const baseUrl = getApiBaseUrl()
  const qs = buildQueryString(params)
  const endpoint = `${baseUrl}/api/public/catalogs/supermas${qs}`

  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      console.warn(`[Catalog API] SuperMas returned status ${res.status}. Falling back to local data.`)
      return getSuperMasFallback(params)
    }

    const json: CatalogApiResponse<PublicSuperMasProduct[]> = await res.json()
    if (json.success && Array.isArray(json.data)) {
      return {
        products: json.data,
        pagination: json.pagination,
        isLive: true,
      }
    }

    return getSuperMasFallback(params)
  } catch (error) {
    console.warn('[Catalog API] Fetch error connecting to SuperMas ERP:', error)
    return getSuperMasFallback(params)
  }
}

export async function fetchSuperMasProductBySlug(slug: string): Promise<PublicSuperMasProduct | null> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/public/catalogs/supermas/${encodeURIComponent(slug)}`

  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 },
    })

    if (res.ok) {
      const json: CatalogApiResponse<PublicSuperMasProduct> = await res.json()
      if (json.success && json.data) {
        return json.data
      }
    }
  } catch (error) {
    console.warn('[Catalog API] Error fetching product by slug:', error)
  }

  // Fallback local
  const local = localProducts.find((p) => p.slug === slug)
  if (!local) return null

  return {
    id: local.id,
    sku: local.sku,
    barcode: null,
    name: local.name,
    slug: local.slug,
    description: local.longDescription || local.description,
    category: local.category.replace(/-/g, ' '),
    brand: 'Super Más',
    unitOfMeasure: local.unit,
    imageUrl: local.images[0] || null,
    images: local.images,
    price: local.price,
    showPrice: true,
    vatRatePercent: 0,
    isExempt: true,
    availability: local.stock > 0 ? (local.stock < 10 ? 'LOW_STOCK' : 'AVAILABLE') : 'OUT_OF_STOCK',
    availabilityLabel: local.stock > 0 ? (local.stock < 10 ? 'Pocas unidades' : 'Disponible') : 'Agotado',
    canBuyDirectly: local.stock > 0,
    updatedAt: new Date().toISOString(),
  }
}

export async function fetchSuperMasCategories(): Promise<string[]> {
  const baseUrl = getApiBaseUrl()
  try {
    const res = await fetch(`${baseUrl}/api/public/catalogs/categories?channel=supermas`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 },
    })
    if (res.ok) {
      const json = await res.json()
      if (json.success && Array.isArray(json.data)) {
        const valid = json.data.filter((c: unknown): c is string =>
          typeof c === 'string' && c.trim().length > 0 && !isTestCategory(c),
        )
        if (valid.length > 0) return valid
      }
    }
  } catch (e) {
    // ignore
  }

  // Fallback a las categorías oficiales sincronizadas
  return synchronizedCategories.map((c) => c.name)
}

function getSuperMasFallback(params?: CatalogQueryParams): {
  products: PublicSuperMasProduct[]
  pagination: CatalogPagination
  isLive: boolean
} {
  let list = localProducts

  if (params?.query || params?.search || params?.q) {
    const term = (params.query || params.search || params.q || '').toLowerCase().trim()
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.sku.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term),
    )
  }

  if (params?.category) {
    const catNorm = slugifyCategory(params.category)
    list = list.filter((p) => {
      const pNorm = slugifyCategory(p.category)
      return pNorm.includes(catNorm) || catNorm.includes(pNorm)
    })
  }

  const mapped: PublicSuperMasProduct[] = list.map((lp) => ({
    id: lp.id,
    sku: lp.sku,
    barcode: null,
    name: lp.name,
    slug: lp.slug,
    description: lp.description,
    category: lp.category.replace(/-/g, ' '),
    brand: 'Super Más',
    unitOfMeasure: lp.unit,
    imageUrl: lp.images[0] || null,
    images: lp.images,
    price: lp.price,
    showPrice: true,
    vatRatePercent: 0,
    isExempt: true,
    availability: lp.stock > 0 ? (lp.stock < 10 ? 'LOW_STOCK' : 'AVAILABLE') : 'OUT_OF_STOCK',
    availabilityLabel: lp.stock > 0 ? (lp.stock < 10 ? 'Pocas unidades' : 'Disponible') : 'Agotado',
    canBuyDirectly: lp.stock > 0,
    updatedAt: new Date().toISOString(),
  }))

  const page = params?.page || 1
  const pageSize = params?.limit || params?.pageSize || 24
  const start = (page - 1) * pageSize
  const paged = mapped.slice(start, start + pageSize)

  return {
    products: paged,
    pagination: {
      total: mapped.length,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(mapped.length / pageSize)),
      hasNextPage: start + pageSize < mapped.length,
      hasPrevPage: page > 1,
    },
    isLive: false,
  }
}

// =============================================================================
// CATÁLOGO DISTRIBUIDORA (B2B - PRIVADO)
// =============================================================================

export async function fetchDistributorCatalog(params?: CatalogQueryParams): Promise<{
  products: PublicDistributorProduct[]
  pagination?: CatalogPagination
  isLive: boolean
}> {
  const baseUrl = getApiBaseUrl()
  const qs = buildQueryString(params)
  const endpoint = `${baseUrl}/api/public/catalogs/distributor${qs}`

  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      console.warn(`[Catalog API] Distributor returned status ${res.status}. Falling back to local wholesale data.`)
      return getDistributorFallback(params)
    }

    const json: CatalogApiResponse<PublicDistributorProduct[]> = await res.json()
    if (json.success && Array.isArray(json.data)) {
      return {
        products: json.data,
        pagination: json.pagination,
        isLive: true,
      }
    }

    return getDistributorFallback(params)
  } catch (error) {
    console.warn('[Catalog API] Fetch error connecting to Distributor catalog:', error)
    return getDistributorFallback(params)
  }
}

export async function fetchDistributorProductBySlug(slug: string): Promise<PublicDistributorProduct | null> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/public/catalogs/distributor/${encodeURIComponent(slug)}`

  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 },
    })

    if (res.ok) {
      const json: CatalogApiResponse<PublicDistributorProduct> = await res.json()
      if (json.success && json.data) {
        return json.data
      }
    }
  } catch (error) {
    console.warn('[Catalog API] Error fetching distributor product by slug:', error)
  }

  const local = localProducts.find((p) => p.slug === slug)
  if (!local) return null
  return adaptLocalProductToDistributor(local)
}

export async function fetchDistributorCategories(): Promise<string[]> {
  const baseUrl = getApiBaseUrl()
  try {
    const res = await fetch(`${baseUrl}/api/public/catalogs/categories?channel=distributor`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      next: { revalidate: 120 },
    })
    if (res.ok) {
      const json = await res.json()
      if (json.success && Array.isArray(json.data)) {
        return json.data
      }
    }
  } catch (e) {
    // ignore
  }

  const categoriesSet = new Set(localProducts.map((p) => p.category.replace(/-/g, ' ')))
  return Array.from(categoriesSet)
}

function getDistributorFallback(params?: CatalogQueryParams): {
  products: PublicDistributorProduct[]
  pagination: CatalogPagination
  isLive: boolean
} {
  let list = localProducts

  if (params?.search || params?.q) {
    const term = (params.search || params.q || '').toLowerCase()
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.sku.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term),
    )
  }

  if (params?.category) {
    const cat = params.category.toLowerCase()
    list = list.filter((p) => p.category.toLowerCase().includes(cat))
  }

  const mapped = list.map(adaptLocalProductToDistributor)
  const page = params?.page || 1
  const pageSize = params?.limit || params?.pageSize || 24
  const start = (page - 1) * pageSize
  const paged = mapped.slice(start, start + pageSize)

  return {
    products: paged,
    pagination: {
      total: mapped.length,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(mapped.length / pageSize)),
      hasNextPage: start + pageSize < mapped.length,
      hasPrevPage: page > 1,
    },
    isLive: false,
  }
}

// =============================================================================
// UTILIDADES PARA WHATSAPP EN CATÁLOGO DISTRIBUIDORA
// =============================================================================

export function buildDistributorWhatsAppUrl(
  product: PublicDistributorProduct,
  quantity = 1,
  targetPhone = '573128849021',
): string {
  if (product.whatsappUrl) {
    return product.whatsappUrl
  }

  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(product.distributorPrice)

  const text = `Hola Super Más, deseo solicitar información y cotización mayorista para:\n\n📦 *${product.name}*\n🏷️ *SKU:* ${product.sku}\n💰 *Precio Distribuidor:* ${formattedPrice}\n🔢 *Cantidad deseada:* ${quantity} ${product.unitOfMeasure || 'unidades'}\n\n¿Tienen disponibilidad para despacho?`

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`
}

export function buildDistributorBulkWhatsAppUrl(
  items: Array<{ product: PublicDistributorProduct; quantity: number }>,
  targetPhone = '573128849021',
): string {
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  })

  let totalEstimate = 0
  const lines = items.map((item, idx) => {
    const subtotal = item.product.distributorPrice * item.quantity
    totalEstimate += subtotal
    return `${idx + 1}. *${item.product.name}* (SKU: ${item.product.sku})\n   - Cantidad: ${item.quantity} ${item.product.unitOfMeasure || 'und'}\n   - P. Unit: ${formatter.format(item.product.distributorPrice)} | Subtotal: ${formatter.format(subtotal)}`
  })

  const text = `Hola Super Más, deseo cotizar el siguiente pedido mayorista:\n\n${lines.join('\n\n')}\n\n📊 *Total Estimado:* ${formatter.format(totalEstimate)}\n\nPor favor confirmar disponibilidad y coordinar método de despacho.`

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`
}
