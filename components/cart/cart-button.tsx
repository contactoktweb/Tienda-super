'use client'

import { AnimatePresence, motion } from 'motion/react'
import { SolarIcon } from '@/components/ui/solar-icon'
import { useCartStore, selectCount, selectSubtotal } from '@/stores/cart-store'
import { useHydrated } from '@/hooks/use-hydrated'
import { formatPrice } from '@/lib/format'
import { cn } from '@/lib/utils'

export function CartButton({ className }: { className?: string }) {
  const items = useCartStore((s) => s.items)
  const openCart = useCartStore((s) => s.openCart)
  const hydrated = useHydrated()

  const count = hydrated ? selectCount(items) : 0
  const subtotal = hydrated ? selectSubtotal(items) : 0

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Abrir carrito de compras, ${count} productos`}
      className={cn(
        'group flex items-center gap-2.5 text-slate-800 transition-colors hover:text-primary active:scale-[0.98]',
        className,
      )}
    >
      <span className="relative flex size-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
        <SolarIcon
          icon="solar:cart-large-minimalistic-linear"
          className="size-5"
        />
        <AnimatePresence>
          {count > 0 ? (
            <motion.span
              key={count}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute -right-1 -top-1 flex size-4.5 items-center justify-center rounded-full bg-red text-[10px] font-bold text-white shadow-xs"
            >
              {count > 99 ? '99+' : count}
            </motion.span>
          ) : (
            <span className="absolute -right-1 -top-1 flex size-4.5 items-center justify-center rounded-full bg-red text-[10px] font-bold text-white shadow-xs">
              0
            </span>
          )}
        </AnimatePresence>
      </span>

      <span className="hidden flex-col items-start text-left leading-none sm:flex">
        <span className="text-[11px] font-medium text-slate-500">
          Carrito
        </span>
        <span className="text-xs font-bold text-slate-900 mt-1">
          {formatPrice(subtotal)}
        </span>
      </span>
    </button>
  )
}
