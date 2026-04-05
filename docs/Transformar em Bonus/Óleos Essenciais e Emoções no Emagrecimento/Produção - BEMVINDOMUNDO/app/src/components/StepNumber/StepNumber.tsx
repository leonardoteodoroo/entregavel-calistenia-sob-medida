import type { ReactNode } from 'react'

import styles from './StepNumber.module.css'

export interface StepNumberProps {
  number: number | string
  title: string
  description: ReactNode
  className?: string
}

export default function StepNumber({
  number,
  title,
  description,
  className,
}: StepNumberProps) {
  const label = typeof number === 'number' ? number.toString().padStart(2, '0') : number

  return (
    <div className={[styles.step, className].filter(Boolean).join(' ')}>
      <div className={styles.marker} aria-hidden="true">
        <span>{label}</span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  )
}
