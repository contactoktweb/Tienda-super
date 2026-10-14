import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/data/site'
import { SolarIcon } from '@/components/ui/solar-icon'

export const metadata: Metadata = {
  title: `Conoce Más de Nosotros | ${site.name}`,
  description:
    'Somos una distribuidora comprometida con ofrecer productos de calidad para el hogar, despensa, aseo, cuidado personal y alimentos.',
}

export default function NosotrosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 space-y-10 sm:space-y-12">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-xs text-slate-500">
        <Link href="/" className="hover:text-primary transition-colors">
          Inicio
        </Link>
        <span>&gt;</span>
        <span className="font-bold text-slate-900">Nosotros</span>
      </nav>

      {/* 2. Main Hero Section (2 Columns) */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-center">
        {/* Left Content (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-6 bg-red" />
            <span className="text-xs font-bold uppercase tracking-wider text-red">
              Conoce más de nosotros
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight">
            Super Más
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
            En Super Más estamos comprometidos con ofrecer productos de calidad para la despensa, aseo del hogar, cuidado personal y alimentos de primera necesidad. Trabajamos cada día para que nuestros clientes encuentren todo lo que necesitan en un solo lugar, con los mejores precios y un excelente servicio.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-primary">
                <SolarIcon icon="solar:shield-minimalistic-linear" className="size-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Productos de calidad</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Seleccionamos lo mejor para ti.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-primary">
                <SolarIcon icon="solar:hand-heart-linear" className="size-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Compromiso y confianza</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Construimos relaciones duraderas.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Warehouse Image with Floating Badge (6 cols) */}
        <div className="lg:col-span-6">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-lg">
            {/* Warehouse background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-slate-900/60 to-transparent z-10" />
            
            <Image
              src="/wholesale-boxes.png"
              alt="Instalaciones Super Más"
              fill
              priority
              className="object-cover p-6 scale-110"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Visual warehouse shelf overlay */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 pointer-events-none">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white self-start border border-white/30">
                <SolarIcon icon="solar:box-linear" className="size-3.5" />
                <span>Centro de Distribución Mayorista</span>
              </div>

              {/* Floating Red Badge */}
              <div className="self-end rounded-2xl bg-red px-5 py-3 text-white shadow-xl flex items-center gap-3 border border-white/20">
                <div className="flex size-8 items-center justify-center rounded-full bg-white/20">
                  <SolarIcon icon="solar:users-group-rounded-linear" className="size-4 text-white" />
                </div>
                <div>
                  <span className="block text-xs font-extrabold uppercase tracking-wide">Clientes</span>
                  <span className="block text-[11px] font-medium text-red-100">satisfechos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Metrics Banner (4 Columns) */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {/* Metric 1 */}
          <div className="flex items-center gap-4 sm:px-4 first:px-0">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-red/10 text-red">
              <SolarIcon icon="solar:box-linear" className="size-6" />
            </div>
            <div>
              <span className="block text-2xl font-extrabold font-heading text-slate-900">500+</span>
              <span className="text-xs text-slate-500">Productos disponibles</span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-red/10 text-red">
              <SolarIcon icon="solar:users-group-rounded-linear" className="size-6" />
            </div>
            <div>
              <span className="block text-2xl font-extrabold font-heading text-slate-900">1.000+</span>
              <span className="text-xs text-slate-500">Clientes satisfechos</span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-red/10 text-red">
              <SolarIcon icon="solar:shop-linear" className="size-6" />
            </div>
            <div>
              <span className="block text-2xl font-extrabold font-heading text-slate-900">100+</span>
              <span className="text-xs text-slate-500">Negocios aliados</span>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-red/10 text-red">
              <SolarIcon icon="solar:delivery-linear" className="size-6" />
            </div>
            <div>
              <span className="block text-2xl font-extrabold font-heading text-slate-900">Envíos</span>
              <span className="text-xs text-slate-500">Rápidos y seguros</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Misión, Visión y Valores Section (4 Balanced Columns) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {/* Card 1: Storefront Photo Card */}
        <div className="w-full">
          <div className="relative aspect-[4/3] sm:h-full min-h-[190px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-primary p-6 flex items-center justify-center shadow-xs">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary via-slate-900 to-primary/80" />
            <div className="relative z-10 text-center space-y-2">
              <div className="inline-block rounded-xl bg-white p-2.5 shadow-md">
                <span className="text-base font-extrabold tracking-tight text-primary font-heading">
                  SUPER <span className="text-red">MÁS</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-200 max-w-xs mx-auto leading-tight">
                Puntos de atención y despacho mayorista al servicio de tu negocio.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Misión */}
        <div className="space-y-2.5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-start">
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-5 bg-red" />
            <h2 className="text-base font-bold font-heading text-slate-900">
              Misión
            </h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Ofrecer una amplia variedad de productos de calidad para el hogar y el negocio, con precios competitivos, atención personalizada y soluciones que faciliten la vida de nuestros clientes.
          </p>
        </div>

        {/* Card 3: Visión */}
        <div className="space-y-2.5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-start">
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-5 bg-red" />
            <h2 className="text-base font-bold font-heading text-slate-900">
              Visión
            </h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Ser la distribuidora líder en nuestra región, reconocida por nuestra variedad, calidad, innovación y compromiso con el crecimiento de nuestros clientes y aliados.
          </p>
        </div>

        {/* Card 4: Nuestros Valores */}
        <div className="space-y-2.5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-start">
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-5 bg-red" />
            <h2 className="text-base font-bold font-heading text-slate-900">
              Nuestros valores
            </h2>
          </div>
          <ul className="space-y-2 text-xs text-slate-700 font-medium">
            <li className="flex items-center gap-2">
              <SolarIcon icon="solar:check-circle-linear" className="size-4 text-red shrink-0" />
              <span>Honestidad</span>
            </li>
            <li className="flex items-center gap-2">
              <SolarIcon icon="solar:check-circle-linear" className="size-4 text-red shrink-0" />
              <span>Responsabilidad</span>
            </li>
            <li className="flex items-center gap-2">
              <SolarIcon icon="solar:check-circle-linear" className="size-4 text-red shrink-0" />
              <span>Calidad</span>
            </li>
            <li className="flex items-center gap-2">
              <SolarIcon icon="solar:check-circle-linear" className="size-4 text-red shrink-0" />
              <span>Servicio</span>
            </li>
            <li className="flex items-center gap-2">
              <SolarIcon icon="solar:check-circle-linear" className="size-4 text-red shrink-0" />
              <span>Trabajo en equipo</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 5. Bottom Value Props Bar (Solid Navy Blue) */}
      <section className="rounded-2xl border border-primary bg-primary p-6 sm:p-8 text-white shadow-xs">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:px-4 first:pt-0 first:px-0">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
              <SolarIcon icon="solar:shield-minimalistic-linear" className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Compra segura</h4>
              <p className="text-[11px] text-slate-200">Tus datos protegidos</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:px-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
              <SolarIcon icon="solar:delivery-linear" className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Envíos confiables</h4>
              <p className="text-[11px] text-slate-200">A todo el país</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:px-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
              <SolarIcon icon="solar:tag-linear" className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Mejores precios</h4>
              <p className="text-[11px] text-slate-200">Al detal y al por mayor</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:px-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
              <SolarIcon icon="solar:chat-round-dots-linear" className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Atención personalizada</h4>
              <p className="text-[11px] text-slate-200">Siempre estamos para ayudarte</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
