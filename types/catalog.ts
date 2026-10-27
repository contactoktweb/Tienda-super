/**
 * Tipos oficiales para el consumo de la API Pública de Catálogos del ERP Super Más.
 */

export type ProductAvailability = 'AVAILABLE' | 'LOW_STOCK' | 'OUT_OF_STOCK'

export interface PublicSuperMasProduct {
  id: string
  sku: string
  barcode: string | null
  name: string
  slug: string
  description: string | null
  category: string
  brand: string
  unitOfMeasure: string
  imageUrl: string | null
  images: string[]
  /** Precio de venta CON IVA (lo que paga el cliente). */
  price: number
  /** Precio antes de IVA. */
  priceBeforeTax?: number
  showPrice: boolean
  vatRatePercent: number
  isExempt: boolean
  availability: ProductAvailability
  availabilityLabel: string
  canBuyDirectly: boolean
  updatedAt: string
}

export interface PublicDistributorProduct {
  id: string
  sku: string
  barcode: string | null
  name: string
  slug: string
  description: string | null
  category: string
  brand: string
  unitOfMeasure: string
  imageUrl: string | null
  images: string[]
  /** Precio mayorista CON IVA. */
  distributorPrice: number
  /** Precio mayorista antes de IVA. */
  distributorPriceBeforeTax?: number
  /** Precio al público CON IVA. */
  normalPrice: number | null
  vatRatePercent?: number
  availability: ProductAvailability
  availabilityLabel: string
  canBuyDirectly: boolean
  canContactWhatsApp: boolean
  whatsappUrl?: string
  updatedAt: string
}

export interface CatalogPagination {
  total: number
  page: number
  pageSize: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface CatalogApiResponse<T> {
  success: boolean
  channel: 'supermas' | 'distributor'
  data: T
  pagination?: CatalogPagination
  error?: string
}

export interface CatalogQueryParams {
  query?: string
  search?: string
  q?: string
  category?: string
  brand?: string
  availability?: ProductAvailability
  minPrice?: number
  maxPrice?: number
  directPurchase?: boolean
  sortBy?: 'name' | 'price' | 'sku'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
  pageSize?: number
  companyId?: string
}
