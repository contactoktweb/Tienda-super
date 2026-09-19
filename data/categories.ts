import type { Category } from '@/types'

export const categories: Category[] = [
  {
    id: 'cat-cuidado-personal',
    slug: 'cuidado-personal',
    name: 'Cuidado personal',
    description:
      'Productos para el cuidado diario del cuerpo y la higiene personal.',
    icon: 'solar:health-linear',
  },
  {
    id: 'cat-belleza',
    slug: 'belleza',
    name: 'Belleza',
    description: 'Cosméticos y productos de cuidado estético.',
    icon: 'solar:cosmetic-linear',
  },
  {
    id: 'cat-manualidades',
    slug: 'manualidades',
    name: 'Manualidades',
    description: 'Materiales para creatividad, arte y proyectos escolares.',
    icon: 'solar:scissors-linear',
  },
  {
    id: 'cat-adhesivos',
    slug: 'adhesivos',
    name: 'Adhesivos',
    description: 'Siliconas, pegantes y soluciones de fijación.',
    icon: 'solar:layers-minimalistic-linear',
  },
  {
    id: 'cat-hogar-limpieza',
    slug: 'hogar-y-limpieza',
    name: 'Hogar y limpieza',
    description: 'Todo para mantener tu hogar y negocio impecables.',
    icon: 'solar:home-2-linear',
  },
  {
    id: 'cat-fiestas',
    slug: 'fiestas',
    name: 'Fiestas',
    description: 'Decoración y artículos para celebraciones.',
    icon: 'solar:confetti-minimalistic-linear',
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}
