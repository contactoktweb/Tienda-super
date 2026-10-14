'use client'

import Link from 'next/link'
import { SolarIcon } from '@/components/ui/solar-icon'
import { Logo } from '@/components/ui/logo'
import { site, whatsappLink } from '@/data/site'
import { useCategories } from '@/hooks/use-categories'
import { mainNav } from '@/data/nav'

export function SiteFooter() {
  const currentYear = new Date().getFullYear()
  const { categories } = useCategories()

  return (
    <footer className="border-t border-slate-800 bg-[#0f172a] text-slate-200">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-12">
          {/* Column 1: Brand & Social (col-span-3) */}
          <div className="flex flex-col items-center space-y-4 sm:items-start lg:col-span-3">
            <div>
              <Logo variant="white" height={44} width={155} />
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm sm:max-w-none">
              Super Más, todo lo que necesitas en un solo lugar. Productos para la despensa, aseo, cuidado personal y más.
            </p>
            {/* Social icons */}
            <div className="flex items-center justify-center gap-2.5 pt-1 sm:justify-start">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex size-8 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-colors hover:border-white hover:text-white"
              >
                <SolarIcon icon="solar:share-linear" className="size-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-8 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-colors hover:border-white hover:text-white"
              >
                <SolarIcon icon="solar:camera-linear" className="size-4" />
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex size-8 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-colors hover:border-white hover:text-white"
              >
                <SolarIcon icon="solar:chat-round-dots-linear" className="size-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Categorías (col-span-2) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Categorías
            </h3>
            <ul className="mt-3.5 space-y-1.5 text-xs">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/categoria/${c.slug}`}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Información (col-span-2) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Información
            </h3>
            <ul className="mt-3.5 space-y-2 text-xs">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={whatsappLink('Hola, deseo solicitar información sobre compras mayoristas.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Ventas al por mayor
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contáctanos (col-span-2) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Contáctanos
            </h3>
            <ul className="mt-3.5 space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <SolarIcon icon="solar:chat-round-dots-linear" className="size-3.5 text-emerald-400 shrink-0" />
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-medium text-slate-300"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <SolarIcon icon="solar:letter-linear" className="size-3.5 text-slate-400 shrink-0" />
                <a href={`mailto:${site.contact.email}`} className="hover:text-white transition-colors truncate">
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <SolarIcon icon="solar:map-point-linear" className="size-3.5 text-slate-400 shrink-0" />
                <span>{site.contact.city}, Colombia</span>
              </li>
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <SolarIcon icon="solar:clock-circle-linear" className="size-3.5 text-slate-400 shrink-0" />
                <span>{site.contact.hours}</span>
              </li>
            </ul>
          </div>

          {/* Column 5: Atención por WhatsApp (col-span-3) */}
          <div className="flex flex-col items-center space-y-3 sm:items-start lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Atención por WhatsApp
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm sm:max-w-none">
              ¿Tienes dudas o necesitas cotizar al por mayor? Escríbenos y te ayudamos.
            </p>
            <div className="pt-1 w-full max-w-xs sm:max-w-none">
              <a
                href={whatsappLink('Hola, necesito asesoría personalizada.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-emerald-500 active:scale-95 shadow-md"
              >
                <SolarIcon icon="solar:chat-round-dots-linear" className="size-4" />
                <span>Escribir por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with mandatory K&T attribution & dynamic year */}
      <div className="border-t border-slate-800 bg-[#090d16] py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-center text-xs text-slate-400 sm:flex-row sm:text-left sm:px-6 lg:px-8">
          <p>
            © {currentYear} {site.name}. Todos los derechos reservados.
          </p>

          <div>
            <a
              href="https://www.kytcode.lat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-slate-300 transition-colors hover:text-white"
            >
              <span>Desarrollado por K&T</span>
              <span className="text-white text-sm leading-none" aria-hidden="true">♥</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 sm:justify-start">
            <Link href="/terminos-y-condiciones" className="hover:text-white transition-colors">
              Términos y condiciones
            </Link>
            <span>|</span>
            <Link href="/politica-de-privacidad" className="hover:text-white transition-colors">
              Política de privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
