import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { categories, getCategoryBySlug } from '@/data/categories'
import { getProductsByCategory } from '@/data/products'
import {
  fetchSuperMasCatalog,
  adaptSuperMasProductToStore,
} from '@/lib/api/catalog'
import { site } from '@/data/site'
import { CategoryView } from '@/components/category/category-view'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
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
  const category = getCategoryBySlug(slug)
  if (!category) notFound()

  let categoryProducts: ReturnType<typeof adaptSuperMasProductToStore>[] = []
  try {
    const apiRes = await fetchSuperMasCatalog({
      category: category.name,
      limit: 100,
    })
    if (apiRes.products.length > 0) {
      categoryProducts = apiRes.products.map(adaptSuperMasProductToStore)
    }
  } catch {
    // ignore
  }

  if (categoryProducts.length === 0) {
    categoryProducts = getProductsByCategory(category.slug)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <CategoryView category={category} initialProducts={categoryProducts} />
    </div>
  )
}

