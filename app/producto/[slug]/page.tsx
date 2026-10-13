import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  fetchSuperMasProductBySlug,
  fetchSuperMasCatalog,
  adaptSuperMasProductToStore,
} from '@/lib/api/catalog'
import { getRelatedProducts, products as localFallbackProducts } from '@/data/products'
import { site } from '@/data/site'
import { ProductDetailView } from '@/components/product/product-detail-view'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const apiProduct = await fetchSuperMasProductBySlug(slug)
  if (!apiProduct) return { title: 'Producto no encontrado' }

  const product = adaptSuperMasProductToStore(apiProduct)

  return {
    title: `${product.name} | ${site.name}`,
    description: product.description,
    openGraph: {
      title: `${product.name} | ${site.name}`,
      description: product.description,
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const apiProduct = await fetchSuperMasProductBySlug(slug)
  if (!apiProduct) notFound()

  const product = adaptSuperMasProductToStore(apiProduct)

  // Fetch related products from category or live platform catalog
  let relatedProducts: ReturnType<typeof adaptSuperMasProductToStore>[] = []
  let isApiLive = false
  try {
    const relatedRes = await fetchSuperMasCatalog({
      category: apiProduct.category,
      limit: 7,
    })
    isApiLive = relatedRes.isLive
    relatedProducts = relatedRes.products
      .filter((p) => p.slug !== slug && p.id !== product.id)
      .slice(0, 6)
      .map(adaptSuperMasProductToStore)

    // If no other products in same category, look for any other live products in the catalog
    if (relatedProducts.length === 0 && isApiLive) {
      const generalRes = await fetchSuperMasCatalog({ limit: 7 })
      relatedProducts = generalRes.products
        .filter((p) => p.slug !== slug && p.id !== product.id)
        .slice(0, 6)
        .map(adaptSuperMasProductToStore)
    }
  } catch {
    // ignore
  }

  // Only fall back to local mock products if API is completely offline
  if (relatedProducts.length === 0 && !isApiLive) {
    relatedProducts = getRelatedProducts(product)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <ProductDetailView product={product} relatedProducts={relatedProducts} />
    </div>
  )
}

