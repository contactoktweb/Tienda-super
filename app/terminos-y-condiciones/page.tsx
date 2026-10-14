import type { Metadata } from 'next'
import Link from 'next/link'
import { site, whatsappLink } from '@/data/site'
import { SolarIcon } from '@/components/ui/solar-icon'

export const metadata: Metadata = {
  title: `Términos y Condiciones | ${site.name}`,
  description:
    'Conoce los términos y condiciones de compra, pedidos al detal y al por mayor, precios, despachos, devoluciones y garantías en Super Más.',
}

export default function TerminosYCondicionesPage() {
  const lastUpdated = '14 de Octubre de 2026'

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-8 lg:px-8 space-y-8 sm:space-y-12">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-xs text-slate-500">
        <Link href="/" className="hover:text-primary transition-colors">
          Inicio
        </Link>
        <span>&gt;</span>
        <span className="font-bold text-slate-900">Términos y Condiciones</span>
      </nav>

      {/* 2. Hero Header */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 sm:p-10 lg:p-12 shadow-xs">
        <div className="pointer-events-none absolute -bottom-24 -right-16 size-80 sm:size-96 rounded-full bg-primary/10 opacity-70" />
        <div className="pointer-events-none absolute -top-20 right-32 size-60 rounded-full bg-red/10 opacity-60" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary shadow-2xs">
            <SolarIcon icon="solar:document-text-linear" className="size-3.5" />
            <span>Marco Legal y Comercial</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight">
            Términos y Condiciones de Uso y Venta
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Bienvenido a {site.name}. A continuación se detallan las pautas, derechos y obligaciones que rigen la navegación en nuestro sitio web, la compra de artículos al detal y al por mayor, y los procesos de entrega y garantía conforme a la legislación comercial colombiana y la Ley 1480 de 2011 (Estatuto del Consumidor).
          </p>

          <p className="text-[11px] font-medium text-slate-400">
            Última actualización: {lastUpdated} · República de Colombia
          </p>
        </div>
      </section>

      {/* 3. Summary Pillars / Key Points */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-primary">
            <SolarIcon icon="solar:tag-linear" className="size-5" />
          </div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Precios Transparentes</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Precios expresados en Pesos Colombianos (COP) para compras al detal y con escalas mayoristas preferenciales.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-emerald-600">
            <SolarIcon icon="solar:delivery-linear" className="size-5" />
          </div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Despachos Nacionales</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Envíos coordinados a cualquier municipio de Colombia mediante transportadoras aliadas certificadas.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-amber-600">
            <SolarIcon icon="solar:shield-check-linear" className="size-5" />
          </div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Garantía Legal</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Cumplimiento estricto del Estatuto del Consumidor ante averías de transporte o defectos de fabricación.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-red">
            <SolarIcon icon="solar:chat-round-dots-linear" className="size-5" />
          </div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Atención Personalizada</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Asesoría comercial directa vía WhatsApp para resolver inquietudes y confirmar pedidos en tiempo real.
          </p>
        </div>
      </section>

      {/* 4. Detailed Terms Content (Semantic Articles) */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Main Content (col-span-8) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Article 1 */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">1</span>
              <span>Identificación del Operador y Ámbito de Aplicación</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              El presente sitio web es operado comercialmente bajo el nombre de <strong>{site.name}</strong>, establecimiento comercial domiciliado en Colombia, dedicado a la comercialización y distribución de artículos para el hogar, cuidado personal, abarrotes, aseo, bebidas, conservas y productos de consumo masivo al detal y al por mayor.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Al acceder, navegar o realizar cualquier pedido a través de este portal o sus canales digitales asociados, el usuario declara haber leído, comprendido y aceptado en su totalidad las condiciones estipuladas en este documento.
            </p>
          </article>

          {/* Article 2 */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">2</span>
              <span>Catálogo, Precios y Disponibilidad en Tiempo Real</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              La disponibilidad de productos y sus precios se actualizan de forma periódica a través de nuestro sistema de gestión. Sin embargo, debido a la alta rotación de inventarios y dinámicas del mercado mayorista:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 pl-4 list-disc">
              <li>
                <strong>Moneda:</strong> Todos los precios publicados se expresan en Pesos Colombianos (COP) e incluyen los gravámenes de ley aplicables salvo que expresamente se indique lo contrario.
              </li>
              <li>
                <strong>Exactitud de stock:</strong> Aunque realizamos esfuerzos técnicos continuos para reflejar el stock con exactitud, la confirmación definitiva del pedido queda sujeta a la validación física en bodega antes del despacho.
              </li>
              <li>
                <strong>Fotografías y presentaciones:</strong> Las imágenes de los productos son de carácter ilustrativo y corresponden a las referencias originales comercializadas. Las presentaciones, empaques o etiquetas pueden variar levemente por decisión del fabricante sin alterar la calidad ni contenido neto indicado.
              </li>
            </ul>
          </article>

          {/* Article 3 */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">3</span>
              <span>Condiciones Especiales para Compras al por Mayor</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              En {site.name} fomentamos el abastecimiento de pequeños y medianos comerciantes, tiendas y negocios:
            </p>
            <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-4 space-y-2 text-xs text-slate-700">
              <p className="font-semibold text-slate-900">
                Escalas y cantidades mínimas mayoristas:
              </p>
              <p>
                Los precios de escala mayorista aplican a partir de las cantidades mínimas especificadas en cada referencia (por docenas, embalajes o cajas cerradas). Para pedidos corporativos o de gran volumen, se genera una cotización personalizada con flete consolidado a través de nuestra línea de WhatsApp comercial.
              </p>
            </div>
          </article>

          {/* Article 4 */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">4</span>
              <span>Proceso de Compra y Medios de Pago</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              El cliente puede estructurar su pedido a través de la bolsa/carrito de compras digital y finalizar la transacción mediante los métodos autorizados:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 pl-4 list-disc">
              <li>
                <strong>Transferencias bancarias electrónicas:</strong> Cuentas empresariales en Bancolombia, Nequi y Daviplata.
              </li>
              <li>
                <strong>Pasarelas de pago seguras:</strong> Pagos con tarjeta de crédito o débito mediante pasarela con certificación PCI-DSS y cifrado SSL.
              </li>
              <li>
                <strong>Pago contra entrega:</strong> Habilitado únicamente para zonas y municipios seleccionados con cobertura directa.
              </li>
            </ul>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Ningún pedido será despachado hasta tanto no se cuente con la validación exitosa del pago o la confirmación formal del acuerdo comercial.
            </p>
          </article>

          {/* Article 5 */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">5</span>
              <span>Envíos, Despachos y Entrega de Mercancía</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Los despachos se realizan desde nuestras bodegas principales hacia todo el territorio nacional colombiano:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 pl-4 list-disc">
              <li>
                <strong>Tiempos de entrega:</strong> Ciudades principales usualmente entre 2 a 4 días hábiles; trayectos especiales o zonas periféricas entre 4 a 8 días hábiles, sujetos a novedades de carretera o fuerza mayor.
              </li>
              <li>
                <strong>Valor del flete:</strong> El costo del transporte es coordinado y liquidado según peso volumétrico y destino al momento de confirmar el pedido.
              </li>
              <li>
                <strong>Recepción del pedido:</strong> Es responsabilidad del cliente o receptor designado verificar el estado externo de las cajas o paquetes al momento de la entrega por parte de la empresa transportadora antes de firmar la guía a conformidad.
              </li>
            </ul>
          </article>

          {/* Article 6 */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">6</span>
              <span>Derecho de Retracto (Ley 1480 de 2011)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              En las compras realizadas a través de métodos no tradicionales o a distancia, el consumidor final tiene derecho a ejercer el <strong>Derecho de Retracto</strong> dentro de los cinco (5) días hábiles siguientes a la entrega del producto, siempre y cuando se cumplan las siguientes condiciones:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 pl-4 list-disc">
              <li>El producto debe encontrarse en su empaque original, sin destapar, sin señales de uso, con etiquetas, sellos intactos y accesorios completos.</li>
              <li>Por razones de higiene y salubridad pública (Art. 47, numeral 7 de la Ley 1480), se exceptúan del derecho de retracto los bienes de uso personal, cosméticos destapados, productos perecederos o con fecha de vencimiento inmediata.</li>
              <li>Los costos de transporte y demás que conlleve la devolución del producto hacia nuestras instalaciones serán asumidos por el consumidor, conforme a la ley.</li>
            </ul>
          </article>

          {/* Article 7 */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">7</span>
              <span>Garantías y Averías de Transporte</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Todos los productos cuentan con garantía legal por defectos de fabricación o no conformidad. En caso de recibir un producto averiado por manipulación de la empresa de transporte, el cliente dispone de un término máximo de <strong>48 horas hábiles</strong> tras la entrega para notificar la novedad a través de nuestros canales oficiales, anexando registro fotográfico o en video del empaque y del producto afectado.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Una vez verificada la procedencia de la garantía, {site.name} procederá al reemplazo de la unidad, emisión de nota crédito o reembolso del valor pagado.
            </p>
          </article>

          {/* Article 8 */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">8</span>
              <span>Peticiones, Quejas, Reclamos y Recursos (PQRS)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Ponemos a disposición de nuestros clientes canales transparentes para radicar cualquier PQRS:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 pl-4 list-disc">
              <li><strong>Línea de WhatsApp:</strong> {site.contact.phone}</li>
              <li><strong>Correo Electrónico:</strong> {site.contact.email}</li>
              <li><strong>Tiempo de respuesta:</strong> Se dará respuesta formal en un término máximo de quince (15) días hábiles conforme al Código de Procedimiento Administrativo y de lo Contencioso Administrativo.</li>
            </ul>
          </article>
        </div>

        {/* Sidebar Sticky Assistance (col-span-4) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-white">
              <SolarIcon icon="solar:chat-round-dots-linear" className="size-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-bold font-heading text-slate-900">
                ¿Tienes dudas sobre los términos?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Nuestro equipo comercial y de atención al cliente está disponible para orientarte de forma rápida y clara.
              </p>
            </div>

            <div className="pt-2 space-y-2">
              <a
                href={whatsappLink('Hola, tengo una consulta respecto a los términos y condiciones de compra.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-colors hover:bg-emerald-500 active:scale-95"
              >
                <SolarIcon icon="solar:chat-round-dots-linear" className="size-4" />
                <span>Consultar por WhatsApp</span>
              </a>

              <Link
                href="/contacto"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 transition-colors hover:bg-slate-100"
              >
                <SolarIcon icon="solar:letter-linear" className="size-4" />
                <span>Formulario de Contacto</span>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2 text-xs text-slate-600">
            <span className="font-bold text-slate-900 block">Seguridad y Confianza</span>
            <p className="text-[11px] leading-relaxed text-slate-500">
              Operamos en estricto apego al marco regulatorio del comercio electrónico en Colombia, protegiendo tus derechos como consumidor y comprador mayorista.
            </p>
          </div>
        </aside>
      </section>
    </div>
  )
}
