'use client'

import { usePathname } from 'next/navigation'
import { Suspense, type ReactNode } from 'react'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { MobileTabBar } from '@/components/layout/mobile-tab-bar'
import { CartDrawer } from '@/components/cart/cart-drawer'

export function StoreShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isDistributor =
    pathname.startsWith('/distribuidora') ||
    pathname.startsWith('/catalogo-distribuidora')

  // En la página privada de distribuidora no se muestra el header ni footer de la tienda
  if (isDistributor) {
    return <>{children}</>
  }

  return (
    <>
      <Suspense fallback={null}>
        <SiteHeader />
      </Suspense>
      <main className="pb-16 lg:pb-0">{children}</main>
      <SiteFooter />
      <MobileTabBar />
      <CartDrawer />
    </>
  )
}
