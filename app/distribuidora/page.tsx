import type { Metadata } from 'next'
import {
  fetchDistributorCatalog,
  fetchDistributorCategories,
} from '@/lib/api/catalog'
import { DistributorCatalogView } from '@/components/distributor/distributor-catalog-view'

export const metadata: Metadata = {
  title: {
    absolute: 'Catálogo Distribuidora | Super Más',
  },
  description:
    'Portal de precios mayoristas y cotizaciones directas para distribuidores y aliados comerciales.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export const dynamic = 'force-dynamic'

export default async function DistribuidoraPage() {
  const { products, isLive } = await fetchDistributorCatalog({ limit: 100 })
  const categories = await fetchDistributorCategories()

  return (
    <main className="min-h-screen bg-slate-50/70">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <DistributorCatalogView
          initialProducts={products}
          categories={categories}
          isLive={isLive}
        />
      </div>
    </main>
  )
}

