'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import type { Product } from '@/types'
import { SolarIcon } from '@/components/ui/solar-icon'
import { useCartStore } from '@/stores/cart-store'
import { QuantitySelector } from '@/components/product/quantity-selector'
import { formatPrice } from '@/lib/format'
import { site, whatsappLink } from '@/data/site'

export function ProductActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)

  const outOfStock = product.stock <= 0
  const isWholesaleQualified =
    product.wholesaleMinQty &&
    product.wholesalePrice &&
    quantity >= product.wholesaleMinQty

  const currentUnitPrice = isWholesaleQualified
    ? product.wholesalePrice!
    : product.price

  const totalPrice = currentUnitPrice * quantity

  function handleAddToCart() {
    if (outOfStock) return
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
    toast.success('Producto agregado al carrito', {
      description: `${quantity}x ${product.name}`,
      action: {
        label: 'Ver carrito',
        onClick: () => openCart(),
      },
    })
  }

  const whatsappMessage = `¡Hola ${site.name}! Quiero ordenar *${quantity} unidad(es)* de *${product.name}* (${product.presentation || product.unit}) por un valor total de *${formatPrice(totalPrice)}*. ¿Tienen disponibilidad inmediata?`

  return (
    <div className="space-y-4">
      {/* Quantity & Subtotal */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Cantidad
          </label>
          <QuantitySelector
            value={quantity}
            onChange={setQuantity}
            max={product.stock || 99}
            min={1}
            size="md"
          />
        </div>

        <div className="flex flex-col gap-1 pl-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Subtotal estimado
          </span>
          <span className="text-xl font-bold text-foreground">
            {formatPrice(totalPrice)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={outOfStock}
          className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${
            added
              ? 'bg-success text-white'
              : 'bg-primary text-primary-foreground hover:bg-brand-dark'
          }`}
        >
          {added ? (
            <>
              <SolarIcon icon="solar:check-circle-linear" className="size-4" />
              <span>Agregado al Carrito</span>
            </>
          ) : (
            <>
              <SolarIcon icon="solar:cart-large-minimalistic-linear" className="size-4" />
              <span>Agregar al Carrito</span>
            </>
          )}
        </button>

        <a
          href={whatsappLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-emerald-500 active:scale-[0.98]"
        >
          <SolarIcon icon="solar:chat-round-dots-linear" className="size-4" />
          <span>Pedir por WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
