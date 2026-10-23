import { SolarIcon } from '@/components/ui/solar-icon'
import { whatsappLink } from '@/data/site'

/**
 * Aviso cuando el catálogo del ERP no responde. En ese caso la tienda no muestra
 * productos de respaldo: solo se puede comprar lo que existe en el ERP.
 */
export function CatalogUnavailable() {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 flex items-start gap-2.5">
      <SolarIcon icon="solar:danger-triangle-linear" className="size-4 shrink-0 mt-0.5" />
      <p>
        El catálogo no está disponible en este momento. Intenta de nuevo en unos minutos o{' '}
        <a
          href={whatsappLink('Hola, quiero hacer un pedido.')}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline"
        >
          escríbenos por WhatsApp
        </a>
        .
      </p>
    </div>
  )
}
