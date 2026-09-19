import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider leading-none',
  {
    variants: {
      variant: {
        sale: 'bg-red text-white',
        new: 'bg-primary text-white',
        best: 'bg-amber-600 text-white',
        wholesale: 'bg-slate-100 text-primary border border-slate-200',
        muted: 'bg-slate-100 text-slate-600',
      },
    },
    defaultVariants: {
      variant: 'muted',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}
