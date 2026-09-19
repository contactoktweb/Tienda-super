import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getProductBySlug,
  getRelatedProducts,
  products,
} from '@/data/products'
import { site } from '@/data/site'
import { ProductDetailView } from '@/components/product/product-detail-view'

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Producto no encontrado' }

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
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const relatedProducts = getRelatedProducts(product)

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <ProductDetailView product={product} relatedProducts={relatedProducts} />
    </div>
  )
}
