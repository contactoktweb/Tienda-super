'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SolarIcon } from '@/components/ui/solar-icon'
import { mainNav } from '@/data/nav'
import { categories } from '@/data/categories'
import { site } from '@/data/site'
import { Logo } from '@/components/ui/logo'
import { cn } from '@/lib/utils'

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        aria-label="Abrir menú"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="flex size-10 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-slate-50 lg:hidden"
      >
        <SolarIcon icon="solar:menu-dots-linear" className="size-5" />
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[85%] max-w-sm flex-col bg-background shadow-2xl lg:hidden"
              role="dialog"
              aria-label="Menú de navegación"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
                <Logo height={38} />
                <button
                  type="button"
                  aria-label="Cerrar menú"
                  onClick={() => setOpen(false)}
                  className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground"
                >
                  <SolarIcon icon="solar:close-circle-linear" className="size-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain">
                <nav aria-label="Enlaces principales" className="border-b border-border p-3">
                  <ul className="flex flex-col space-y-1">
                    {mainNav.map((link) => {
                      const active =
                        link.href === '/'
                          ? pathname === '/'
                          : pathname.startsWith(link.href)
                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className={cn(
                              'flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-semibold transition-colors',
                              active
                                ? 'bg-primary text-primary-foreground'
                                : 'text-slate-700 hover:bg-slate-50',
                            )}
                          >
                            <span>{link.label}</span>
                            <SolarIcon
                              icon="solar:alt-arrow-right-linear"
                              className={cn('size-4', active ? 'text-white' : 'text-slate-400')}
                            />
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </nav>

                <div className="p-3">
                  <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Categorías
                  </p>
                  <ul className="flex flex-col space-y-1">
                    {categories.map((c) => (
                      <li key={c.id}>
                        <Link
                          href={`/categoria/${c.slug}`}
                          className="flex items-center gap-3 rounded-md px-3 py-2 text-slate-700 transition-colors hover:bg-slate-50"
                        >
                          <span className="flex size-8 shrink-0 items-center justify-center rounded bg-slate-100 text-primary">
                            <SolarIcon icon={c.icon} className="size-4" />
                          </span>
                          <span className="text-xs font-semibold">{c.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-border p-4 text-xs text-muted-foreground bg-slate-50">
                <p className="font-bold text-foreground">
                  {site.topBar.left}
                </p>
                <p className="mt-0.5">{site.contact.hours}</p>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}
