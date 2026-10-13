/**
 * Configuración central para el cliente de la API Pública de Catálogos.
 */

export function getApiBaseUrl(): string {
  const envUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    'https://supermas.vercel.app'

  let normalized = envUrl.trim()
  if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
    normalized = `https://${normalized}`
  }
  return normalized.replace(/\/+$/, '')
}
