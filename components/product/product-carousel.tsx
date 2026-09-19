'use client'

import { useRef } from 'react'
import type { Product } from '@/types'
import { ProductCard } from '@/components/product/product-card'
import { SolarIcon } from '@/components/ui/solar-icon'

export function ProductCarousel({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  function scrollBy(dir: 1 | -1) {
    const el = trackRef.current
    if (!el) return
    const cardWidth = el.querySelector('div > article')?.parentElement?.clientWidth || 220
    const scrollAmount = (cardWidth + 16) * 2 * dir
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  return (
    <div className="relative group/carousel">
      {/* Scrollable Container with exact matching widths to ProductGrid */}
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 sm:gap-4 overflow-x-auto scroll-smooth pb-2 touch-pan-x"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[calc(50%-0.375rem)] shrink-0 snap-start sm:w-[calc(33.333%-0.67rem)] md:w-[calc(25%-0.75rem)] lg:w-[calc(20%-0.8rem)]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={() => scrollBy(-1)}
        aria-label="Anterior"
        className="absolute -left-3 top-1/2 z-20 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition-all hover:bg-slate-50 hover:text-primary active:scale-95 md:flex"
      >
        <SolarIcon icon="solar:alt-arrow-left-linear" className="size-4" />
      </button>

      <button
        type="button"
        onClick={() => scrollBy(1)}
        aria-label="Siguiente"
        className="absolute -right-3 top-1/2 z-20 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition-all hover:bg-slate-50 hover:text-primary active:scale-95 md:flex"
      >
        <SolarIcon icon="solar:alt-arrow-right-linear" className="size-4" />
      </button>
    </div>
  )
}
