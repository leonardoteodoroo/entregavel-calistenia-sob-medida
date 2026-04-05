import type { CSSProperties } from 'react'
import { useRef, useState } from 'react'

import type { MindsetPair } from '../../data/types'
import styles from './SabotageCard.module.css'

export interface SabotageCardProps {
  pair: MindsetPair
}

export default function SabotageCard({ pair }: SabotageCardProps) {
  const [flipped, setFlipped] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const touchStartXRef = useRef<number | null>(null)
  const isDragging = touchStartXRef.current !== null

  const handleTouchStart = (event: React.TouchEvent<HTMLButtonElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchMove = (event: React.TouchEvent<HTMLButtonElement>) => {
    if (touchStartXRef.current === null) {
      return
    }

    const currentX = event.touches[0]?.clientX ?? touchStartXRef.current
    const deltaX = Math.max(-120, Math.min(120, currentX - touchStartXRef.current))
    setDragOffset(deltaX)
  }

  const handleTouchEnd = () => {
    if (dragOffset <= -80) {
      setFlipped(true)
    } else if (dragOffset >= 80) {
      setFlipped(false)
    }

    touchStartXRef.current = null
    setDragOffset(0)
  }

  return (
    <button
      type="button"
      className={styles.trigger}
      data-sabotage-card={pair.id}
      aria-pressed={flipped}
      onClick={() => setFlipped((current) => !current)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div
        className={[
          styles.card3d,
          flipped ? styles.card3dFlipped : '',
          isDragging ? styles.card3dDragging : '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={
          {
            '--swipe-shift': `${dragOffset * 0.18}px`,
            '--swipe-rotate': `${Math.round(dragOffset / 6)}deg`,
          } as CSSProperties
        }
      >
        <article className={`${styles.face} ${styles.front}`}>
          <p className={styles.theme}>{pair.theme}</p>
          <p className={styles.stateLabel}>✗ Sabotagem mental</p>
          <blockquote className={styles.quote}>{pair.sabotage}</blockquote>
          <p className={styles.hint}>toque para reprogramar</p>
        </article>

        <article className={`${styles.face} ${styles.back}`}>
          <p className={styles.theme}>{pair.theme}</p>
          <p className={styles.stateLabelPositive}>✓ Reprograme</p>
          <div className={styles.positiveList}>
            {pair.positive.map((item) => (
              <blockquote key={item} className={styles.quote}>
                {item}
              </blockquote>
            ))}
          </div>
          <p className={styles.hintPositive}>toque para rever a sabotagem</p>
        </article>
      </div>
    </button>
  )
}
