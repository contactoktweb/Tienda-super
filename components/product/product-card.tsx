'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { useState } from 'react'
import { toast } from 'sonner'
import type { Product } from '@/types'
import { SolarIcon } from '@/components/ui/solar-icon'
import { formatPrice, discountPercent } from '@/lib/format'
import { useCartStore } from '@/stores/cart-store'
import { staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)
  const [added, setAdded] = useState(false)

  const discount = discountPercent(product.price, product.previousPrice)
  const outOfStock = product.stock <= 0

  function handleAdd() {
    if (outOfStock) return
    addItem(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
    toast.success('Producto agregado al carrito', {
      description: product.name,
      action: {
        label: 'Ver carrito',
        onClick: () => openCart(),
      },
    })
  }

  return (
    <motion.article
      variants={staggerItem}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-200 hover:border-slate-300 hover:shadow-md"
    >
      {/* 1. Full-Bleed Top Media Area (Touches top, left, and right borders) */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-50/60">
        {/* Floating Badges */}
        <div className="absolute left-2.5 top-2.5 z-10 flex flex-col gap-1 pointer-events-none">
          {product.onSale && discount > 0 ? (
            <span className="rounded bg-red px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-xs">
              -{discount}%
            </span>
          ) : null}
          {product.isNew && (!product.onSale || discount <= 0) ? (
            <span className="rounded bg-primary px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-xs">
              Nuevo
            </span>
          ) : null}
        </div>

        {/* Product Image stretching edge-to-edge */}
        <Link
          href={`/producto/${product.slug}`}
          className="relative block size-full p-4"
        >
          <Image
            src={product.images[0] || '/placeholder.svg'}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* 2. Product Details with Padded Container */}
      <div className="flex flex-1 flex-col p-3.5 pt-3">
        {/* Category uppercase subtitle */}
        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">
          {product.category.replace(/-/g, ' ')}
        </span>

        {/* Product Title */}
        <h3 className="h-9 text-xs sm:text-sm font-bold leading-snug text-slate-900 line-clamp-2 group-hover:text-primary transition-colors mt-0.5">
          <Link href={`/producto/${product.slug}`}>
            {product.name}
          </Link>
        </h3>

        {/* Presentation */}
        <p className="text-[11px] text-slate-500 truncate mt-0.5">
          {product.presentation || product.unit}
        </p>

        {/* Wholesale pill container */}
        <div className="h-6 flex items-center mt-1">
          {product.wholesalePrice ? (
            <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">
              Mayorista: <strong className="ml-1 font-bold">{formatPrice(product.wholesalePrice)}</strong>
              <span className="ml-0.5 text-slate-400 text-[9px]">({product.wholesaleMinQty ? `x${product.wholesaleMinQty}` : 'x12'})</span>
            </span>
          ) : null}
        </div>

        {/* Price Row */}
        <div className="mt-auto pt-2 flex items-baseline gap-2">
          <span className="text-sm sm:text-base font-extrabold text-slate-900 font-heading">
            {formatPrice(product.price)}
          </span>
          {product.previousPrice && product.previousPrice > product.price ? (
            <span className="text-xs text-slate-400 line-through">
              {formatPrice(product.previousPrice)}
            </span>
          ) : null}
        </div>

        {/* Add to Cart Button (Navy Blue with AGREGAR uppercase) */}
        <button
          type="button"
          onClick={handleAdd}
          disabled={outOfStock}
          className={cn(
            'mt-2.5 flex h-9 w-full items-center justify-center gap-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 shadow-xs',
            added
              ? 'bg-emerald-600'
              : 'bg-primary hover:bg-primary/90',
          )}
        >
          {added ? (
            <>
              <SolarIcon icon="solar:check-circle-linear" className="size-4" />
              <span>Agregado</span>
            </>
          ) : (
            <>
              <SolarIcon icon="solar:cart-large-minimalistic-linear" className="size-3.5" />
              <span>{outOfStock ? 'Agotado' : 'Agregar'}</span>
            </>
          )}
        </button>
      </div>
    </motion.article>
  )
}
