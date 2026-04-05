import { useState } from 'react'

import Button from '../Button/Button'
import Chip from '../Chip/Chip'
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder'
import { getOilEmoji, oilFilterLabels } from '../../data/presentation'
import type { Oil } from '../../data/types'
import styles from './OilDetail.module.css'

const usageSections = [
  { key: 'aromatic', label: 'Aromático', icon: '🌬' },
  { key: 'topical', label: 'Tópico', icon: '💆' },
  { key: 'ingestion', label: 'Ingestão', icon: '💊' },
] as const

type UsageKey = (typeof usageSections)[number]['key']

function splitParagraphs(text: string) {
  return text
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

export interface OilDetailProps {
  oil: Oil
  catalogSearch?: string
}

export default function OilDetail({ oil, catalogSearch = '' }: OilDetailProps) {
  const [expandedSections, setExpandedSections] = useState<Record<UsageKey, boolean>>({
    aromatic: true,
    topical: false,
    ingestion: false,
  })

  const paragraphs = splitParagraphs(oil.description)

  return (
    <section aria-label={`Ficha detalhada de ${oil.name}`} className={styles.shell}>
      <ImagePlaceholder
        aspectRatio="4:3"
        emoji={getOilEmoji(oil.id)}
        alt={`Hero editorial de ${oil.name}`}
        pendingNote={`Hero 4:3 de ${oil.name}`}
        className={styles.hero}
      />

      <div className={styles.body}>
        <div className={styles.topRow}>
          <div className={styles.tags}>
            {oil.tags.map((tag) => (
              <Chip key={`${oil.id}-${tag}`} label={tag} />
            ))}
            <Chip label={oilFilterLabels[oil.filter]} />
          </div>

          <Button to={{ pathname: '/biblioteca', search: catalogSearch }} variant="secondary">
            Fechar ficha
          </Button>
        </div>

        <h2 className={styles.title}>{oil.name}</h2>
        <p className={styles.subtitle}>{oil.subtitle}</p>

        <div className={styles.copy}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className={styles.accordion}>
          <p className="label-md text-variant">Uso prático</p>

          <div className={styles.accordionList}>
            {usageSections.map((section) => {
              const content =
                oil.usage[section.key] || 'Sem orientação específica nesta categoria no texto-base.'
              const isOpen = expandedSections[section.key]
              const panelId = `${oil.id}-${section.key}`

              return (
                <div key={section.key} className={styles.accordionItem}>
                  <button
                    type="button"
                    className={styles.accordionButton}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() =>
                      setExpandedSections((current) => ({
                        ...current,
                        [section.key]: !current[section.key],
                      }))
                    }
                  >
                    <span>
                      {section.icon} {section.label}
                    </span>
                    <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
                  </button>

                  <div id={panelId} className={styles.accordionPanel} hidden={!isOpen}>
                    <p>{content}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
