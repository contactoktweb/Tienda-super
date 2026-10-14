'use client'

import { useEffect, useState } from 'react'
import type { Category } from '@/types'
import { categories as defaultCategories, fetchCategories } from '@/data/categories'

// Singleton in-memory cache and promise deduplicator
let cachedCategories: Category[] | null = null
let pendingRequest: Promise<Category[]> | null = null

/**
 * Hook para obtener las categorías sincronizadas en tiempo real con el ERP.
 * Devuelve de inmediato las categorías base por defecto para evitar parpadeos (SSR/CSR),
 * y sincroniza en segundo plano con la API del ERP.
 */
export function useCategories(): {
  categories: Category[]
  loading: boolean
} {
  const [items, setItems] = useState<Category[]>(cachedCategories || defaultCategories)
  const [loading, setLoading] = useState<boolean>(!cachedCategories)

  useEffect(() => {
    let isMounted = true

    // Si ya fueron cacheadas en memoria, utilizarlas directamente
    if (cachedCategories && cachedCategories.length > 0) {
      setItems(cachedCategories)
      setLoading(false)
      return
    }

    // Deduplicación de la petición entre componentes montados en paralelo
    if (!pendingRequest) {
      pendingRequest = fetchCategories()
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            cachedCategories = data
            return data
          }
          cachedCategories = defaultCategories
          return defaultCategories
        })
        .catch((err) => {
          console.warn('[useCategories] Error fetching live categories:', err)
          cachedCategories = defaultCategories
          return defaultCategories
        })
        .finally(() => {
          pendingRequest = null
        })
    }

    pendingRequest.then((data) => {
      if (isMounted) {
        setItems(data)
        setLoading(false)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  return { categories: items, loading }
}
