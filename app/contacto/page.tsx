import type { Metadata } from 'next'
import Link from 'next/link'
import { site, whatsappLink } from '@/data/site'
import { SolarIcon } from '@/components/ui/solar-icon'
import { ContactForm } from '@/components/contact/contact-form'

export const metadata: Metadata = {
  title: `Contáctanos y Canales de Atención | ${site.name}`,
  description:
    '¿Tienes dudas, sugerencias o necesitas un pedido especial? Comunícate con Distribuidora Super+ vía WhatsApp, teléfono o formulario de contacto.',
}

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 space-y-10 sm:space-y-12">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-xs text-slate-500">
        <Link href="/" className="hover:text-primary transition-colors">
          Inicio
        </Link>
        <span>&gt;</span>
        <span className="font-bold text-slate-900">Contacto</span>
      </nav>

      {/* 2. Header Hero (2 Columns: Title on Left, Illustration on Right) */}
      <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-slate-100 pb-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-red">
            Estamos para ayudarte
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            Contáctanos
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            ¿Tienes dudas, sugerencias o necesitas un pedido especial? Completa el formulario o utiliza nuestros canales de atención.
          </p>
        </div>

        {/* Support & Messaging Illustration */}
        <div className="flex items-center gap-4 text-slate-400 self-center lg:self-auto">
          <div className="flex size-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 shadow-xs">
            <SolarIcon icon="solar:headphones-round-linear" className="size-7 text-slate-700" />
          </div>
          <div className="relative flex size-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 shadow-xs">
            <SolarIcon icon="solar:letter-linear" className="size-7 text-slate-700" />
            <span className="absolute -top-1 -right-1 flex size-4.5 items-center justify-center rounded-full bg-red text-[10px] font-bold text-white shadow-xs">
              1
            </span>
          </div>
          <div className="flex size-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 shadow-xs">
            <SolarIcon icon="solar:smartphone-linear" className="size-7 text-slate-700" />
          </div>
        </div>
      </section>

      {/* 3. 4 Contact Channels Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* WhatsApp Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between space-y-3 transition-all hover:border-slate-300 hover:shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <SolarIcon icon="solar:chat-round-dots-linear" className="size-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">WhatsApp</h3>
              <p className="text-[11px] text-slate-500">Atención rápida y directa</p>
            </div>
          </div>
          <div>
            <a
              href={whatsappLink('Hola, deseo comunicarme con atención al cliente.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline"
            >
              <span>Escríbenos ahora</span>
              <SolarIcon icon="solar:arrow-right-linear" className="size-3.5" />
            </a>
          </div>
        </div>

        {/* Teléfono Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between space-y-3 transition-all hover:border-slate-300 hover:shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-red/10 text-red">
              <SolarIcon icon="solar:phone-linear" className="size-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Teléfono</h3>
              <p className="text-[11px] text-slate-500">{site.contact.hours}</p>
            </div>
          </div>
          <div>
            <a
              href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
              className="text-xs font-bold text-red hover:underline"
            >
              {site.contact.phone}
            </a>
          </div>
        </div>

        {/* Correo Electrónico Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between space-y-3 transition-all hover:border-slate-300 hover:shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary">
              <SolarIcon icon="solar:letter-linear" className="size-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Correo electrónico</h3>
              <p className="text-[11px] text-slate-500">Envíanos tu consulta</p>
            </div>
          </div>
          <div>
            <a
              href={`mailto:${site.contact.email}`}
              className="text-xs font-bold text-primary hover:underline truncate block"
            >
              {site.contact.email}
            </a>
          </div>
        </div>

        {/* Ubicación Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between space-y-3 transition-all hover:border-slate-300 hover:shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-red/10 text-red">
              <SolarIcon icon="solar:map-point-linear" className="size-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Ubicación</h3>
              <p className="text-[11px] text-slate-500">Visítanos en nuestra sede</p>
            </div>
          </div>
          <div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-red hover:underline"
            >
              <span>Ver en el mapa</span>
              <SolarIcon icon="solar:arrow-right-linear" className="size-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. Main Section: Form (Left) & Map/Info (Right) */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-start">
        {/* Left: Contact Form (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-5 shadow-xs">
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-heading text-slate-900">
              Envíanos tu mensaje
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Completa el formulario y te responderemos lo antes posible.
            </p>
          </div>

          <ContactForm />
        </div>

        {/* Right: Map & Contact Info (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs space-y-0">
          {/* Stylized Interactive Map Preview */}
          <div className="relative aspect-[16/9] w-full bg-slate-100 border-b border-slate-200 flex items-center justify-center overflow-hidden">
            {/* Map Grid Pattern */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-slate-600 shadow-xs border border-slate-200">
                  Centro Comercial
                </span>
                <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-slate-600 shadow-xs border border-slate-200">
                  Supermercado
                </span>
              </div>
            </div>

            {/* Red Map Marker */}
            <div className="relative z-10 flex flex-col items-center animate-bounce">
              <div className="flex size-9 items-center justify-center rounded-full bg-red text-white shadow-lg border-2 border-white">
                <SolarIcon icon="solar:map-point-bold" className="size-5" />
              </div>
              <span className="rounded-md bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white shadow-md mt-1">
                Distribuidora Super+
              </span>
            </div>
          </div>

          {/* Info Details List */}
          <div className="p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
              Información de contacto
            </h3>

            <ul className="space-y-3.5 text-xs text-slate-600">
              <li className="flex items-start gap-3">
                <SolarIcon icon="solar:clock-circle-linear" className="size-4 text-slate-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold">Horarios de atención</strong>
                  <span>Lunes a sábado: 8:00 a.m. - 6:00 p.m.</span>
                  <span className="block text-[11px] text-slate-400">Domingos y festivos: 9:00 a.m. - 2:00 p.m.</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <SolarIcon icon="solar:shop-linear" className="size-4 text-slate-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold">Nuestra sede</strong>
                  <span>{site.contact.address}</span>
                  <span className="block text-[11px] text-slate-400">{site.contact.city}, Colombia</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <SolarIcon icon="solar:letter-linear" className="size-4 text-slate-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold">Correo electrónico</strong>
                  <a href={`mailto:${site.contact.email}`} className="text-primary hover:underline">
                    {site.contact.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <SolarIcon icon="solar:headphones-round-linear" className="size-4 text-slate-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold">Servicio al cliente</strong>
                  <a href={`tel:${site.contact.phone.replace(/\s/g, '')}`} className="text-slate-900 font-semibold hover:underline">
                    {site.contact.phone}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Bottom Value Props Bar */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:px-4 first:pt-0 first:px-0">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-primary">
              <SolarIcon icon="solar:shield-minimalistic-linear" className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Compra segura</h4>
              <p className="text-[11px] text-slate-500">Tus datos protegidos</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:px-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-primary">
              <SolarIcon icon="solar:delivery-linear" className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Envíos confiables</h4>
              <p className="text-[11px] text-slate-500">A todo el país</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:px-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-primary">
              <SolarIcon icon="solar:tag-linear" className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Mejores precios</h4>
              <p className="text-[11px] text-slate-500">Al detal y al por mayor</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:px-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-primary">
              <SolarIcon icon="solar:chat-round-dots-linear" className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Atención personalizada</h4>
              <p className="text-[11px] text-slate-500">Siempre estamos para ayudarte</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
