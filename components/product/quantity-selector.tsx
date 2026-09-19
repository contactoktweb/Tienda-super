'use client'

import { SolarIcon } from '@/components/ui/solar-icon'
import { cn } from '@/lib/utils'

export function QuantitySelector({
  value,
  onChange,
  max = 99,
  min = 1,
  size = 'md',
  className,
}: {
  value: number
  onChange: (next: number) => void
  max?: number
  min?: number
  size?: 'sm' | 'md'
  className?: string
}) {
  const clamp = (n: number) => Math.min(Math.max(n, min), max)
  const btn = size === 'sm' ? 'size-7' : 'size-9'
  const field = size === 'sm' ? 'w-8 text-xs' : 'w-10 text-sm'

  return (
    <div
      className={cn(
        'inline-flex items-center rounded border border-border bg-background',
        className,
      )}
    >
      <button
        type="button"
        aria-label="Disminuir cantidad"
        onClick={() => onChange(clamp(value - 1))}
        disabled={value <= min}
        className={cn(
          'flex items-center justify-center text-slate-500 transition-colors hover:bg-slate-100 hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent',
          btn,
        )}
      >
        <SolarIcon icon="solar:minus-linear" className="size-3.5" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        aria-label="Cantidad"
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          const parsed = Number.parseInt(e.target.value, 10)
          onChange(Number.isNaN(parsed) ? min : clamp(parsed))
        }}
        className={cn(
          'h-full border-x border-border bg-transparent text-center font-bold text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
          field,
          size === 'sm' ? 'py-1' : 'py-1.5',
        )}
      />
      <button
        type="button"
        aria-label="Aumentar cantidad"
        onClick={() => onChange(clamp(value + 1))}
        disabled={value >= max}
        className={cn(
          'flex items-center justify-center text-slate-500 transition-colors hover:bg-slate-100 hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent',
          btn,
        )}
      >
        <SolarIcon icon="solar:add-linear" className="size-3.5" />
      </button>
    </div>
  )
}
