import type { Metadata } from 'next'
import Link from 'next/link'
import { getCategoryBySlugAsync } from '@/data/categories'
import {
  fetchSuperMasCatalog,
  adaptSuperMasProductToStore,
} from '@/lib/api/catalog'
import { site } from '@/data/site'
import { ProductGrid } from '@/components/product/product-grid'
import { SolarIcon } from '@/components/ui/solar-icon'
import { CatalogUnavailable } from '@/components/catalog/catalog-unavailable'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: `Resultados de Búsqueda | ${site.name}`,
  description: 'Encuentra los productos que necesitas en Super Más.',
}

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categoria?: string }>
}) {
  const params = await searchParams
  const query = (params.q || '').trim()
  const categorySlug = (params.categoria || '').trim()
  const category = categorySlug ? await getCategoryBySlugAsync(categorySlug) : null

  const apiRes = await fetchSuperMasCatalog({
    search: query,
    category: category ? category.name : categorySlug,
    limit: 60,
  })
  const results = apiRes.products.map(adaptSuperMasProductToStore)

  const pageTitle = query
    ? category
      ? `Resultados para “${query}” en ${category.name}`
      : `Resultados para “${query}”`
    : category
      ? `Productos en ${category.name}`
      : 'Búsqueda de Productos'

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-border pb-5">
        <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-primary">
          <SolarIcon icon="solar:magnifier-linear" className="size-3.5" />
          <span>Búsqueda</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl font-heading text-foreground">
          {pageTitle}
        </h1>

        {/* Filtros activos */}
        {(category || query) && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-muted-foreground">Filtros activos:</span>
            {query && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-800">
                <span>Texto: “{query}”</span>
                {categorySlug ? (
                  <Link
                    href={`/buscar?categoria=${encodeURIComponent(categorySlug)}`}
                    className="hover:text-red transition-colors font-bold ml-0.5"
                    aria-label="Quitar filtro de texto"
                  >
                    ×
                  </Link>
                ) : (
                  <Link
                    href="/productos"
                    className="hover:text-red transition-colors font-bold ml-0.5"
                    aria-label="Quitar filtro de texto"
                  >
                    ×
                  </Link>
                )}
              </span>
            )}
            {category && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                <span>Categoría: {category.name}</span>
                {query ? (
                  <Link
                    href={`/buscar?q=${encodeURIComponent(query)}`}
                    className="hover:text-red transition-colors font-bold ml-0.5"
                    aria-label="Quitar filtro de categoría"
                  >
                    ×
                  </Link>
                ) : (
                  <Link
                    href="/productos"
                    className="hover:text-red transition-colors font-bold ml-0.5"
                    aria-label="Quitar filtro de categoría"
                  >
                    ×
                  </Link>
                )}
              </span>
            )}
            <Link
              href="/productos"
              className="text-xs font-semibold text-muted-foreground hover:text-red underline ml-2 transition-colors"
            >
              Limpiar filtros
            </Link>
          </div>
        )}
      </div>

      {/* Results */}
      <div>
        {!apiRes.isLive && (
          <div className="mb-4">
            <CatalogUnavailable />
          </div>
        )}
        <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
          <span>{results.length} {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}</span>
        </div>

        {results.length > 0 ? (
          <ProductGrid products={results} />
        ) : (
          <div className="rounded-lg border border-dashed border-border p-12 text-center space-y-3">
            <p className="text-sm font-bold text-foreground">No encontramos resultados para tu búsqueda</p>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Intenta buscar por palabras clave como &quot;alcanfor&quot;, &quot;silicona&quot;, &quot;aceite&quot;, o explora las categorías.
            </p>
            <div className="pt-2">
              <Link
                href="/productos"
                className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground"
              >
                Ver todo el catálogo
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
