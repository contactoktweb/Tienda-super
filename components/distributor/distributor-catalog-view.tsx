'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import type { PublicDistributorProduct } from '@/types/catalog'
import { DistributorCard } from './distributor-card'
import { SolarIcon } from '@/components/ui/solar-icon'
import { formatPrice } from '@/lib/format'
import {
  buildDistributorWhatsAppUrl,
  buildDistributorBulkWhatsAppUrl,
} from '@/lib/api/catalog'
import { Logo } from '@/components/ui/logo'
import { cn } from '@/lib/utils'

interface DistributorCatalogViewProps {
  initialProducts: PublicDistributorProduct[]
  categories: string[]
  isLive: boolean
}

interface QuoteItem {
  product: PublicDistributorProduct
  quantity: number
}

export function DistributorCatalogView({
  initialProducts,
  categories,
  isLive,
}: DistributorCatalogViewProps) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc'>('name')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([])
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false)

  // Handle adding product to wholesale quote list
  const handleAddToQuote = (
    product: PublicDistributorProduct,
    quantity: number,
  ) => {
    setQuoteItems((prev) => {
      const idx = prev.findIndex((item) => item.product.id === product.id)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx].quantity = quantity
        return copy
      }
      return [...prev, { product, quantity }]
    })
  }

  const handleRemoveFromQuote = (productId: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const handleUpdateQuoteQty = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromQuote(productId)
      return
    }
    setQuoteItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    )
  }

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    let list = [...initialProducts]

    // Search query
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.brand && p.brand.toLowerCase().includes(q)),
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter(
        (p) =>
          p.category &&
          p.category.toLowerCase() === selectedCategory.toLowerCase(),
      )
    }

    // Stock availability filter
    if (onlyAvailable) {
      list = list.filter((p) => p.availability !== 'OUT_OF_STOCK')
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.distributorPrice - b.distributorPrice
      }
      if (sortBy === 'price-desc') {
        return b.distributorPrice - a.distributorPrice
      }
      return a.name.localeCompare(b.name)
    })

    return list
  }, [initialProducts, search, selectedCategory, onlyAvailable, sortBy])

  // Total estimated quote value
  const totalQuoteAmount = useMemo(() => {
    return quoteItems.reduce(
      (sum, item) => sum + item.product.distributorPrice * item.quantity,
      0,
    )
  }, [quoteItems])

  const totalQuoteUnits = useMemo(() => {
    return quoteItems.reduce((sum, item) => sum + item.quantity, 0)
  }, [quoteItems])

  const handleSendBulkQuote = () => {
    if (quoteItems.length === 0) return
    const url = buildDistributorBulkWhatsAppUrl(quoteItems)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="space-y-6 pb-20 pt-2 sm:pt-4">
      {/* 1. Encabezado minimalista (H1 con Logo) */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-4">
        <div className="flex items-center gap-3">
          <Logo height={36} width={130} />
          <div className="h-6 w-px bg-slate-200" />
          <div>
            <h1 className="font-heading text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">
              Catálogo Distribuidora
            </h1>
            <p className="text-[11px] text-slate-500">
              Precios mayoristas y cotizaciones directas por WhatsApp
            </p>
          </div>
        </div>

        {quoteItems.length > 0 ? (
          <button
            type="button"
            onClick={() => setIsQuoteDrawerOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition-colors hover:bg-emerald-500 active:scale-95 self-start sm:self-auto"
          >
            <SolarIcon icon="solar:clipboard-check-bold" className="size-4" />
            <span>Ver cotización ({quoteItems.length})</span>
          </button>
        ) : null}
      </div>

      {/* 2. Search, Filters and View Toggle Bar */}

      <section
        aria-label="Filtros del catálogo distribuidora"
        className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <SolarIcon
              icon="solar:magnifer-linear"
              className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Buscar por nombre, SKU, marca..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10.5 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-4 text-xs font-medium text-slate-900 placeholder-slate-400 transition-colors focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {search ? (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                Limpiar
              </button>
            ) : null}
          </div>

          {/* Quick Controls: Stock Toggle, Sort, View Mode */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Availability Check */}
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="size-4 rounded text-primary focus:ring-primary"
              />
              <span>Solo disponibles</span>
            </label>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="name">Ordenar: Nombre (A-Z)</option>
              <option value="price-asc">Menor precio mayorista</option>
              <option value="price-desc">Mayor precio mayorista</option>
            </select>

            {/* View Switcher: Grid vs Table */}
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-label="Vista en cuadrícula"
                className={cn(
                  'flex size-8 items-center justify-center rounded-lg transition-colors',
                  viewMode === 'grid'
                    ? 'bg-white text-primary shadow-xs'
                    : 'text-slate-500 hover:text-slate-900',
                )}
              >
                <SolarIcon icon="solar:widget-2-linear" className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                aria-label="Vista en tabla mayorista"
                className={cn(
                  'flex size-8 items-center justify-center rounded-lg transition-colors',
                  viewMode === 'table'
                    ? 'bg-white text-primary shadow-xs'
                    : 'text-slate-500 hover:text-slate-900',
                )}
              >
                <SolarIcon icon="solar:list-check-linear" className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills with Touch Horizontal Scroll */}
        {categories.length > 0 ? (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x touch-pan-x">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={cn(
                  'snap-start shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all',
                  selectedCategory === 'all'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                )}
              >
                Todas las categorías ({initialProducts.length})
              </button>

              {categories.map((cat) => {
                const count = initialProducts.filter(
                  (p) =>
                    p.category &&
                    p.category.toLowerCase() === cat.toLowerCase(),
                ).length
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      'snap-start shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all',
                      selectedCategory.toLowerCase() === cat.toLowerCase()
                        ? 'bg-primary text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                    )}
                  >
                    {cat} ({count})
                  </button>
                )
              })}
            </div>
          </div>
        ) : null}
      </section>

      {/* 3. Products Presentation: Grid or Table */}
      {filteredProducts.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <SolarIcon
            icon="solar:box-minimalistic-linear"
            className="mx-auto size-12 text-slate-400"
          />
          <h2 className="mt-4 text-base font-bold text-slate-800">
            No se encontraron productos en el catálogo
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Prueba ajustando los términos de búsqueda o los filtros de categoría.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch('')
              setSelectedCategory('all')
              setOnlyAvailable(false)
            }}
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white"
          >
            Restablecer filtros
          </button>
        </section>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <section
          aria-label="Listado de productos mayoristas"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {filteredProducts.map((product) => {
            const isQuoted = quoteItems.some(
              (i) => i.product.id === product.id,
            )
            return (
              <DistributorCard
                key={product.id}
                product={product}
                onAddToQuote={handleAddToQuote}
                isQuoted={isQuoted}
              />
            )
          })}
        </section>
      ) : (
        /* COMPACT WHOLESALE TABLE VIEW */
        <section
          aria-label="Tabla de precios mayoristas"
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="py-3.5 pl-4 pr-3">Producto</th>
                  <th className="px-3 py-3.5">SKU</th>
                  <th className="px-3 py-3.5">Categoría</th>
                  <th className="px-3 py-3.5">Estado</th>
                  <th className="px-3 py-3.5">Precio Mayorista</th>
                  <th className="px-3 py-3.5 text-center">Cantidad</th>
                  <th className="py-3.5 pl-3 pr-4 text-right">Acción WhatsApp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((product) => {
                  const isOutOfStock = product.availability === 'OUT_OF_STOCK'
                  const quoteEntry = quoteItems.find(
                    (i) => i.product.id === product.id,
                  )
                  const currentQty = quoteEntry ? quoteEntry.quantity : 1

                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      {/* Product Thumbnail & Name */}
                      <td className="py-3 pl-4 pr-3">
                        <div className="flex items-center gap-3">
                          <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
                            <Image
                              src={
                                product.images?.[0] ||
                                product.imageUrl ||
                                '/placeholder.svg'
                              }
                              alt={product.name}
                              fill
                              sizes="48px"
                              className="object-contain p-1"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block line-clamp-1">
                              {product.name}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {product.unitOfMeasure || 'Unidad'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="px-3 py-3 font-mono font-medium text-slate-600">
                        {product.sku}
                      </td>

                      {/* Category */}
                      <td className="px-3 py-3 text-slate-600">
                        {product.category || 'General'}
                      </td>

                      {/* Status */}
                      <td className="px-3 py-3">
                        <span
                          className={cn(
                            'inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white',
                            product.availability === 'AVAILABLE' &&
                              'bg-emerald-600',
                            product.availability === 'LOW_STOCK' &&
                              'bg-amber-600',
                            product.availability === 'OUT_OF_STOCK' &&
                              'bg-rose-600',
                          )}
                        >
                          {product.availabilityLabel}
                        </span>
                      </td>

                      {/* Distributor Price */}
                      <td className="px-3 py-3 font-heading font-black text-slate-900 text-sm">
                        {formatPrice(product.distributorPrice)}
                      </td>

                      {/* Quantity Input */}
                      <td className="px-3 py-3 text-center">
                        <input
                          type="number"
                          min={1}
                          defaultValue={currentQty}
                          disabled={isOutOfStock}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10)
                            if (!isNaN(val) && val >= 1) {
                              handleAddToQuote(product, val)
                            }
                          }}
                          className="w-14 rounded-lg border border-slate-200 px-2 py-1 text-center font-bold text-slate-800 disabled:opacity-40"
                        />
                      </td>

                      {/* WhatsApp Buttons */}
                      <td className="py-3 pl-3 pr-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              const url = buildDistributorWhatsAppUrl(
                                product,
                                currentQty,
                              )
                              window.open(url, '_blank', 'noopener,noreferrer')
                            }}
                            disabled={isOutOfStock}
                            className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-emerald-600 px-2.5 text-[11px] font-bold uppercase tracking-wider text-white hover:bg-emerald-700 active:scale-95 disabled:opacity-40 shadow-2xs"
                          >
                            <SolarIcon
                              icon="solar:chat-round-dots-linear"
                              className="size-3.5"
                            />
                            <span>Pedir</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* 4. Sticky Floating Bar for Multi-Item Wholesale Quotes */}
      <AnimatePresence>
        {quoteItems.length > 0 ? (
          <motion.aside
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-4xl"
          >
            <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-[#0c1427]/95 p-4 text-white shadow-2xl backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <SolarIcon
                    icon="solar:clipboard-check-bold"
                    className="size-5"
                  />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">
                    {quoteItems.length} referencias seleccionadas ({totalQuoteUnits} unidades)
                  </span>
                  <span className="block text-xs text-slate-300">
                    Total Estimado Mayorista:{' '}
                    <strong className="text-emerald-400 font-extrabold text-sm">
                      {formatPrice(totalQuoteAmount)}
                    </strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsQuoteDrawerOpen(true)}
                  className="rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-slate-700"
                >
                  Ver listado
                </button>

                <button
                  type="button"
                  onClick={handleSendBulkQuote}
                  className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-colors hover:bg-emerald-500 active:scale-95"
                >
                  <SolarIcon
                    icon="solar:chat-round-dots-linear"
                    className="size-4"
                  />
                  <span>Enviar Cotización a WhatsApp</span>
                </button>
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      {/* 5. Modal / Drawer for Reviewing Quote List */}
      <AnimatePresence>
        {isQuoteDrawerOpen ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuoteDrawerOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <SolarIcon
                    icon="solar:clipboard-text-linear"
                    className="size-5 text-emerald-600"
                  />
                  <h2 className="text-lg font-bold text-slate-900">
                    Lista de Cotización Mayorista ({quoteItems.length})
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsQuoteDrawerOpen(false)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <SolarIcon icon="solar:close-circle-linear" className="size-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="mt-4 max-h-[60vh] space-y-3 overflow-y-auto pr-1">
                {quoteItems.length === 0 ? (
                  <p className="py-8 text-center text-xs text-slate-400">
                    No has agregado productos a tu cotización mayorista.
                  </p>
                ) : (
                  quoteItems.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative size-12 shrink-0 rounded-lg bg-white border border-slate-200">
                          <Image
                            src={
                              product.images?.[0] ||
                              product.imageUrl ||
                              '/placeholder.svg'
                            }
                            alt={product.name}
                            fill
                            sizes="48px"
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-xs font-bold text-slate-900 truncate">
                            {product.name}
                          </h3>
                          <span className="text-[10px] font-mono text-slate-500">
                            SKU: {product.sku} | Unit:{' '}
                            {formatPrice(product.distributorPrice)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {/* Qty Selector */}
                        <div className="flex items-center rounded-lg border border-slate-200 bg-white">
                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateQuoteQty(product.id, quantity - 1)
                            }
                            className="size-7 text-xs font-bold text-slate-600 hover:bg-slate-100"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-slate-800">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateQuoteQty(product.id, quantity + 1)
                            }
                            className="size-7 text-xs font-bold text-slate-600 hover:bg-slate-100"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-extrabold text-slate-900 min-w-[70px] text-right font-heading">
                          {formatPrice(product.distributorPrice * quantity)}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleRemoveFromQuote(product.id)}
                          aria-label="Quitar producto"
                          className="text-slate-400 hover:text-rose-600"
                        >
                          <SolarIcon
                            icon="solar:trash-bin-trash-linear"
                            className="size-4"
                          />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Total & Action Footer */}
              <div className="mt-5 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Total Estimado Mayorista:
                  </span>
                  <span className="text-xl font-black text-slate-900 font-heading">
                    {formatPrice(totalQuoteAmount)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuoteItems([])}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Vaciar lista
                  </button>

                  <button
                    type="button"
                    onClick={handleSendBulkQuote}
                    disabled={quoteItems.length === 0}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-emerald-500 active:scale-95 disabled:opacity-40"
                  >
                    <SolarIcon
                      icon="solar:chat-round-dots-linear"
                      className="size-4"
                    />
                    <span>Enviar Pedido Consolidado a WhatsApp</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Footer minimalista de créditos */}
      <footer className="mt-16 border-t border-slate-200/80 pt-6 pb-4 text-center text-xs text-slate-500">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p>© {new Date().getFullYear()} Distribuidora Super+. Todos los derechos reservados.</p>
          <p>
            <a
              href="https://www.kytcode.lat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              <span>Desarrollado por K&T</span>
              <span className="text-black text-sm leading-none" aria-hidden="true">♥</span>
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

