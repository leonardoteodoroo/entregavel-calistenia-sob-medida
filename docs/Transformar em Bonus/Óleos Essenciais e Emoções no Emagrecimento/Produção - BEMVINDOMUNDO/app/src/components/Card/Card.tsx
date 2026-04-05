import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import styles from './Card.module.css'

type CardVariant = 'default' | 'elevated'

type CardOwnProps<T extends ElementType> = {
  as?: T
  children: ReactNode
  variant?: CardVariant
  className?: string
}

export type CardProps<T extends ElementType = 'div'> = CardOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof CardOwnProps<T>>

export default function Card<T extends ElementType = 'div'>({
  as,
  children,
  variant = 'default',
  className,
  ...props
}: CardProps<T>) {
  const Component = as ?? 'div'
  const resolvedClassName = [styles.card, styles[variant], className].filter(Boolean).join(' ')

  return (
    <Component className={resolvedClassName} {...props}>
      {children}
    </Component>
  )
}
