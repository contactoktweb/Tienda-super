'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { fadeUp, viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/utils'

export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section'
}) {
  const Comp = as === 'section' ? motion.section : motion.div
  return (
    <Comp
      className={cn(className)}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </Comp>
  )
}
