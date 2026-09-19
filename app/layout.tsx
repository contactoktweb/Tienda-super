import type { Metadata, Viewport } from 'next'
import { Barlow, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Suspense } from 'react'
import { Toaster } from 'sonner'
import { site } from '@/data/site'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { MobileTabBar } from '@/components/layout/mobile-tab-bar'
import { CartDrawer } from '@/components/cart/cart-drawer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-barlow',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Productos al detal y al por mayor`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  generator: 'v0.app',
  keywords: [
    'distribuidora',
    'mayorista',
    'productos para el hogar',
    'cuidado personal',
    'adhesivos',
    'super+',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: site.url,
    title: `${site.name} | Productos al detal y al por mayor`,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | Productos al detal y al por mayor`,
    description: site.description,
  },
  alternates: {
    canonical: site.url,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#2a3480',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${inter.variable} ${barlow.variable}`}>
      <body className="min-h-dvh bg-background font-sans antialiased">
        <Suspense fallback={null}>
          <SiteHeader />
        </Suspense>
        <main className="pb-16 lg:pb-0">{children}</main>
        <SiteFooter />
        <MobileTabBar />
        <CartDrawer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast: 'font-sans',
            },
          }}
        />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
