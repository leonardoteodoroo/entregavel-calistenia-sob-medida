import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'

import Card from '../Card/Card'
import type { Tip } from '../../data/types'
import styles from './TipCard.module.css'

const accentPalette = ['#f3e2cc', '#e5ece2', '#f8dcd4', '#ece6d7'] as const

export interface TipCardProps {
  tip: Tip
}

export default function TipCard({ tip }: TipCardProps) {
  const accent = accentPalette[tip.number % accentPalette.length]

  return (
    <Card
      className={styles.card}
      data-tip-card={tip.id}
      style={{ '--tip-accent': accent } as CSSProperties}
    >
      <p className={styles.counter}>🌿 Dica #{tip.number.toString().padStart(2, '0')}</p>

      <blockquote className={styles.quote}>
        {tip.text}
      </blockquote>

      <p className={styles.label}>— {tip.label} —</p>

      <Link to={`/biblioteca/${tip.alliedOil}`} className={styles.alliedOil}>
        <span className={styles.alliedIcon} aria-hidden="true">
          💧
        </span>
        <div>
          <p className={styles.alliedTitle}>Óleo Aliado: {tip.alliedOilName}</p>
          <p className={styles.alliedReason}>{tip.alliedOilReason}</p>
        </div>
      </Link>
    </Card>
  )
}
