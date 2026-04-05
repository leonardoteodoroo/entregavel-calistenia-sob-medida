import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'

import Card from '../Card/Card'
import OrganicIcon from '../OrganicIcon/OrganicIcon'
import type { Tip } from '../../data/types'
import useInView from '../../hooks/useInView'
import styles from './TipCard.module.css'

const accentPalette = ['#f3e2cc', '#e5ece2', '#f8dcd4', '#ece6d7'] as const

export interface TipCardProps {
  tip: Tip
}

export default function TipCard({ tip }: TipCardProps) {
  const accent = accentPalette[tip.number % accentPalette.length]
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: '0px 0px -12% 0px',
  })

  return (
    <div
      ref={ref}
      data-tip-card={tip.id}
      className={[styles.wrapper, isInView ? styles.cardVisible : styles.cardHidden].join(' ')}
    >
      <Card className={styles.card} style={{ '--tip-accent': accent } as CSSProperties}>
        <p className={styles.counter}>🌿 Dica #{tip.number.toString().padStart(2, '0')}</p>

        <blockquote className={styles.quote}>
          {tip.text}
        </blockquote>

        <p className={styles.label}>— {tip.label} —</p>

        <Link to={`/biblioteca/${tip.alliedOil}`} className={styles.alliedOil}>
          <span className={styles.alliedIcon} aria-hidden="true">
            <OrganicIcon name="droplet" size={18} />
          </span>
          <div>
            <p className={styles.alliedTitle}>Óleo Aliado: {tip.alliedOilName}</p>
            <p className={styles.alliedReason}>{tip.alliedOilReason}</p>
          </div>
        </Link>
      </Card>
    </div>
  )
}
