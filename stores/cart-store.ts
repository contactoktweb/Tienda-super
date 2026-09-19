'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '@/types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (
    product: Product,
    quantity?: number,
    variant?: string,
  ) => void
  removeItem: (productId: string, variant?: string) => void
  updateQuantity: (productId: string, quantity: number, variant?: string) => void
  clear: () => void
  openCart: () => void
  closeCart: () => void
  setOpen: (open: boolean) => void
}

function sameLine(a: CartItem, productId: string, variant?: string) {
  return a.productId === productId && (a.variant ?? '') === (variant ?? '')
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1, variant) =>
        set((state) => {
          const existing = state.items.find((i) =>
            sameLine(i, product.id, variant),
          )
          if (existing) {
            const nextQty = Math.min(
              existing.quantity + quantity,
              product.stock,
            )
            return {
              items: state.items.map((i) =>
                sameLine(i, product.id, variant)
                  ? { ...i, quantity: nextQty }
                  : i,
              ),
            }
          }
          const item: CartItem = {
            productId: product.id,
            slug: product.slug,
            name: product.name,
            image: product.images[0],
            price: product.price,
            unit: product.unit,
            presentation: product.presentation,
            stock: product.stock,
            quantity: Math.min(Math.max(1, quantity), product.stock),
            variant,
          }
          return { items: [...state.items, item] }
        }),

      removeItem: (productId, variant) =>
        set((state) => ({
          items: state.items.filter((i) => !sameLine(i, productId, variant)),
        })),

      updateQuantity: (productId, quantity, variant) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              sameLine(i, productId, variant)
                ? {
                    ...i,
                    quantity: Math.min(Math.max(1, quantity), i.stock),
                  }
                : i,
            )
            .filter((i) => i.quantity > 0),
        })),

      clear: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      setOpen: (open) => set({ isOpen: open }),
    }),
    {
      name: 'super-plus-cart',
      partialize: (state) => ({ items: state.items }),
    },
  ),
)

// ---- Selectores derivados ----
export function selectCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0)
}

export function selectSubtotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0)
}
