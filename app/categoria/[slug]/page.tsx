import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { categories, getCategoryBySlug, getCategoryBySlugAsync } from '@/data/categories'
import {
  fetchSuperMasCatalog,
  adaptSuperMasProductToStore,
} from '@/lib/api/catalog'
import { site } from '@/data/site'
import { CategoryView } from '@/components/category/category-view'
import { CatalogUnavailable } from '@/components/catalog/catalog-unavailable'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlugAsync(slug)
  if (!category) return { title: 'Categoría no encontrada' }

  return {
    title: `${category.name} | Catálogo ${site.name}`,
    description: category.description,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategoryBySlugAsync(slug)
  if (!category) notFound()

  const apiRes = await fetchSuperMasCatalog({
    category: category.name,
    limit: 100,
  })
  const categoryProducts = apiRes.products.map(adaptSuperMasProductToStore)

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 space-y-4">
      {!apiRes.isLive && <CatalogUnavailable />}
      <CategoryView category={category} initialProducts={categoryProducts} />
    </div>
  )
}

