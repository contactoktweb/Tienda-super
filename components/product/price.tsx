import { formatPrice } from '@/lib/format'
import { cn } from '@/lib/utils'

export function Price({
  price,
  previousPrice,
  size = 'md',
  className,
}: {
  price: number
  previousPrice?: number | null
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const priceClass =
    size === 'lg'
      ? 'text-2xl sm:text-3xl'
      : size === 'sm'
        ? 'text-base'
        : 'text-lg'

  return (
    <div className={cn('flex items-baseline gap-2', className)}>
      <span className={cn('font-heading font-bold text-primary', priceClass)}>
        {formatPrice(price)}
      </span>
      {previousPrice && previousPrice > price ? (
        <span className="text-sm font-medium text-muted-foreground line-through">
          {formatPrice(previousPrice)}
        </span>
      ) : null}
    </div>
  )
}
