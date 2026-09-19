import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { categories, getCategoryBySlug } from '@/data/categories'
import { getProductsByCategory } from '@/data/products'
import { site } from '@/data/site'
import { CategoryView } from '@/components/category/category-view'

export async function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.slug,
  }))
}

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

  const products = getProductsByCategory(category.slug)

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <CategoryView category={category} initialProducts={products} />
    </div>
  )
}
