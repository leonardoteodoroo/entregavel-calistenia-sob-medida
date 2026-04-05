import type { ReactNode } from 'react'

import styles from './GlassPill.module.css'

export interface GlassPillProps {
  children: ReactNode
  className?: string
}

export default function GlassPill({ children, className }: GlassPillProps) {
  return <span className={[styles.pill, className].filter(Boolean).join(' ')}>{children}</span>
}
