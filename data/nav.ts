export interface NavLink {
  label: string
  href: string
}

export const mainNav: NavLink[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Ofertas', href: '/ofertas' },
  { label: 'Productos', href: '/productos' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Contacto', href: '/contacto' },
]
