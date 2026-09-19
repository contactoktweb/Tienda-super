import type { Metadata } from 'next'
import Link from 'next/link'
import { searchProducts, products } from '@/data/products'
import { getCategoryBySlug } from '@/data/categories'
import { site } from '@/data/site'
import { ProductGrid } from '@/components/product/product-grid'
import { SolarIcon } from '@/components/ui/solar-icon'

export const metadata: Metadata = {
  title: `Resultados de Búsqueda | ${site.name}`,
  description: 'Encuentra los productos que necesitas en Distribuidora Super+.',
}

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categoria?: string }>
}) {
  const params = await searchParams
  const query = params.q || ''
  const categorySlug = params.categoria || ''

  let results = query ? searchProducts(query) : products
  if (categorySlug) {
    results = results.filter((p) => p.category === categorySlug)
  }

  const category = categorySlug ? getCategoryBySlug(categorySlug) : null

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1.5 border-b border-border pb-5">
        <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-primary">
          <SolarIcon icon="solar:magnifier-linear" className="size-3.5" />
          <span>Búsqueda</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl font-heading text-foreground">
          {query ? `Resultados para “${query}”` : 'Búsqueda de Productos'}
        </h1>
        {category && (
          <p className="text-xs text-muted-foreground">
            Filtrado por: <span className="font-bold text-foreground">{category.name}</span>
          </p>
        )}
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
          <span>{results.length} resultados encontrados</span>
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
