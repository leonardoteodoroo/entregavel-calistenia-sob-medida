import { useState } from 'react'

import type { MindsetPair } from '../../data/types'
import styles from './SabotageCard.module.css'

export interface SabotageCardProps {
  pair: MindsetPair
}

export default function SabotageCard({ pair }: SabotageCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <button
      type="button"
      className={styles.trigger}
      data-sabotage-card={pair.id}
      aria-pressed={flipped}
      onClick={() => setFlipped((current) => !current)}
    >
      <div className={[styles.card3d, flipped ? styles.card3dFlipped : ''].filter(Boolean).join(' ')}>
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
