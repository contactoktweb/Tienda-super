import type { Metadata } from 'next'
import { getOnSaleProducts } from '@/data/products'
import { site } from '@/data/site'
import { CategoryView } from '@/components/category/category-view'

export const metadata: Metadata = {
  title: `Ofertas y Promociones Especiales | ${site.name}`,
  description:
    'Aprovecha descuentos exclusivos en productos seleccionados para el hogar, cuidado personal, belleza y manualidades.',
}

export default function OfertasPage() {
  const onSaleProducts = getOnSaleProducts()

  const ofertasCategory = {
    id: 'cat-ofertas',
    slug: 'ofertas',
    name: 'Ofertas',
    description:
      'Descubre los mejores precios con descuento por tiempo limitado y tarifas preferenciales por volumen.',
    icon: 'solar:tag-linear',
  }

  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Categorías', href: '/productos' },
    { label: 'Ofertas' },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <CategoryView
        category={ofertasCategory}
        initialProducts={onSaleProducts}
        breadcrumbs={breadcrumbs}
      />
    </div>
  )
}
