import { site } from '@/data/site'

export function formatPrice(value: number): string {
  return new Intl.NumberFormat(site.currency.locale, {
    style: 'currency',
    currency: site.currency.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function discountPercent(price: number, previous: number | null): number {
  if (!previous || previous <= price) return 0
  return Math.round(((previous - price) / previous) * 100)
}
