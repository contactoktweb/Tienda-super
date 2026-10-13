'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import type { PublicDistributorProduct } from '@/types/catalog'
import { SolarIcon } from '@/components/ui/solar-icon'
import { formatPrice } from '@/lib/format'
import { buildDistributorWhatsAppUrl } from '@/lib/api/catalog'
import { cn } from '@/lib/utils'

interface DistributorCardProps {
  product: PublicDistributorProduct
  onAddToQuote?: (product: PublicDistributorProduct, qty: number) => void
  isQuoted?: boolean
}

export function DistributorCard({
  product,
  onAddToQuote,
  isQuoted = false,
}: DistributorCardProps) {
  const [quantity, setQuantity] = useState(1)
  const isOutOfStock = product.availability === 'OUT_OF_STOCK'

  const handleWhatsAppClick = () => {
    const url = buildDistributorWhatsAppUrl(product, quantity)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleAdd = () => {
    if (onAddToQuote) {
      onAddToQuote(product, quantity)
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white shadow-xs transition-all duration-200 hover:shadow-md',
        isQuoted
          ? 'border-emerald-500/80 ring-2 ring-emerald-500/20'
          : 'border-slate-200/90 hover:border-slate-300',
      )}
    >
      {/* Top Image & Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-50/70 p-4">
        {/* Badges */}
        <div className="absolute left-2.5 top-2.5 z-10 flex flex-col gap-1 pointer-events-none">
          <span
            className={cn(
              'rounded px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-xs',
              product.availability === 'AVAILABLE' && 'bg-emerald-600',
              product.availability === 'LOW_STOCK' && 'bg-amber-600',
              product.availability === 'OUT_OF_STOCK' && 'bg-rose-600',
            )}
          >
            {product.availabilityLabel}
          </span>
        </div>

        {/* SKU tag on top right */}
        <div className="absolute right-2.5 top-2.5 z-10">
          <span className="rounded bg-slate-900/80 px-2 py-0.5 font-mono text-[9px] font-semibold text-white backdrop-blur-xs">
            {product.sku}
          </span>
        </div>

        {/* Product Image */}
        <div className="relative size-full">
          <Image
            src={
              product.images?.[0] || product.imageUrl || '/placeholder.svg'
            }
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Body Details */}
      <div className="flex flex-1 flex-col p-4 pt-3">
        {/* Category & Brand */}
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
          <span className="truncate">{product.category || 'General'}</span>
          {product.brand ? (
            <span className="text-slate-500 font-semibold">{product.brand}</span>
          ) : null}
        </div>

        {/* Product Title */}
        <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Description snippet */}
        {product.description ? (
          <p className="mt-1 line-clamp-2 text-xs text-slate-500">
            {product.description}
          </p>
        ) : null}

        {/* Presentation / Unit */}
        <p className="mt-1 text-[11px] text-slate-400">
          Unidad:{' '}
          <span className="font-medium text-slate-600">
            {product.unitOfMeasure || 'Unidad'}
          </span>
        </p>

        {/* Price Section */}
        <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Precio Distribuidor (Mayorista)
          </span>
          <div className="mt-0.5 flex items-baseline gap-2">
            <span className="font-heading text-lg sm:text-xl font-extrabold text-slate-900">
              {formatPrice(product.distributorPrice)}
            </span>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-slate-600">
            Cantidad a pedir:
          </span>
          <div className="flex items-center rounded-lg border border-slate-200 bg-white">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1 || isOutOfStock}
              aria-label="Disminuir cantidad"
              className="flex size-7.5 items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40"
            >
              -
            </button>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10)
                if (!isNaN(val) && val >= 1) setQuantity(val)
              }}
              disabled={isOutOfStock}
              aria-label="Cantidad"
              className="w-12 text-center text-xs font-bold text-slate-800 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              disabled={isOutOfStock}
              aria-label="Aumentar cantidad"
              className="flex size-7.5 items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-3.5 flex flex-col gap-2">
          {/* WhatsApp Direct Action */}
          <button
            type="button"
            onClick={handleWhatsAppClick}
            disabled={isOutOfStock}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all hover:bg-emerald-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <SolarIcon
              icon="solar:chat-round-dots-linear"
              className="size-4 shrink-0"
            />
            <span>Pedir por WhatsApp</span>
          </button>

          {/* Add to Multi-Item Wholesale Quote */}
          {onAddToQuote ? (
            <button
              type="button"
              onClick={handleAdd}
              disabled={isOutOfStock}
              className={cn(
                'flex h-8.5 w-full items-center justify-center gap-1.5 rounded-xl border text-xs font-bold transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40',
                isQuoted
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
              )}
            >
              <SolarIcon
                icon={
                  isQuoted
                    ? 'solar:check-circle-linear'
                    : 'solar:clipboard-add-linear'
                }
                className="size-3.5"
              />
              <span>
                {isQuoted ? 'En lista de cotización' : '+ Agregar a lista mayorista'}
              </span>
            </button>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}
