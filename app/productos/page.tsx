import type { Metadata } from 'next'
import { products } from '@/data/products'
import { CategoryView } from '@/components/category/category-view'

export const metadata: Metadata = {
  title: 'Tienda Online | Productos al Detal y al por Mayor',
  description:
    'Explora todo el catálogo de Distribuidora Super+. Artículos de cuidado personal, belleza, manualidades, adhesivos y limpieza con precios por mayor.',
}

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; orden?: string }>
}) {
  const resolvedParams = await searchParams
  const selectedCategory = resolvedParams.categoria

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products

  const tiendaCategory = {
    id: 'cat-tienda',
    slug: 'productos',
    name: 'Nuestra Tienda',
    description:
      'Descubre todas nuestras referencias para el hogar, cuidado personal, belleza, manualidades y fijación al detal y al por mayor.',
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
        initialProducts={filteredProducts}
        breadcrumbs={breadcrumbs}
      />
    </div>
  )
}
