import { Link } from 'react-router-dom'

import Card from '../Card/Card'
import Chip from '../Chip/Chip'
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder'
import { getOilEmoji } from '../../data/presentation'
import type { Oil } from '../../data/types'
import styles from './OilCard.module.css'

export interface OilCardProps {
  oil: Oil
  isActive?: boolean
  search?: string
}

export default function OilCard({ oil, isActive = false, search = '' }: OilCardProps) {
  const cardClassName = [styles.card, isActive ? styles.active : ''].filter(Boolean).join(' ')

  return (
    <Link
      to={{ pathname: `/biblioteca/${oil.id}`, search }}
      className={styles.link}
      aria-current={isActive ? 'page' : undefined}
    >
      <Card className={cardClassName}>
        <ImagePlaceholder
          aspectRatio="1:1"
          emoji={getOilEmoji(oil.id)}
          alt={`Visual botânico de ${oil.name}`}
          pendingNote={`Thumb 80x80 de ${oil.name}`}
          className={styles.thumb}
        />

        <div className={styles.content}>
          <div>
            <h2 className={styles.title}>{oil.name}</h2>
            <p className={styles.subtitle}>{oil.subtitle}</p>
          </div>

          <div className={styles.tags}>
            {oil.tags.slice(0, 2).map((tag) => (
              <Chip key={`${oil.id}-${tag}`} label={tag} />
            ))}
          </div>
        </div>
      </Card>
    </Link>
  )
}
