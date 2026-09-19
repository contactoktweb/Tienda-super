export interface ProductVariant {
  id: string
  name: string
  value: string
}

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  longDescription: string
  category: string // category slug
  price: number
  /** Precio anterior (para mostrar descuento). null si no aplica. */
  previousPrice: number | null
  /** Precio unitario mayorista. null si no aplica. */
  wholesalePrice: number | null
  /** Cantidad mínima para acceder al precio mayorista. */
  wholesaleMinQty: number | null
  sku: string
  images: string[]
  stock: number
  /** Unidad de venta, ej: "unidad", "docena". */
  unit: string
  /** Presentación comercial, ej: "Tarro x 50 g". */
  presentation: string
  featured: boolean
  onSale: boolean
  isNew: boolean
  bestSeller: boolean
  keywords: string[]
  variants: ProductVariant[]
  /** Marcado como placeholder mientras no exista precio oficial. */
  pricePlaceholder: boolean
}

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  icon: string // lucide icon name
}

export interface CartItem {
  productId: string
  slug: string
  name: string
  image: string
  price: number
  unit: string
  presentation: string
  stock: number
  quantity: number
  variant?: string
}
