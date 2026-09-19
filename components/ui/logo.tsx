import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  priority = false,
  width = 145,
  height = 42,
}: {
  className?: string
  priority?: boolean
  width?: number
  height?: number
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} - Inicio`}
      className={cn('inline-flex items-center transition-opacity hover:opacity-90', className)}
    >
      <Image
        src={site.logo || '/placeholder.svg'}
        alt={site.name}
        width={width}
        height={height}
        priority={priority}
        className="object-contain"
        style={{ width: 'auto', height: 'auto', maxHeight: '42px' }}
      />
    </Link>
  )
}
