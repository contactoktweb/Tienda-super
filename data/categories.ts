import type { Category } from '@/types'
import { getApiBaseUrl } from '@/lib/api/config'

/**
 * Normaliza cualquier texto a un slug apto para URL (sin tildes, minúsculas, guiones).
 */
export function slugifyCategory(text: string): string {
  if (!text) return ''
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

/**
 * Detecta si una categoría proviene de tests automatizados sintéticos del ERP.
 */
export function isTestCategory(name: string): boolean {
  if (!name || typeof name !== 'string') return true
  return (
    /\btest-[a-z0-9-]+/i.test(name) ||
    /^categor[ií]a\s+a\s+test-/i.test(name) ||
    /^test\b/i.test(name.trim())
  )
}

/**
 * Metadatos descriptivos e iconos para las categorías oficiales del ERP Super Más.
 */
interface CategoryMeta {
  description: string
  icon: string
}

const CATEGORY_META_MAP: Record<string, CategoryMeta> = {
  'abarrotes-y-despensa': {
    description:
      'Productos esenciales de despensa, salsas, condimentos y abarrotes para el día a día.',
    icon: 'solar:cart-large-minimalistic-linear',
  },
  'aceites-y-grasas': {
    description:
      'Aceites vegetales, de cocina, lubricantes multiusos y grasas comestibles de calidad.',
    icon: 'solar:waterdrops-linear',
  },
  'aseo-del-hogar': {
    description:
      'Detergentes, desinfectantes, ceras y artículos de limpieza para hogar y negocio.',
    icon: 'solar:home-2-linear',
  },
  'bebidas-y-refrescos': {
    description:
      'Refrescos, jugos, aguas y bebidas para refrescar tu día y acompañar tus comidas.',
    icon: 'solar:bottle-linear',
  },
  'cuidado-personal': {
    description:
      'Productos para higiene corporal, cuidado capilar y bienestar personal.',
    icon: 'solar:health-linear',
  },
  'enlatados-y-conservas': {
    description:
      'Atún, sardinas, verduras en conserva y alimentos de larga conservación.',
    icon: 'solar:box-minimalistic-linear',
  },
  'granos-y-cereales': {
    description:
      'Arroz, frijoles, lentejas, avena y cereales seleccionados al mejor precio.',
    icon: 'solar:leaf-linear',
  },
  'lacteos-y-huevos': {
    description:
      'Leches, quesos, mantequillas, yogures y huevos frescos garantizados.',
    icon: 'solar:shop-2-linear',
  },
  'panaderia-y-harinas': {
    description:
      'Harinas, premezclas, panes, galletas y productos de panadería tradicional.',
    icon: 'solar:chef-hat-linear',
  },
  'snacks-y-confiteria': {
    description:
      'Pasabocas, confitería, chocolates, dulces y snacks para compartir.',
    icon: 'solar:stars-minimalistic-linear',
  },
}

/**
 * Resuelve el icono y descripción según el nombre de la categoría.
 */
export function getCategoryMeta(name: string): CategoryMeta {
  const slug = slugifyCategory(name)
  if (CATEGORY_META_MAP[slug]) {
    return CATEGORY_META_MAP[slug]
  }

  // Detección heurística para futuras categorías que agregue el ERP
  const lower = name.toLowerCase()
  let icon = 'solar:widget-2-linear'
  if (/carne|pollo|res|cerdo|pescad/i.test(lower)) icon = 'solar:chef-hat-linear'
  else if (/frut|verdur|legumbr/i.test(lower)) icon = 'solar:leaf-linear'
  else if (/mascot|perr|gat/i.test(lower)) icon = 'solar:heart-linear'
  else if (/ferret|herramien/i.test(lower)) icon = 'solar:box-linear'
  else if (/bebid|jugo|licor|vino|cervez/i.test(lower)) icon = 'solar:bottle-linear'
  else if (/aseo|limpiez/i.test(lower)) icon = 'solar:home-2-linear'
  else if (/dulc|snack|chocolat/i.test(lower)) icon = 'solar:stars-minimalistic-linear'
  else if (/bebe|pañal|infantil/i.test(lower)) icon = 'solar:health-linear'

  return {
    description: `Productos seleccionados de ${name} para tu hogar o negocio.`,
    icon,
  }
}

/**
 * Construye un objeto Category formal a partir del nombre original devuelto por el ERP.
 */
export function formatCategoryFromName(name: string): Category {
  const cleanName = name.trim()
  const slug = slugifyCategory(cleanName)
  const meta = getCategoryMeta(cleanName)

  return {
    id: `cat-${slug}`,
    slug,
    name: cleanName,
    description: meta.description,
    icon: meta.icon,
  }
}

/**
 * Categorías oficiales sincronizadas con el ERP Super Más (fuente de verdad).
 */
export const categories: Category[] = [
  formatCategoryFromName('Abarrotes y Despensa'),
  formatCategoryFromName('Aceites y Grasas'),
  formatCategoryFromName('Aseo del Hogar'),
  formatCategoryFromName('Bebidas y Refrescos'),
  formatCategoryFromName('Cuidado Personal'),
  formatCategoryFromName('Enlatados y Conservas'),
  formatCategoryFromName('Granos y Cereales'),
  formatCategoryFromName('Lácteos y Huevos'),
  formatCategoryFromName('Panadería y Harinas'),
  formatCategoryFromName('Snacks y Confitería'),
]

/**
 * Obtiene una categoría síncrona por su slug o nombre normalizado.
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  if (!slug) return undefined
  const norm = slugifyCategory(slug)
  return categories.find(
    (c) =>
      c.slug === slug ||
      c.slug === norm ||
      slugifyCategory(c.name) === norm ||
      c.name.toLowerCase() === slug.toLowerCase(),
  )
}

/**
 * Obtiene una categoría síncrona por su nombre exacto del ERP.
 */
export function getCategoryByName(name: string): Category | undefined {
  if (!name) return undefined
  const clean = name.trim().toLowerCase()
  return categories.find((c) => c.name.toLowerCase() === clean) || getCategoryBySlug(name)
}

/**
 * Consume en tiempo real las categorías del ERP y las transforma a Category[].
 * Si el ERP falla o está offline, devuelve la lista local sincronizada.
 */
export async function fetchCategories(): Promise<Category[]> {
  const baseUrl = getApiBaseUrl()
  try {
    const fetchOptions: RequestInit = {
      method: 'GET',
      headers: { Accept: 'application/json' },
    }
    if (typeof window === 'undefined') {
      ;(fetchOptions as { next?: { revalidate: number } }).next = { revalidate: 60 }
    }

    const res = await fetch(
      `${baseUrl}/api/public/catalogs/categories?channel=supermas`,
      fetchOptions,
    )

    if (res.ok) {
      const json = await res.json()
      if (json.success && Array.isArray(json.data)) {
        const validNames = json.data.filter((cat: unknown): cat is string =>
          typeof cat === 'string' && cat.trim().length > 0 && !isTestCategory(cat),
        )
        if (validNames.length > 0) {
          return validNames.map(formatCategoryFromName)
        }
      }
    }
  } catch (error) {
    console.warn('[Categories] Error fetching live categories from ERP:', error)
  }

  return categories
}

/**
 * Resuelve una categoría de forma asíncrona: primero en caché/local,
 * y si es una nueva categoría creada recientemente en el ERP, la busca en vivo.
 */
export async function getCategoryBySlugAsync(slug: string): Promise<Category | undefined> {
  const local = getCategoryBySlug(slug)
  if (local) return local

  try {
    const live = await fetchCategories()
    const norm = slugifyCategory(slug)
    const found = live.find(
      (c) =>
        c.slug === slug ||
        c.slug === norm ||
        slugifyCategory(c.name) === norm ||
        c.name.toLowerCase() === slug.toLowerCase(),
    )
    if (found) return found
  } catch {
    // ignore
  }

  return undefined
}
