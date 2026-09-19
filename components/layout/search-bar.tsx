'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SolarIcon } from '@/components/ui/solar-icon'
import { searchProducts } from '@/data/products'
import { categories } from '@/data/categories'
import { formatPrice } from '@/lib/format'
import { cn } from '@/lib/utils'

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [open, setOpen] = useState(false)
  const [composing, setComposing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const suggestions = useMemo(() => {
    if (query.trim().length < 2) return []
    let results = searchProducts(query)
    if (category) results = results.filter((p) => p.category === category)
    return results.slice(0, 6)
  }, [query, category])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  function submit() {
    if (!query.trim() && !category) return
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (category) params.set('categoria', category)
    router.push(`/buscar?${params.toString()}`)
    setOpen(false)
  }

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <div className="flex h-11 w-full items-stretch overflow-hidden rounded-lg border border-slate-300 bg-white transition-all focus-within:border-primary shadow-xs">
        {/* Main Text Input */}
        <div className="relative flex flex-1 items-center">
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            onCompositionStart={() => setComposing(true)}
            onCompositionEnd={() => setComposing(false)}
            onKeyDown={(e) => {
              if (
                e.key === 'Enter' &&
                !composing &&
                !e.nativeEvent.isComposing &&
                e.keyCode !== 229
              ) {
                submit()
              }
            }}
            placeholder="¿Qué producto estás buscando?"
            aria-label="Buscar en el catálogo"
            className="h-full w-full bg-transparent px-4 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none"
          />
          {query ? (
            <button
              type="button"
              aria-label="Limpiar búsqueda"
              onClick={() => {
                setQuery('')
                setOpen(false)
              }}
              className="mr-2 flex size-6 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <SolarIcon icon="solar:close-circle-linear" className="size-4" />
            </button>
          ) : null}
        </div>

        {/* Category selector dropdown (Desktop) */}
        <div className="relative hidden items-center border-l border-slate-200 sm:flex">
          <select
            aria-label="Filtrar por categoría"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-full cursor-pointer appearance-none bg-transparent py-0 pl-3.5 pr-8 text-xs font-medium text-slate-600 outline-none hover:text-slate-900"
          >
            <option value="">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
          <SolarIcon
            icon="solar:alt-arrow-down-linear"
            className="pointer-events-none absolute right-2.5 size-3.5 text-slate-400"
          />
        </div>

        {/* Red Search Button */}
        <button
          type="button"
          onClick={submit}
          aria-label="Buscar"
          className="flex h-full items-center justify-center bg-red px-4.5 text-white transition-colors hover:bg-red/90 active:scale-95"
        >
          <SolarIcon icon="solar:magnifier-linear" className="size-4.5" />
        </button>
      </div>

      {/* Autocomplete suggestions popup */}
      <AnimatePresence>
        {open && suggestions.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
          >
            <div className="p-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-2">
              Sugerencias de productos
            </div>
            <ul className="max-h-[20rem] overflow-y-auto py-1 divide-y divide-slate-100">
              {suggestions.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/producto/${p.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 transition-colors hover:bg-slate-50"
                  >
                    <span className="relative size-9 shrink-0 overflow-hidden rounded border border-slate-200 bg-slate-50">
                      <Image
                        src={p.images[0] || '/placeholder.svg'}
                        alt={p.name}
                        fill
                        sizes="36px"
                        className="object-contain p-1"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-semibold text-slate-900">
                        {p.name}
                      </span>
                      <span className="block text-[11px] capitalize text-slate-500">
                        {p.category.replace(/-/g, ' ')} · {p.presentation}
                      </span>
                    </span>
                    <span className="text-xs font-bold text-primary">
                      {formatPrice(p.price)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={submit}
              className="block w-full border-t border-slate-100 bg-slate-50 px-3 py-2 text-center text-xs font-bold text-primary transition-colors hover:bg-slate-100"
            >
              Ver todos los resultados para “{query}”
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
