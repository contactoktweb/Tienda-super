'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SolarIcon } from '@/components/ui/solar-icon'
import { useCartStore, selectCount } from '@/stores/cart-store'
import { useHydrated } from '@/hooks/use-hydrated'
import { whatsappLink } from '@/data/site'
import { cn } from '@/lib/utils'

export function MobileTabBar() {
  const pathname = usePathname()
  const items = useCartStore((s) => s.items)
  const openCart = useCartStore((s) => s.openCart)
  const hydrated = useHydrated()
  const count = hydrated ? selectCount(items) : 0

  return (
    <nav
      aria-label="Navegación inferior móvil"
      className="fixed bottom-0 left-0 right-0 z-40 flex h-14 items-center justify-around border-t border-border bg-background px-2 shadow-xs lg:hidden"
    >
      {/* Inicio */}
      <Link
        href="/"
        className={cn(
          'flex flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-semibold transition-colors',
          pathname === '/'
            ? 'text-primary'
            : 'text-slate-500 hover:text-foreground',
        )}
      >
        <SolarIcon icon="solar:home-2-linear" className="size-5" />
        <span>Inicio</span>
      </Link>

      {/* Catálogo */}
      <Link
        href="/productos"
        className={cn(
          'flex flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-semibold transition-colors',
          pathname.startsWith('/productos') || pathname.startsWith('/categoria')
            ? 'text-primary'
            : 'text-slate-500 hover:text-foreground',
        )}
      >
        <SolarIcon icon="solar:widget-2-linear" className="size-5" />
        <span>Catálogo</span>
      </Link>

      {/* Ofertas */}
      <Link
        href="/ofertas"
        className={cn(
          'flex flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-semibold transition-colors',
          pathname === '/ofertas'
            ? 'text-red'
            : 'text-slate-500 hover:text-foreground',
        )}
      >
        <SolarIcon icon="solar:tag-linear" className="size-5" />
        <span>Ofertas</span>
      </Link>

      {/* Carrito */}
      <button
        type="button"
        onClick={openCart}
        aria-label={`Ver carrito, ${count} productos`}
        className="relative flex flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-semibold text-slate-500 transition-colors hover:text-foreground"
      >
        <div className="relative">
          <SolarIcon icon="solar:cart-large-minimalistic-linear" className="size-5" />
          {count > 0 && (
            <span className="absolute -right-2 -top-1.5 flex size-3.5 items-center justify-center rounded-full bg-red text-[9px] font-bold text-white">
              {count > 99 ? '99+' : count}
            </span>
          )}
        </div>
        <span>Carrito</span>
      </button>

      {/* WhatsApp */}
      <a
        href={whatsappLink('Hola, deseo realizar una consulta sobre sus productos.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp asesor"
        className="flex flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
      >
        <SolarIcon icon="solar:chat-round-dots-linear" className="size-5" />
        <span>WhatsApp</span>
      </a>
    </nav>
  )
}
