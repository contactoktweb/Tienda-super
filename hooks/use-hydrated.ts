'use client'

import { useEffect, useState } from 'react'

/**
 * Devuelve true solo después del primer render en el cliente.
 * Evita mismatches de hidratación cuando se lee estado persistido (carrito).
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  return hydrated
}
