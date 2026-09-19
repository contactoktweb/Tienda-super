'use client'

import { useEffect, useState } from 'react'
import { SolarIcon } from '@/components/ui/solar-icon'
import { Logo } from '@/components/ui/logo'
import { SearchBar } from '@/components/layout/search-bar'
import { CartButton } from '@/components/cart/cart-button'
import { Navigation } from '@/components/layout/navigation'
import { MobileNav } from '@/components/layout/mobile-nav'
import { site, whatsappLink } from '@/data/site'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-xs">
      {/* 1. Slim Top Bar (Responsive Single Line) */}
      <div className="border-b border-slate-100 bg-white text-slate-600">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-between gap-3 px-3 text-xs sm:px-6 lg:px-8">
          {/* Left: Shipping & Wholesale */}
          <div className="flex min-w-0 items-center gap-1.5 truncate">
            <SolarIcon icon="solar:delivery-linear" className="size-3.5 text-slate-700 shrink-0" />
            <span className="text-[11px] font-semibold text-slate-800 truncate">
              Venta al detal y al por mayor
            </span>
            <span className="hidden text-slate-300 sm:inline">|</span>
            <span className="hidden text-[11px] text-slate-600 sm:inline">
              Envíos a todo Colombia
            </span>
          </div>

          {/* Right: WhatsApp & Schedule */}
          <div className="flex shrink-0 items-center gap-4 text-[11px]">
            <a
              href={whatsappLink('Hola, deseo comunicarme con atención al cliente.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
            >
              <SolarIcon icon="solar:chat-round-dots-linear" className="size-3.5 text-emerald-600" />
              <span className="hidden sm:inline text-slate-800">Atención por WhatsApp</span>
              <span className="font-bold sm:hidden">WhatsApp</span>
            </a>

            <div className="hidden items-center gap-1 text-slate-500 md:flex">
              <SolarIcon icon="solar:clock-circle-linear" className="size-3.5 text-slate-400" />
              <span>{site.contact.hours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Row: Logo, Search Bar & Cart */}
      <div className="border-b border-slate-100 bg-white">
        <div
          className={cn(
            'mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-200 sm:px-6 lg:px-8',
            scrolled ? 'h-16' : 'h-18 sm:h-20',
          )}
        >
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <MobileNav />
          </div>

          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Logo priority width={140} height={42} className="sm:w-[160px] sm:h-[48px]" />
          </div>

          {/* Center Search Bar (Desktop) */}
          <div className="hidden flex-1 max-w-2xl mx-auto lg:block">
            <SearchBar />
          </div>

          {/* Right Action: Carrito */}
          <div className="flex items-center shrink-0">
            <CartButton />
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="border-t border-slate-100 px-4 py-2 bg-slate-50 lg:hidden">
          <SearchBar />
        </div>
      </div>

      {/* 3. Navigation Bar (Desktop Mega Menu + Links) */}
      <div className="hidden border-b border-slate-100 bg-white py-2 lg:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Navigation />
        </div>
      </div>
    </header>
  )
}

export { SiteHeader as Header }
