import { NextRequest } from 'next/server'
import { fetchSuperMasCatalog, adaptSuperMasProductToStore } from '@/lib/api/catalog'
import { getCategoryBySlugAsync } from '@/data/categories'

/** Sugerencias del buscador del encabezado, siempre desde el catálogo del ERP. */
export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get('q') || '').trim().slice(0, 80)
  const categorySlug = (request.nextUrl.searchParams.get('categoria') || '').trim()
  if (q.length < 2) {
    return Response.json({ products: [] })
  }

  const category = categorySlug ? await getCategoryBySlugAsync(categorySlug) : undefined
  const { products } = await fetchSuperMasCatalog({
    search: q,
    category: category ? category.name : categorySlug || undefined,
    limit: 6,
  })

  return Response.json(
    { products: products.map(adaptSuperMasProductToStore) },
    { headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60' } },
  )
}
