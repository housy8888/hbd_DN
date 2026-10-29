import type { PortraitId } from '../data/story'
import { portraitSrc } from '../data/story'

type Props = {
  id: PortraitId
  size?: 'sm' | 'md' | 'lg' | 'hero'
  className?: string
  alt?: string
}

const sizes = {
  sm: 28,
  md: 56,
  lg: 88,
  hero: 120,
} as const

export function Portrait({ id, size = 'md', className = '', alt }: Props) {
  const px = sizes[size]
  const bullScale = id === 'bull' ? 1.35 : 1
  return (
    <img
      src={portraitSrc[id]}
      alt={alt ?? id}
      width={Math.round(px * bullScale)}
      height={Math.round(px * (id === 'bull' ? 1.0 : 1))}
      className={`portrait portrait-${size} portrait-${id} ${className}`.trim()}
      draggable={false}
    />
  )
}
