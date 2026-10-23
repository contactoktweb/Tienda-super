import Image from 'next/image'
import Link from 'next/link'
import { site, whatsappLink } from '@/data/site'
import { categories as defaultCategories, fetchCategories } from '@/data/categories'
import {
  fetchSuperMasCatalog,
  adaptSuperMasProductToStore,
} from '@/lib/api/catalog'
import { ProductCarousel } from '@/components/product/product-carousel'
import { CatalogUnavailable } from '@/components/catalog/catalog-unavailable'
import { SectionHeading } from '@/components/ui/section-heading'
import { SolarIcon } from '@/components/ui/solar-icon'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [{ products: apiProducts, isLive }, categoriesList] = await Promise.all([
    fetchSuperMasCatalog({ limit: 50 }),
    fetchCategories(),
  ])
  const storeProducts = apiProducts.map(adaptSuperMasProductToStore)

  // 1. Ofertas y Promociones: productos de la plataforma en vivo
  const discounted = storeProducts.filter(
    (p) => p.onSale || (p.previousPrice && p.previousPrice > p.price),
  )
  const onSaleProducts = discounted.length > 0 ? discounted : storeProducts

  // 2. Los Más Vendidos: si hay más de 1 producto en la plataforma o destacados
  const bestSellerList = storeProducts.filter((p) => p.bestSeller)
  const bestSellers =
    bestSellerList.length > 0 ? bestSellerList : storeProducts.length > 1 ? storeProducts.slice(1) : []

  // 3. Nuevos Ingresos
  const newList = storeProducts.filter((p) => p.isNew)
  const newProducts = newList.length > 0 ? newList : storeProducts.length > 2 ? storeProducts.slice(2) : []


  return (
    <div className="flex flex-col gap-10 pb-16 sm:gap-14 sm:pb-24 pt-4 sm:pt-6">
      {/* 1. HERO COMPOSITION */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
          {/* Main Hero Card */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-primary text-primary-foreground p-6 sm:p-10 lg:col-span-8 min-h-[380px] sm:min-h-[430px]">
            {/* Background pattern */}
            <div className="pointer-events-none absolute right-1/3 top-6 grid grid-cols-6 gap-2 opacity-15">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="size-1.5 rounded-full bg-white" />
              ))}
            </div>

            {/* Red circular base accent */}
            <div className="pointer-events-none absolute -bottom-16 -right-10 size-72 sm:size-96 rounded-full bg-red opacity-90" />

            <div className="relative z-10 grid grid-cols-1 items-center gap-6 sm:grid-cols-12">
              <div className="space-y-4 sm:col-span-7">
                <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl xl:text-5xl font-heading leading-tight text-white">
                  Todo lo que necesitas en un solo lugar
                </h1>

                <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed max-w-md">
                  Productos para hogar, cuidado personal y más
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/productos"
                    className="inline-flex h-10 items-center justify-center rounded-lg bg-red px-5 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-colors hover:bg-red/90 active:scale-95"
                  >
                    Ver productos
                  </Link>

                  <Link
                    href="/ofertas"
                    className="inline-flex h-10 items-center justify-center rounded-lg border border-white/40 bg-transparent px-5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10 active:scale-95"
                  >
                    Ver ofertas
                  </Link>
                </div>
              </div>

              <div className="relative flex items-center justify-center sm:col-span-5 aspect-square sm:aspect-auto sm:h-72">
                <Image
                  src="/hero-products.png"
                  alt="Productos de Super Más"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 35vw"
                />
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-1.5 pt-4 sm:pt-0">
              <span className="size-2 rounded-full bg-white" />
              <span className="size-2 rounded-full bg-white/40" />
              <span className="size-2 rounded-full bg-white/40" />
              <span className="size-2 rounded-full bg-white/40" />
            </div>
          </div>

          {/* Right Column: 2 Promo Banners */}
          <div className="flex flex-col gap-4 lg:col-span-4 lg:gap-5">
            <div className="relative flex-1 overflow-hidden rounded-2xl bg-primary text-primary-foreground p-5 sm:p-6 flex items-center justify-between min-h-[190px]">
              <div className="relative z-10 space-y-1.5 max-w-[62%]">
                <h2 className="text-lg sm:text-xl font-bold font-heading text-white leading-tight">
                  Precios al por mayor
                </h2>
                <p className="text-xs text-slate-200 leading-snug">
                  Mejores precios por volumen para tu negocio.
                </p>
                <div className="pt-2">
                  <Link
                    href="/productos"
                    className="inline-flex h-8 items-center justify-center rounded-lg bg-white px-4 text-xs font-bold text-primary transition-colors hover:bg-slate-100 active:scale-95"
                  >
                    Ver catálogo
                  </Link>
                </div>
              </div>

              <div className="relative size-28 sm:size-32 shrink-0">
                <Image
                  src="/wholesale-boxes.png"
                  alt="Precios al por mayor"
                  fill
                  className="object-contain"
                  sizes="140px"
                />
              </div>
            </div>

            <div className="relative flex-1 overflow-hidden rounded-2xl bg-red text-white p-5 sm:p-6 flex items-center justify-between min-h-[190px]">
              <div className="relative z-10 space-y-1.5 max-w-[62%]">
                <h2 className="text-lg sm:text-xl font-bold font-heading text-white leading-tight">
                  Promociones destacadas
                </h2>
                <p className="text-xs text-red-100 leading-snug">
                  Descuentos especiales todos los días.
                </p>
                <div className="pt-2">
                  <Link
                    href="/ofertas"
                    className="inline-flex h-8 items-center justify-center rounded-lg bg-white px-4 text-xs font-bold text-red transition-colors hover:bg-slate-100 active:scale-95"
                  >
                    Ver ofertas
                  </Link>
                </div>
              </div>

              <div className="relative size-28 sm:size-32 shrink-0 flex items-center justify-center">
                <span className="absolute top-1 right-2 text-2xl font-extrabold text-white/30">%</span>
                <span className="absolute bottom-1 left-2 text-2xl font-extrabold text-white/30">%</span>
                <div className="flex size-20 items-center justify-center rounded-full bg-white/15 border border-white/30 shadow-inner">
                  <SolarIcon icon="solar:tag-linear" className="size-10 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPS */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start gap-3.5 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-primary">
              <SolarIcon icon="solar:delivery-linear" className="size-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Envíos Nacionales</h3>
              <p className="mt-0.5 text-[11px] text-slate-500">Despachos rápidos y seguros a todo el país.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-red">
              <SolarIcon icon="solar:tag-linear" className="size-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Precios Mayoristas</h3>
              <p className="mt-0.5 text-[11px] text-slate-500">Descuentos escalonados a partir de docenas.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-emerald-600">
              <SolarIcon icon="solar:chat-round-dots-linear" className="size-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Atención WhatsApp</h3>
              <p className="mt-0.5 text-[11px] text-slate-500">Asesoría directa y confirmación en minutos.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-amber-600">
              <SolarIcon icon="solar:shield-minimalistic-linear" className="size-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Calidad Garantizada</h3>
              <p className="mt-0.5 text-[11px] text-slate-500">Productos originales con stock disponible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORÍAS */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Categorías Destacadas"
          subtitle="Encuentra artículos seleccionados para tu hogar o negocio"
          href="/productos"
          linkLabel="Ver todo"
        />

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {categoriesList.map((c) => (
            <Link
              key={c.id}
              href={`/categoria/${c.slug}`}
              className="group flex flex-col items-center rounded-xl border border-slate-200 bg-white p-4 text-center shadow-xs transition-all hover:border-primary/50 hover:shadow-sm"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-slate-100 text-primary transition-colors group-hover:bg-primary group-hover:text-white mb-2.5">
                <SolarIcon icon={c.icon} className="size-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors">
                {c.name}
              </h3>
              <span className="mt-0.5 text-[10px] text-slate-500 line-clamp-1">
                {c.description}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. OFERTAS IMPERDIBLES (Product Carousel) */}
      {!isLive && (
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <CatalogUnavailable />
        </section>
      )}

      {onSaleProducts.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Ofertas y Promociones"
            subtitle="Precios especiales y descuentos por tiempo limitado"
            href="/ofertas"
            linkLabel="Ver ofertas"
          />
          <div className="mt-5">
            <ProductCarousel products={onSaleProducts} />
          </div>
        </section>
      )}

      {/* 5. BANNER VENTA MAYORISTA */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-primary bg-primary p-6 sm:p-10 text-white shadow-xs">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 rounded bg-red px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                <SolarIcon icon="solar:box-linear" className="size-3.5" />
                Venta por Mayor
              </span>

              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl font-heading text-white">
                ¿Tienes una tienda o negocio? Abastece con nosotros
              </h2>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Obtén precios de distribuidor en compras por docenas y cajas cerradas. Solicita tu lista de precios mayorista.
              </p>

              <ul className="space-y-1.5 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <SolarIcon icon="solar:check-circle-linear" className="size-4 text-emerald-400 shrink-0" />
                  <span>Márgenes de ganancia competitivos para tu punto de venta.</span>
                </li>
                <li className="flex items-center gap-2">
                  <SolarIcon icon="solar:check-circle-linear" className="size-4 text-emerald-400 shrink-0" />
                  <span>Despachos consolidados para optimizar fletes.</span>
                </li>
                <li className="flex items-center gap-2">
                  <SolarIcon icon="solar:check-circle-linear" className="size-4 text-emerald-400 shrink-0" />
                  <span>Atención prioritaria y cotizaciones al instante.</span>
                </li>
              </ul>

              <div className="pt-2">
                <a
                  href={whatsappLink('Hola, deseo registrarme como cliente mayorista y recibir la lista de precios.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-emerald-500 active:scale-95"
                >
                  <SolarIcon icon="solar:chat-round-dots-linear" className="size-4" />
                  <span>Solicitar Catálogo Mayorista</span>
                </a>
              </div>
            </div>

            <div className="relative flex justify-center lg:col-span-5">
              <div className="relative w-full max-w-sm aspect-[4/3] rounded-lg border border-slate-700 bg-slate-900 p-4">
                <Image
                  src="/wholesale-boxes.png"
                  alt="Venta mayorista Super Más"
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, 35vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LO MÁS VENDIDO (Product Carousel) */}
      {bestSellers.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Los Más Vendidos"
            subtitle="Las referencias con mayor rotación en nuestro catálogo"
            href="/productos"
            linkLabel="Ver catálogo"
          />
          <div className="mt-5">
            <ProductCarousel products={bestSellers} />
          </div>
        </section>
      )}

      {/* 7. NUEVOS INGRESOS (Product Carousel) */}
      {newProducts.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Nuevos Ingresos"
            subtitle="Recientes incorporaciones al inventario"
            href="/productos"
            linkLabel="Ver novedades"
          />
          <div className="mt-5">
            <ProductCarousel products={newProducts} />
          </div>
        </section>
      )}

      {/* 8. PREGUNTAS FRECUENTES (FAQ) */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
            Preguntas Frecuentes
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Información rápida sobre pedidos, pagos y despachos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                ¿Cómo comprar al por mayor?
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Agrega los productos que necesitas a tu carrito; al alcanzar las unidades mínimas mayoristas se te aplicará el precio preferencial. También puedes comunicarte directamente vía WhatsApp.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                ¿Hacen envíos a toda Colombia?
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Sí, despachamos a nivel nacional mediante empresas transportadoras aliadas. El valor y tiempo de entrega se coordinan al momento de confirmar el pedido.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                ¿Cuáles son los medios de pago?
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Aceptamos transferencias bancarias (Bancolombia, Nequi, Daviplata) y pagos contra entrega en zonas seleccionadas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA FINAL WHATSAPP */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-10 text-center flex flex-col items-center shadow-xs">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary text-white mb-3">
            <SolarIcon icon="solar:chat-round-dots-linear" className="size-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 max-w-md">
            ¿Tienes alguna consulta o necesitas una cotización?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-md">
            Nuestro equipo comercial está disponible para orientarte con tu pedido y responder al instante.
          </p>
          <a
            href={whatsappLink('Hola, necesito asesoría personalizada sobre productos y envíos.')}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-emerald-500 active:scale-95"
          >
            <SolarIcon icon="solar:chat-round-dots-linear" className="size-4" />
            <span>Hablar por WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  )
}
