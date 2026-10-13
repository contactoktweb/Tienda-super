import type { Metadata } from 'next'
import { getOnSaleProducts } from '@/data/products'
import {
  fetchSuperMasCatalog,
  adaptSuperMasProductToStore,
} from '@/lib/api/catalog'
import { site } from '@/data/site'
import { CategoryView } from '@/components/category/category-view'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: `Ofertas y Promociones Especiales | ${site.name}`,
  description:
    'Aprovecha descuentos exclusivos en productos seleccionados para el hogar, cuidado personal, belleza y abarrotes.',
}

export default async function OfertasPage() {
  let onSaleProducts: ReturnType<typeof adaptSuperMasProductToStore>[] = []
  let isApiLive = false
  try {
    const apiRes = await fetchSuperMasCatalog({ limit: 100 })
    isApiLive = apiRes.isLive
    const storeMapped = apiRes.products.map(adaptSuperMasProductToStore)
    const discounted = storeMapped.filter(
      (p) => p.onSale || (p.previousPrice && p.previousPrice > p.price),
    )
    onSaleProducts = discounted.length > 0 ? discounted : storeMapped
  } catch {
    // ignore
  }

  // Only fall back to local mock data if the API is offline
  if (onSaleProducts.length === 0 && !isApiLive) {
    onSaleProducts = getOnSaleProducts()
  }


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
