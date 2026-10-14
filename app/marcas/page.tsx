import type { Metadata } from 'next'
import Link from 'next/link'
import { site, whatsappLink } from '@/data/site'
import { SolarIcon } from '@/components/ui/solar-icon'

export const metadata: Metadata = {
  title: `Nuestras Marcas y Proveedores | ${site.name}`,
  description:
    'Distribuimos las mejores marcas para el hogar, despensa, aseo, cuidado personal y alimentos en Colombia.',
}

const featuredBrands = [
  {
    name: 'Abarrotes y Despensa',
    desc: 'Productos esenciales de canasta familiar, salsas, condimentos, harinas y granos seleccionados.',
    categories: ['Abarrotes y Despensa', 'Granos y Cereales', 'Panadería y Harinas'],
  },
  {
    name: 'Aseo del Hogar y Limpieza',
    desc: 'Detergentes, desinfectantes, blanqueadores y artículos esenciales para el cuidado del hogar y negocio.',
    categories: ['Aseo del Hogar'],
  },
  {
    name: 'Cuidado e Higiene Personal',
    desc: 'Líneas especializadas en higiene corporal, champús, jabones y cuidado diario para toda la familia.',
    categories: ['Cuidado Personal'],
  },
  {
    name: 'Alimentos y Bebidas',
    desc: 'Bebidas refrescantes, enlatados de larga conservación, lácteos frescos y confitería para compartir.',
    categories: ['Bebidas y Refrescos', 'Enlatados y Conservas', 'Lácteos y Huevos', 'Snacks y Confitería'],
  },
]

export default function MarcasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 space-y-12">
      {/* Header */}
      <div className="flex flex-col gap-1.5 border-b border-border pb-5">
        <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-primary">
          <SolarIcon icon="solar:shield-minimalistic-linear" className="size-3.5" />
          <span>Líneas de Distribución</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl font-heading text-foreground">
          Nuestras Marcas y Categorías Aliadas
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
          Seleccionamos cuidadosamente cada producto para garantizar la mejor relación calidad-precio tanto para compras al detal como por mayor.
        </p>
      </div>

      {/* Grid of Brand Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {featuredBrands.map((brand) => (
          <div
            key={brand.name}
            className="rounded-lg border border-border bg-card p-6 shadow-xs space-y-3.5 flex flex-col justify-between hover:border-primary/40 transition-all hover:shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-base font-bold font-heading text-foreground">{brand.name}</h2>
                <SolarIcon icon="solar:shield-minimalistic-linear" className="size-4 text-primary" />
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                {brand.desc}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {brand.categories.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between">
              <Link
                href="/productos"
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary hover:text-brand-dark transition-colors"
              >
                <span>Ver catálogo</span>
                <SolarIcon icon="solar:arrow-right-linear" className="size-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Commercial Partnership CTA */}
      <div className="rounded-xl border border-primary bg-primary text-primary-foreground p-6 sm:p-10 text-center flex flex-col items-center shadow-xs">
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
          ¿Eres fabricante o importador?
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-200 max-w-lg">
          En Super Más ampliamos constantemente nuestro catálogo. Contáctanos para alianzas comerciales y distribución a gran escala.
        </p>
        <a
          href={whatsappLink('Hola, represento a una marca y deseo presentar una propuesta comercial.')}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-colors hover:bg-red/90 active:scale-95"
        >
          <SolarIcon icon="solar:chat-round-dots-linear" className="size-4" />
          <span>Contactar Departamento Comercial</span>
        </a>
      </div>
    </div>
  )
}
