'use client'

import { motion } from 'motion/react'
import type { Product } from '@/types'
import { ProductCard } from '@/components/product/product-card'
import { staggerContainer, viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/utils'

export function ProductGrid({
  products,
  className,
}: {
  products: Product[]
  className?: string
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        'grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5',
        className,
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  )
}
