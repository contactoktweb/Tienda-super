import Link from 'next/link'
import { SolarIcon } from '@/components/ui/solar-icon'
import { cn } from '@/lib/utils'

export function SectionHeading({
  title,
  subtitle,
  href,
  linkLabel = 'Ver todo',
  className,
}: {
  title: string
  subtitle?: string
  href?: string
  linkLabel?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-end justify-between gap-3',
        className,
      )}
    >
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            {subtitle}
          </p>
        ) : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="group inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:text-brand-dark"
        >
          <span>{linkLabel}</span>
          <SolarIcon icon="solar:arrow-right-linear" className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </div>
  )
}
