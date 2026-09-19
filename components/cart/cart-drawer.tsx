'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { SolarIcon } from '@/components/ui/solar-icon'
import { useCartStore, selectCount, selectSubtotal } from '@/stores/cart-store'
import { useHydrated } from '@/hooks/use-hydrated'
import { QuantitySelector } from '@/components/product/quantity-selector'
import { formatPrice } from '@/lib/format'
import { site, whatsappLink } from '@/data/site'

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen)
  const closeCart = useCartStore((s) => s.closeCart)
  const items = useCartStore((s) => s.items)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const hydrated = useHydrated()

  const count = hydrated ? selectCount(items) : 0
  const subtotal = hydrated ? selectSubtotal(items) : 0

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        closeCart()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeCart])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  function buildWhatsAppMessage() {
    let msg = `*¡Hola ${site.name}!* Deseo realizar el siguiente pedido:\n\n`
    items.forEach((item, index) => {
      msg += `${index + 1}. *${item.name}* (${item.presentation || item.unit})\n`
      msg += `   - Cantidad: ${item.quantity}\n`
      msg += `   - Precio unitario: ${formatPrice(item.price)}\n`
      msg += `   - Subtotal: ${formatPrice(item.price * item.quantity)}\n\n`
    })
    msg += `*Total Estimado: ${formatPrice(subtotal)}*\n`
    msg += `Quedo atento(a) para coordinar el pago y envío. ¡Muchas gracias!`
    return msg
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.25 }}
            className="relative flex h-full w-full max-w-md flex-col bg-background shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de compras"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
              <div className="flex items-center gap-2">
                <SolarIcon icon="solar:cart-large-minimalistic-linear" className="size-5 text-primary" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Tu Carrito</h2>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-primary">
                  {count}
                </span>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Cerrar carrito"
                className="flex size-8 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground"
              >
                <SolarIcon icon="solar:close-circle-linear" className="size-5" />
              </button>
            </div>

            {/* Items List */}
            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-3">
                  <SolarIcon icon="solar:cart-large-minimalistic-linear" className="size-7" />
                </div>
                <h3 className="text-sm font-bold text-foreground">Tu carrito está vacío</h3>
                <p className="mt-1 text-xs text-muted-foreground max-w-xs">
                  Agrega productos al detal o al por mayor con los mejores precios.
                </p>
                <Link
                  href="/productos"
                  onClick={closeCart}
                  className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-brand-dark"
                >
                  <span>Explorar catálogo</span>
                  <SolarIcon icon="solar:arrow-right-linear" className="size-4" />
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-border/60">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.variant || 'default'}`} className="pt-3 first:pt-0 flex gap-3">
                      <div className="relative size-16 shrink-0 overflow-hidden rounded border border-border bg-slate-50">
                        <Image
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-contain p-1"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold text-xs text-foreground line-clamp-1">
                              {item.name}
                            </h4>
                            <button
                              type="button"
                              onClick={() => removeItem(item.productId, item.variant)}
                              aria-label={`Eliminar ${item.name}`}
                              className="text-slate-400 hover:text-red transition-colors p-0.5"
                            >
                              <SolarIcon icon="solar:trash-bin-trash-linear" className="size-4" />
                            </button>
                          </div>
                          <p className="text-[11px] text-muted-foreground">
                            {item.presentation || item.unit}
                          </p>
                        </div>

                        <div className="mt-2 flex items-center justify-between gap-2">
                          <QuantitySelector
                            size="sm"
                            value={item.quantity}
                            max={item.stock || 99}
                            onChange={(qty) => updateQuantity(item.productId, qty, item.variant)}
                          />
                          <span className="font-bold text-xs text-primary">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary & Actions */}
                <div className="border-t border-border bg-slate-50 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground uppercase font-bold tracking-wider">Subtotal</span>
                    <span className="text-base font-bold text-foreground">{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground bg-white border border-border p-2 rounded">
                    <SolarIcon icon="solar:delivery-linear" className="size-4 shrink-0 text-primary" />
                    <span>{site.shipping.note}</span>
                  </div>

                  <div className="space-y-2 pt-1">
                    <a
                      href={whatsappLink(buildWhatsAppMessage())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-emerald-500 active:scale-[0.98]"
                    >
                      <SolarIcon icon="solar:chat-round-dots-linear" className="size-4" />
                      <span>Pedir por WhatsApp</span>
                    </a>

                    <Link
                      href="/checkout"
                      onClick={closeCart}
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-brand-dark active:scale-[0.98]"
                    >
                      <span>Finalizar compra online</span>
                      <SolarIcon icon="solar:arrow-right-linear" className="size-4" />
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
