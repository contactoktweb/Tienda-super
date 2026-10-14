import type { Metadata } from 'next'
import Link from 'next/link'
import { site, whatsappLink } from '@/data/site'
import { SolarIcon } from '@/components/ui/solar-icon'

export const metadata: Metadata = {
  title: `Política de Privacidad y Tratamiento de Datos | ${site.name}`,
  description:
    'Conoce nuestra política de tratamiento y protección de datos personales en cumplimiento de la Ley 1581 de 2012 y el régimen de Habeas Data en Colombia.',
}

export default function PoliticaDePrivacidadPage() {
  const lastUpdated = '14 de Octubre de 2026'

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-8 lg:px-8 space-y-8 sm:space-y-12">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-xs text-slate-500">
        <Link href="/" className="hover:text-primary transition-colors">
          Inicio
        </Link>
        <span>&gt;</span>
        <span className="font-bold text-slate-900">Política de Privacidad</span>
      </nav>

      {/* 2. Hero Header */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 sm:p-10 lg:p-12 shadow-xs">
        <div className="pointer-events-none absolute -bottom-24 -right-16 size-80 sm:size-96 rounded-full bg-emerald-600/10 opacity-70" />
        <div className="pointer-events-none absolute -top-20 right-32 size-60 rounded-full bg-primary/10 opacity-60" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 shadow-2xs">
            <SolarIcon icon="solar:shield-check-linear" className="size-3.5" />
            <span>Habeas Data & Protección de Datos</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight">
            Política de Privacidad y Tratamiento de Datos
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            En {site.name} valoramos y respetamos tu privacidad. Este documento describe de manera clara y transparente cómo recolectamos, almacenamos, usamos y protegemos los datos personales de nuestros clientes y visitantes, en estricto cumplimiento de la Ley Estatutaria 1581 de 2012 y el Decreto 1377 de 2013 de la República de Colombia.
          </p>

          <p className="text-[11px] font-medium text-slate-400">
            Última actualización: {lastUpdated} · República de Colombia
          </p>
        </div>
      </section>

      {/* 3. Summary Pillars */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-primary">
            <SolarIcon icon="solar:lock-keyhole-linear" className="size-5" />
          </div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Finalidad Exclusiva</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Los datos se utilizan exclusivamente para procesar, facturar y despachar tus pedidos al detal o mayoristas.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-emerald-600">
            <SolarIcon icon="solar:shield-linear" className="size-5" />
          </div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Confidencialidad Total</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            No comercializamos, cedemos ni alquilamos tus datos personales a empresas de terceros no autorizadas.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-amber-600">
            <SolarIcon icon="solar:user-check-linear" className="size-5" />
          </div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Derechos ARCO</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Facultad permanente de acceder, rectificar, actualizar o suprimir tu información en cualquier momento.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-red">
            <SolarIcon icon="solar:server-square-linear" className="size-5" />
          </div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Almacenamiento Seguro</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Infraestructura con protocolos de cifrado SSL para garantizar la integridad y seguridad de la información.
          </p>
        </div>
      </section>

      {/* 4. Detailed Privacy Content */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Main Content (col-span-8) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Article 1 */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">1</span>
              <span>Responsable del Tratamiento de Datos</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              El responsable y custodio del tratamiento de las bases de datos personales generadas a través de este sitio web es <strong>{site.name}</strong>, establecimiento comercial legalmente constituido y con operación en Colombia.
            </p>
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80 text-xs text-slate-700 space-y-1">
              <p><strong>Canal de atención para Habeas Data:</strong> {site.contact.email}</p>
              <p><strong>Línea de WhatsApp:</strong> {site.contact.phone}</p>
              <p><strong>Ubicación:</strong> Colombia</p>
            </div>
          </article>

          {/* Article 2 */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">2</span>
              <span>Datos Personales que Recolectamos</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Durante la navegación y el proceso de compra en nuestra tienda, recolectamos únicamente la información necesaria para gestionar pedidos y consultas:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 pl-4 list-disc">
              <li>
                <strong>Datos de identificación y contacto:</strong> Nombres, apellidos, número de documento de identidad (C.C. o NIT para facturación), número de teléfono móvil y dirección de correo electrónico.
              </li>
              <li>
                <strong>Datos de entrega y logística:</strong> Dirección exacta de destino, barrio, ciudad, departamento y referencias de entrega para la empresa de mensajería o transporte.
              </li>
              <li>
                <strong>Datos transaccionales:</strong> Detalle de productos solicitados, historial de pedidos, montos facturados y comprobantes de transferencia aportados por el usuario.
              </li>
              <li>
                <strong>No almacenamiento de datos bancarios sensibles:</strong> {site.name} no almacena en sus servidores números completos de tarjetas de crédito o débito, códigos de seguridad CVV ni claves personales. Las transacciones en línea son procesadas de extremo a extremo a través de pasarelas de pago certificadas.
              </li>
            </ul>
          </article>

          {/* Article 3 */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">3</span>
              <span>Finalidades del Tratamiento</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              La información suministrada por los titulares es incorporada a nuestras bases de datos con los siguientes propósitos legítimos:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 pl-4 list-disc">
              <li>Procesar, liquidar, embalar y coordinar el despacho oportuno de los pedidos adquiridos en la tienda.</li>
              <li>Emitir los comprobantes de venta, remisiones o facturación electrónica de ley.</li>
              <li>Contactar al cliente mediante WhatsApp, llamada o correo para confirmar novedades del pedido, guías de despacho o acuerdos de flete.</li>
              <li>Atender y dar trámite a solicitudes de garantía, retracto, quejas o reclamos.</li>
              <li>Enviar comunicaciones comerciales sobre promociones destacadas, nuevos ingresos o listas de precios mayoristas, siempre que se cuente con autorización previa y con opción de desuscripción voluntaria.</li>
            </ul>
          </article>

          {/* Article 4 */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">4</span>
              <span>Derechos de los Titulares de la Información (Habeas Data)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Conforme al Artículo 8 de la Ley 1581 de 2012, el titular de los datos personales cuenta con los siguientes derechos inalienables:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 pl-4 list-disc">
              <li><strong>Conocer, actualizar y rectificar</strong> sus datos personales frente a los responsables o encargados del tratamiento cuando estos sean inexactos, incompletos o desactualizados.</li>
              <li><strong>Solicitar prueba</strong> de la autorización otorgada para el tratamiento de su información.</li>
              <li><strong>Ser informado</strong> previa solicitud respecto del uso que se le ha dado a sus datos personales.</li>
              <li><strong>Revocar la autorización o solicitar la supresión</strong> de sus datos cuando en el tratamiento no se respeten los principios, derechos y garantías constitucionales.</li>
              <li><strong>Presentar quejas</strong> ante la Superintendencia de Industria y Comercio (SIC) por presuntas infracciones al régimen de protección de datos.</li>
            </ul>
          </article>

          {/* Article 5 */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">5</span>
              <span>Transmisión de Datos a Transportadoras Aliadas</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Para cumplir con la entrega material de los pedidos, {site.name} transfiere los datos mínimos estrictamente necesarios (nombre, teléfono, dirección y ciudad de entrega) a las empresas transportadoras legalmente autorizadas en Colombia (tales como Servientrega, Envia, Interrapidísimo, Coordinadora o transportes de carga aliadas). Dichas entidades actúan como encargadas del transporte y están obligadas a mantener la debida confidencialidad.
            </p>
          </article>

          {/* Article 6 */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">6</span>
              <span>Uso de Cookies y Tecnologías de Almacenamiento Local</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Este sitio web utiliza cookies técnicas y almacenamiento local (`localStorage`) con el único fin de mantener activa la sesión de compra, recordar los artículos agregados a tu carrito y optimizar los tiempos de carga en navegadores web. No empleamos cookies intrusivas ni comercializamos perfiles de navegación con redes de publicidad masiva.
            </p>
          </article>

          {/* Article 7 */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">7</span>
              <span>Procedimiento para Ejercer los Derechos de Habeas Data</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Cualquier titular puede solicitar la consulta, actualización o retiro definitivo de sus datos enviando un mensaje a nuestro correo electrónico oficial <strong>{site.contact.email}</strong> o a través de nuestra línea de WhatsApp, indicando:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600 pl-4 list-disc">
              <li>Nombre completo y número de documento de identificación.</li>
              <li>Descripción clara de la solicitud (consulta, rectificación o revocatoria).</li>
              <li>Datos de contacto para remitir la respuesta.</li>
            </ul>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              Las consultas serán atendidas en un término máximo de diez (10) días hábiles y los reclamos en quince (15) días hábiles, conforme lo establece la Ley 1581 de 2012.
            </p>
          </article>
        </div>

        {/* Sidebar Sticky Privacy Assistance (col-span-4) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <SolarIcon icon="solar:shield-check-linear" className="size-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-bold font-heading text-slate-900">
                ¿Deseas consultar o actualizar tus datos?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Escríbenos directamente y atenderemos tu solicitud de tratamiento de datos con la mayor celeridad.
              </p>
            </div>

            <div className="pt-2 space-y-2">
              <a
                href={whatsappLink('Hola, deseo realizar una consulta sobre el tratamiento y actualización de mis datos personales.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-colors hover:bg-emerald-500 active:scale-95"
              >
                <SolarIcon icon="solar:chat-round-dots-linear" className="size-4" />
                <span>Solicitud por WhatsApp</span>
              </a>

              <Link
                href="/contacto"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 transition-colors hover:bg-slate-100"
              >
                <SolarIcon icon="solar:letter-linear" className="size-4" />
                <span>Enviar Solicitud Escrita</span>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2 text-xs text-slate-600">
            <span className="font-bold text-slate-900 block">Conformidad Legal SIC</span>
            <p className="text-[11px] leading-relaxed text-slate-500">
              Garantizamos el tratamiento de la información bajo los postulados de legalidad, finalidad, libertad, veracidad, transparencia y seguridad estipulados por la Superintendencia de Industria y Comercio de Colombia.
            </p>
          </div>
        </aside>
      </section>
    </div>
  )
}
