'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SolarIcon } from '@/components/ui/solar-icon'
import { mainNav } from '@/data/nav'
import { useCategories } from '@/hooks/use-categories'
import { whatsappLink } from '@/data/site'
import { cn } from '@/lib/utils'

export function Navigation() {
  const pathname = usePathname()
  const [megaOpen, setMegaOpen] = useState(false)
  const { categories } = useCategories()

  return (
    <nav
      aria-label="Navegación principal"
      className="flex items-center justify-between w-full"
    >
      {/* Left: Button 'TODAS LAS CATEGORÍAS' + Navigation Links */}
      <div className="flex items-center gap-6">
        {/* Categorías Button (Red solid) */}
        <div
          className="relative"
          onMouseEnter={() => setMegaOpen(true)}
          onMouseLeave={() => setMegaOpen(false)}
        >
          <button
            type="button"
            aria-expanded={megaOpen}
            aria-haspopup="true"
            className="flex h-10 items-center gap-2.5 rounded-lg bg-red px-4 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red/90 shadow-xs"
          >
            <SolarIcon icon="solar:hamburger-menu-linear" className="size-4" />
            <span>Todas las categorías</span>
          </button>

          <AnimatePresence>
            {megaOpen ? (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 top-full z-50 w-[32rem] sm:w-[36rem] pt-2"
              >
                <div className="grid grid-cols-2 gap-1.5 rounded-xl border border-slate-200 bg-white p-3 shadow-xl max-h-[75vh] overflow-y-auto">
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/categoria/${c.slug}`}
                      onClick={() => setMegaOpen(false)}
                      className="group flex items-start gap-2.5 rounded-lg p-2.5 transition-colors hover:bg-slate-50"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                        <SolarIcon icon={c.icon} className="size-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-bold text-slate-900 group-hover:text-primary transition-colors">
                          {c.name}
                        </span>
                        <span className="line-clamp-1 text-[10px] text-slate-500">
                          {c.description}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Horizontal Navigation Links */}
        <ul className="flex items-center gap-6">
          {mainNav.map((link) => {
            const active =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href)
            const isOfertas = link.href === '/ofertas'

            return (
              <li key={link.href} className="relative flex items-center">
                <Link
                  href={link.href}
                  className={cn(
                    'relative flex h-10 items-center text-xs font-bold tracking-wide transition-colors',
                    active
                      ? 'text-slate-900 border-b-2 border-red pb-0.5'
                      : 'text-slate-600 hover:text-primary',
                  )}
                >
                  <span>{link.label}</span>
                </Link>

                {/* Hot Badge on Ofertas */}
                {isOfertas ? (
                  <span className="absolute -top-1.5 right-0 translate-x-3 rounded-full bg-red px-1.5 py-0.2 text-[8px] font-extrabold uppercase leading-tight text-white shadow-xs">
                    HOT
                  </span>
                ) : null}
              </li>
            )
          })}
        </ul>
      </div>

      {/* Right: Venta Mayorista / Cotizar por WhatsApp */}
      <div className="hidden items-center gap-2 lg:flex">
        <a
          href={whatsappLink('Hola, deseo solicitar asesoría y cotización para compras al por mayor.')}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 text-right transition-opacity hover:opacity-85"
        >
          <div className="leading-tight">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Venta Mayorista
            </span>
            <span className="block text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
              Cotizar por WhatsApp
            </span>
          </div>
          <div className="flex size-7.5 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-2xs group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <SolarIcon icon="solar:chat-round-dots-linear" className="size-4" />
          </div>
        </a>
      </div>
    </nav>
  )
}
