import type { AriaRole, ReactNode } from 'react'

import styles from './PullQuote.module.css'

export interface PullQuoteProps {
  children: ReactNode
  role?: AriaRole
  className?: string
}

export default function PullQuote({
  children,
  role = 'presentation',
  className,
}: PullQuoteProps) {
  return (
    <p role={role} className={[styles.quote, className].filter(Boolean).join(' ')}>
      {children}
    </p>
  )
}
