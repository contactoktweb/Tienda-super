'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import type { Product } from '@/types'
import { getCategoryBySlug } from '@/data/categories'
import { formatPrice } from '@/lib/format'
import { useCartStore } from '@/stores/cart-store'
import { SolarIcon } from '@/components/ui/solar-icon'
import { ProductCard } from '@/components/product/product-card'
import { cn } from '@/lib/utils'

interface ProductDetailViewProps {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)
  const category = getCategoryBySlug(product.category)

  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [added, setAdded] = useState(false)

  // Actual product images from platform without artificial 4-image duplication
  const images =
    product.images && product.images.length > 0
      ? product.images.filter(Boolean)
      : ['/placeholder.svg']
  const hasMultipleImages = images.length > 1

  function handleAddToCart() {
    if (product.stock <= 0) return
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
    toast.success('Producto agregado al carrito', {
      description: `${quantity}x ${product.name}`,
      action: {
        label: 'Ver carrito',
        onClick: () => openCart(),
      },
    })
  }

  function handleBuyNow() {
    if (product.stock <= 0) return
    addItem(product, quantity)
    openCart()
  }

  return (
    <div className="space-y-8">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-xs text-slate-500">
        <Link href="/" className="hover:text-primary transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/productos" className="hover:text-primary transition-colors">
          Productos
        </Link>
        <span>/</span>
        <span className="font-bold text-slate-900">{product.name}</span>
      </nav>

      {/* 2. Main Product Area (Gallery + Sticky Info Box) */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Left Gallery (col-span-6) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Large Image Container */}
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 flex items-center justify-center shadow-xs">
            {/* Navigation Arrows on image (only if multiple images exist) */}
            {hasMultipleImages && (
              <>
                <button
                  type="button"
                  aria-label="Imagen anterior"
                  onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex size-8 items-center justify-center rounded-full bg-white/90 text-slate-600 border border-slate-200 shadow-xs hover:bg-white active:scale-95"
                >
                  <SolarIcon icon="solar:alt-arrow-left-linear" className="size-4" />
                </button>

                <button
                  type="button"
                  aria-label="Imagen siguiente"
                  onClick={() => setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex size-8 items-center justify-center rounded-full bg-white/90 text-slate-600 border border-slate-200 shadow-xs hover:bg-white active:scale-95"
                >
                  <SolarIcon icon="solar:alt-arrow-right-linear" className="size-4" />
                </button>
              </>
            )}

            {/* Main Product Image */}
            <div className="relative size-full max-h-[380px] max-w-[380px]">
              <Image
                src={images[selectedImageIndex] || '/placeholder.svg'}
                alt={product.name}
                fill
                priority
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>

          {/* Thumbnails Row (rendered only if multiple images exist) */}
          {hasMultipleImages && (
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {images.map((img, index) => {
                const isSelected = selectedImageIndex === index
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    aria-label={`Ver imagen ${index + 1}`}
                    className={cn(
                      'relative size-16 sm:size-20 shrink-0 overflow-hidden rounded-xl bg-white p-1.5 transition-all border',
                      isSelected
                        ? 'border-2 border-red shadow-xs'
                        : 'border-slate-200 opacity-75 hover:opacity-100 hover:border-slate-300',
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} miniatura ${index + 1}`}
                      fill
                      sizes="80px"
                      className="object-contain p-1"
                    />
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Right Sticky Info Box (col-span-6) */}
        <div className="lg:col-span-6 lg:sticky lg:top-24 self-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-5 shadow-xs">
            {/* Top Badge & Stock Status */}
            <div className="flex items-center justify-between gap-2">
              {product.wholesalePrice ? (
                <span className="rounded bg-emerald-700 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white">
                  Mayorista
                </span>
              ) : product.stock > 0 ? (
                <span className="rounded bg-primary px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white">
                  Disponible
                </span>
              ) : (
                <span className="rounded bg-slate-600 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white">
                  Agotado
                </span>
              )}

              {product.stock > 0 ? (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                  <span className="size-2 rounded-full bg-emerald-600" />
                  <span>En stock</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <span className="size-2 rounded-full bg-slate-400" />
                  <span>Sin stock</span>
                </span>
              )}
            </div>

            {/* Title & Category */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                {product.name}
              </h1>
              {category ? (
                <p className="mt-1 text-xs text-slate-500">
                  Categoría:{' '}
                  <Link
                    href={`/categoria/${category.slug}`}
                    className="font-semibold text-primary hover:underline"
                  >
                    {category.name}
                  </Link>
                </p>
              ) : null}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Main Retail Price */}
            <div className="flex items-baseline gap-2 pt-1 border-t border-slate-100">
              <span className="text-3xl font-extrabold font-heading text-slate-900">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs font-bold uppercase text-slate-400">
                COP
              </span>
              {product.previousPrice && product.previousPrice > product.price ? (
                <span className="ml-2 text-sm text-slate-400 line-through">
                  {formatPrice(product.previousPrice)}
                </span>
              ) : null}
            </div>

            {/* Wholesale Price Box */}
            {product.wholesalePrice ? (
              <div className="rounded-xl border border-blue-100 bg-[#f8fafc] p-3.5 space-y-0.5">
                <span className="text-xs font-bold text-slate-700 block">
                  Precio mayorista desde {product.wholesaleMinQty || 12} unidades:
                </span>
                <span className="text-lg font-extrabold text-primary font-heading">
                  {formatPrice(product.wholesalePrice)} <span className="text-xs font-bold">COP</span>
                </span>
              </div>
            ) : null}

            {/* Specs Grid: SKU, Presentación, Disponibilidad */}
            <div className="grid grid-cols-3 gap-3 border-y border-slate-100 py-3 text-xs">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  SKU
                </span>
                <span className="font-semibold text-slate-800">{product.sku}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Presentación
                </span>
                <span className="font-semibold text-slate-800">{product.presentation || product.unit}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Disponibilidad
                </span>
                <span
                  className={cn(
                    'font-bold',
                    product.stock > 0 ? 'text-emerald-600' : 'text-slate-500',
                  )}
                >
                  {product.stock > 0 ? 'Disponible' : 'Agotado'}
                </span>
              </div>
            </div>

            {/* Quantity Selector & Buy Buttons */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex h-11 items-center rounded-xl border border-slate-200 bg-white px-2 shadow-xs">
                  <button
                    type="button"
                    aria-label="Disminuir cantidad"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex size-7 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 active:scale-95 text-base font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-slate-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Aumentar cantidad"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex size-7 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 active:scale-95 text-base font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Red Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 flex h-11 items-center justify-center gap-2 rounded-xl bg-red px-6 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-colors hover:bg-red/90 active:scale-95"
                >
                  <SolarIcon icon="solar:cart-large-minimalistic-linear" className="size-4" />
                  <span>{added ? '¡Agregado!' : 'Agregar al carrito'}</span>
                </button>
              </div>

              {/* Buy Now White Button */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="flex w-full h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-xs font-bold uppercase tracking-wider text-slate-800 transition-colors hover:bg-slate-50 active:scale-95 shadow-xs"
              >
                <SolarIcon icon="solar:bag-linear" className="size-4" />
                <span>Comprar ahora</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-[10px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <SolarIcon icon="solar:shield-minimalistic-linear" className="size-4 text-primary shrink-0" />
                <div>
                  <strong className="block text-slate-800 font-bold">Compra segura</strong>
                  <span>Protegemos tus datos</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <SolarIcon icon="solar:tag-linear" className="size-4 text-primary shrink-0" />
                <div>
                  <strong className="block text-slate-800 font-bold">Precios mayoristas</strong>
                  <span>Ahorra comprando más</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <SolarIcon icon="solar:chat-round-dots-linear" className="size-4 text-primary shrink-0" />
                <div>
                  <strong className="block text-slate-800 font-bold">Atención 1 a 1</strong>
                  <span>Te asesoramos siempre</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Product Description (Solo si la trae el sistema y aporta información adicional) */}
      {product.longDescription && product.longDescription.trim() !== (product.description || '').trim() ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 font-heading">
            Descripción detallada
          </h2>
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            <p>{product.longDescription}</p>
          </div>
        </div>
      ) : null}

      {/* 4. Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-heading text-slate-900">
              También te puede interesar
            </h2>
            <Link
              href="/productos"
              className="text-xs font-bold text-red hover:underline flex items-center gap-1"
            >
              <span>Ver todos los productos</span>
              <SolarIcon icon="solar:arrow-right-linear" className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* 5. Bottom Value Props Bar */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:px-4 first:pt-0 first:px-0">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-primary">
              <SolarIcon icon="solar:delivery-linear" className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Envíos rápidos</h4>
              <p className="text-[11px] text-slate-500">A todo Colombia</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:px-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-primary">
              <SolarIcon icon="solar:shield-minimalistic-linear" className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Compras seguras</h4>
              <p className="text-[11px] text-slate-500">Productos 100% originales</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:px-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-primary">
              <SolarIcon icon="solar:tag-linear" className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Precios mayoristas</h4>
              <p className="text-[11px] text-slate-500">Descuentos por volumen</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:px-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-primary">
              <SolarIcon icon="solar:chat-round-dots-linear" className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Atención personalizada</h4>
              <p className="text-[11px] text-slate-500">WhatsApp y teléfono</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
