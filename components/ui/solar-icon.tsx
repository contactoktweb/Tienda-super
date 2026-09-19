'use client'

import { Icon, addCollection, type IconProps } from '@iconify/react'
import solarIcons from '@iconify-json/solar/icons.json'
import { cn } from '@/lib/utils'

// Register all Solar icons locally for 100% offline, zero-network, instant rendering on Safari/WebKit and all browsers
try {
  addCollection(solarIcons)
} catch {
  // Collection already registered
}

export function SolarIcon({
  icon,
  className = 'size-5',
  style,
  ...props
}: { icon: string; className?: string } & Omit<IconProps, 'icon'>) {
  const iconName = icon.startsWith('solar:') ? icon : `solar:${icon}`

  return (
    <Icon
      icon={iconName}
      className={cn('inline-block shrink-0 align-middle', className)}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        ...style,
      }}
      {...props}
    />
  )
}
