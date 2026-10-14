'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import type { Category, Product } from '@/types'
import { useCategories } from '@/hooks/use-categories'
import { ProductCard } from '@/components/product/product-card'
import { SolarIcon } from '@/components/ui/solar-icon'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface CategoryViewProps {
  category: Category
  initialProducts: Product[]
  breadcrumbs?: BreadcrumbItem[]
}

export function CategoryView({
  category,
  initialProducts,
  breadcrumbs,
}: CategoryViewProps) {
  const { categories } = useCategories()
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(100000)
  const [selectedRange, setSelectedRange] = useState<string | null>(null)
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [onlyOnSale, setOnlyOnSale] = useState(false)
  const [onlyWholesale, setOnlyWholesale] = useState(false)
  const [sortBy, setSortBy] = useState<'best' | 'price-asc' | 'price-desc' | 'name'>('best')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Quick price ranges
  function handleRangeSelect(range: string) {
    if (selectedRange === range) {
      setSelectedRange(null)
      setMinPrice(0)
      setMaxPrice(100000)
      return
    }
    setSelectedRange(range)
    if (range === 'r1') {
      setMinPrice(0)
      setMaxPrice(10000)
    } else if (range === 'r2') {
      setMinPrice(10000)
      setMaxPrice(20000)
    } else if (range === 'r3') {
      setMinPrice(20000)
      setMaxPrice(50000)
    } else if (range === 'r4') {
      setMinPrice(50000)
      setMaxPrice(100000)
    }
  }

  function handleClearFilters() {
    setMinPrice(0)
    setMaxPrice(100000)
    setSelectedRange(null)
    setOnlyInStock(false)
    setOnlyOnSale(false)
    setOnlyWholesale(false)
    setSortBy('best')
  }

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (minPrice > 0 || maxPrice < 100000) count++
    if (onlyInStock) count++
    if (onlyOnSale) count++
    if (onlyWholesale) count++
    return count
  }, [minPrice, maxPrice, onlyInStock, onlyOnSale, onlyWholesale])

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts]

    // Price range
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice)

    // Stock
    if (onlyInStock) {
      result = result.filter((p) => p.stock > 0)
    }

    // On sale
    if (onlyOnSale) {
      result = result.filter((p) => p.onSale)
    }

    // Wholesale
    if (onlyWholesale) {
      result = result.filter((p) => Boolean(p.wholesalePrice))
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'best') {
      result.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0))
    }

    return result
  }, [initialProducts, minPrice, maxPrice, onlyInStock, onlyOnSale, onlyWholesale, sortBy])

  // Count metrics for filters
  const countInStock = useMemo(() => initialProducts.filter((p) => p.stock > 0).length, [initialProducts])
  const countOnSale = useMemo(() => initialProducts.filter((p) => p.onSale).length, [initialProducts])
  const countWholesale = useMemo(() => initialProducts.filter((p) => Boolean(p.wholesalePrice)).length, [initialProducts])

  // Effective breadcrumb items
  const effectiveBreadcrumbs: BreadcrumbItem[] = breadcrumbs || [
    { label: 'Inicio', href: '/' },
    { label: 'Categorías', href: '/productos' },
    { label: category.name },
  ]

  // Reusable Filter Content (for both desktop sidebar and mobile drawer)
  const filterControls = (
    <div className="space-y-6">
      {/* Categorías List */}
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
          Categorías
        </h3>
        <ul className="space-y-2 text-xs">
          {categories.map((c) => {
            const isActive = c.slug === category.slug
            return (
              <li key={c.id}>
                <Link
                  href={`/categoria/${c.slug}`}
                  onClick={() => setMobileFiltersOpen(false)}
                  className={cn(
                    'block transition-colors',
                    isActive
                      ? 'border-l-2 border-red pl-2.5 font-bold text-red'
                      : 'text-slate-600 hover:text-primary pl-2.5',
                  )}
                >
                  {c.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Precio Filter */}
      <div className="space-y-3.5 pb-6 border-b border-slate-200">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
          Precio
        </h3>

        {/* Input range boxes */}
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 shadow-xs">
            <span className="text-slate-400 mr-1">$</span>
            <input
              type="number"
              aria-label="Precio mínimo"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
              className="w-full bg-transparent font-medium outline-none"
              min={0}
              max={maxPrice}
            />
          </div>
          <span className="text-slate-400 text-xs">-</span>
          <div className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 shadow-xs">
            <span className="text-slate-400 mr-1">$</span>
            <input
              type="number"
              aria-label="Precio máximo"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value) || 100000)}
              className="w-full bg-transparent font-medium outline-none"
              min={minPrice}
              max={200000}
            />
          </div>
        </div>

        {/* Range Slider Track */}
        <div className="pt-2">
          <input
            type="range"
            aria-label="Rango de precio máximo"
            min={0}
            max={100000}
            step={1000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-red"
          />
        </div>

        {/* Radio / Quick Range Buttons */}
        <div className="space-y-2 pt-1 text-xs text-slate-600">
          <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
            <input
              type="radio"
              name="priceRange"
              checked={selectedRange === 'r1'}
              onChange={() => handleRangeSelect('r1')}
              className="size-3.5 accent-red"
            />
            <span>Hasta $10.000</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
            <input
              type="radio"
              name="priceRange"
              checked={selectedRange === 'r2'}
              onChange={() => handleRangeSelect('r2')}
              className="size-3.5 accent-red"
            />
            <span>$10.000 - $20.000</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
            <input
              type="radio"
              name="priceRange"
              checked={selectedRange === 'r3'}
              onChange={() => handleRangeSelect('r3')}
              className="size-3.5 accent-red"
            />
            <span>$20.000 - $50.000</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
            <input
              type="radio"
              name="priceRange"
              checked={selectedRange === 'r4'}
              onChange={() => handleRangeSelect('r4')}
              className="size-3.5 accent-red"
            />
            <span>Más de $50.000</span>
          </label>
        </div>
      </div>

      {/* Disponibilidad */}
      <div className="space-y-2.5 pb-6 border-b border-slate-200">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
          Disponibilidad
        </h3>
        <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer hover:text-slate-900">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="size-4 rounded border-slate-300 accent-red"
          />
          <span>En existencia ({countInStock})</span>
        </label>
      </div>

      {/* Ofertas */}
      <div className="space-y-2.5 pb-6 border-b border-slate-200">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
          Ofertas
        </h3>
        <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer hover:text-slate-900">
          <input
            type="checkbox"
            checked={onlyOnSale}
            onChange={(e) => setOnlyOnSale(e.target.checked)}
            className="size-4 rounded border-slate-300 accent-red"
          />
          <span>En promoción ({countOnSale})</span>
        </label>
      </div>

      {/* Mayorista */}
      <div className="space-y-2.5 pb-6 border-b border-slate-200">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
          Mayorista
        </h3>
        <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer hover:text-slate-900">
          <input
            type="checkbox"
            checked={onlyWholesale}
            onChange={(e) => setOnlyWholesale(e.target.checked)}
            className="size-4 rounded border-slate-300 accent-red"
          />
          <span>Solo mayorista ({countWholesale})</span>
        </label>
      </div>

      {/* Limpiar Filtros Button */}
      <div>
        <button
          type="button"
          onClick={handleClearFilters}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-2.5 text-xs font-bold text-slate-700 shadow-xs transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          <SolarIcon icon="solar:restart-linear" className="size-4" />
          <span>Limpiar filtros</span>
        </button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* 1. Dynamic Breadcrumbs */}
      <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-xs text-slate-500">
        {effectiveBreadcrumbs.map((item, idx) => {
          const isLast = idx === effectiveBreadcrumbs.length - 1
          return (
            <span key={idx} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-primary transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className={cn(isLast ? 'font-bold text-slate-900' : 'text-slate-500')}>
                  {item.label}
                </span>
              )}
              {!isLast ? <span>/</span> : null}
            </span>
          )
        })}
      </nav>

      {/* 2. Category Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-r from-slate-50 via-slate-50 to-slate-100 p-6 sm:p-10 lg:p-12 shadow-xs min-h-[220px] flex items-center">
        {/* Background decorative curved shape */}
        <div className="pointer-events-none absolute -bottom-24 -right-16 size-80 sm:size-96 rounded-full bg-red opacity-90" />
        <div className="pointer-events-none absolute -bottom-20 right-32 size-60 rounded-full bg-primary opacity-90" />

        {/* Dots pattern */}
        <div className="pointer-events-none absolute right-6 top-6 grid grid-cols-4 gap-2 opacity-20 hidden sm:grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="size-1.5 rounded-full bg-slate-900" />
          ))}
        </div>

        <div className="relative z-10 grid grid-cols-1 items-center gap-6 sm:grid-cols-12 w-full">
          {/* Left Text */}
          <div className="sm:col-span-7 space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Right Visual Image Composition */}
          <div className="relative sm:col-span-5 flex items-center justify-center sm:justify-end h-44 sm:h-52">
            <div className="relative h-full w-full max-w-sm">
              <Image
                src="/hero-products.png"
                alt={category.name}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 35vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Section: Desktop Sidebar + Product Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 pt-2">
        {/* Desktop Sidebar (hidden on mobile) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          {filterControls}
        </aside>

        {/* Right Content (Toolbar + Product Grid) */}
        <main className="lg:col-span-9 space-y-5">
          {/* Toolbar: Filter Trigger (Mobile) + Counter + Sort + View Mode */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-xs transition-colors hover:bg-slate-50 active:scale-95 lg:hidden"
              >
                <SolarIcon icon="solar:tuning-2-linear" className="size-4 text-primary" />
                <span>Filtros</span>
                {activeFiltersCount > 0 && (
                  <span className="flex size-4.5 items-center justify-center rounded-full bg-red text-[10px] font-extrabold text-white">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <span className="text-xs font-semibold text-slate-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Sort selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 hidden sm:inline">Ordenar por:</span>
                <select
                  aria-label="Ordenar productos"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 shadow-xs outline-none focus:border-primary"
                >
                  <option value="best">Más vendidos</option>
                  <option value="price-asc">Menor precio</option>
                  <option value="price-desc">Mayor precio</option>
                  <option value="name">Nombre (A-Z)</option>
                </select>
              </div>

              {/* View mode toggle */}
              <div className="flex items-center rounded-lg border border-slate-300 bg-white p-0.5 shadow-xs">
                <button
                  type="button"
                  aria-label="Vista en cuadrícula"
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'flex size-7 items-center justify-center rounded-md transition-colors',
                    viewMode === 'grid'
                      ? 'bg-red text-white'
                      : 'text-slate-400 hover:text-slate-700',
                  )}
                >
                  <SolarIcon icon="solar:widget-2-linear" className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Vista en lista"
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'flex size-7 items-center justify-center rounded-md transition-colors',
                    viewMode === 'list'
                      ? 'bg-red text-white'
                      : 'text-slate-400 hover:text-slate-700',
                  )}
                >
                  <SolarIcon icon="solar:list-linear" className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div
              className={cn(
                'grid gap-3 sm:gap-4',
                viewMode === 'grid'
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'
                  : 'grid-cols-1',
              )}
            >
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-3">
              <p className="text-sm font-bold text-slate-800">
                No encontramos productos con los filtros seleccionados
              </p>
              <p className="text-xs text-slate-500">
                Prueba ajustando los filtros de precio o disponibilidad.
              </p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-2 inline-flex items-center rounded-xl bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-white"
              >
                Restablecer filtros
              </button>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-center gap-1.5 pt-8">
            <button
              type="button"
              aria-label="Página anterior"
              disabled
              className="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 disabled:opacity-40"
            >
              <SolarIcon icon="solar:alt-arrow-left-linear" className="size-3.5" />
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg bg-red text-xs font-bold text-white shadow-xs"
            >
              1
            </button>
            <button
              type="button"
              aria-label="Página siguiente"
              disabled
              className="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 disabled:opacity-40"
            >
              <SolarIcon icon="solar:alt-arrow-right-linear" className="size-3.5" />
            </button>
          </div>
        </main>
      </div>

      {/* 4. Mobile Filters Slide-Over Drawer Modal */}
      <AnimatePresence>
        {mobileFiltersOpen ? (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs lg:hidden"
            />

            {/* Slide-over Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed inset-y-0 left-0 z-50 flex w-full max-w-xs flex-col bg-white shadow-2xl lg:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  <SolarIcon icon="solar:tuning-2-linear" className="size-5 text-primary" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    Filtros
                  </h2>
                  {activeFiltersCount > 0 && (
                    <span className="flex size-4.5 items-center justify-center rounded-full bg-red text-[10px] font-extrabold text-white">
                      {activeFiltersCount}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  aria-label="Cerrar filtros"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <SolarIcon icon="solar:close-square-linear" className="size-5" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-5">
                {filterControls}
              </div>

              {/* Drawer Footer Actions */}
              <div className="border-t border-slate-200 p-4 bg-slate-50 space-y-2">
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex w-full h-11 items-center justify-center rounded-xl bg-red text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-red/90"
                >
                  Ver {filteredProducts.length} productos
                </button>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      {/* 5. Bottom Value Props Banner */}
      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:px-4 first:pt-0 first:px-0">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-primary">
              <SolarIcon icon="solar:delivery-linear" className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Envíos rápidos</h4>
              <p className="text-[11px] text-slate-500">A todo Colombia</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:px-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-primary">
              <SolarIcon icon="solar:shield-minimalistic-linear" className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Compras seguras</h4>
              <p className="text-[11px] text-slate-500">Productos 100% originales</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:px-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-primary">
              <SolarIcon icon="solar:tag-linear" className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Precios mayoristas</h4>
              <p className="text-[11px] text-slate-500">Descuentos por volumen</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:px-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-primary">
              <SolarIcon icon="solar:chat-round-dots-linear" className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Atención personalizada</h4>
              <p className="text-[11px] text-slate-500">WhatsApp y teléfono</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
