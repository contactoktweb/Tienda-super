import type { Metadata } from 'next'
import {
  fetchSuperMasCatalog,
  adaptSuperMasProductToStore,
} from '@/lib/api/catalog'
import { CategoryView } from '@/components/category/category-view'

export const metadata: Metadata = {
  title: 'Tienda Online | Catálogo Super Más',
  description:
    'Explora todo el catálogo de Super Más con información completa, precios y disponibilidad en tiempo real.',
}

export const dynamic = 'force-dynamic'

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; orden?: string }>
}) {
  const resolvedParams = await searchParams
  const selectedCategory = resolvedParams.categoria

  const { products: apiProducts } = await fetchSuperMasCatalog({
    category: selectedCategory,
    limit: 100,
  })

  const initialProducts = apiProducts.map(adaptSuperMasProductToStore)

  const tiendaCategory = {
    id: 'cat-tienda',
    slug: 'productos',
    name: 'Nuestra Tienda',
    description:
      'Descubre todas nuestras referencias para el hogar, cuidado personal, belleza y abarrotes al detal y al por mayor.',
    icon: 'solar:widget-2-linear',
  }

  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Tienda' },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <CategoryView
        category={tiendaCategory}
        initialProducts={initialProducts}
        breadcrumbs={breadcrumbs}
      />
    </div>
  )
}

