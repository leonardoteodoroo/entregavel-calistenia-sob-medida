import ImagePlaceholder from '../../components/ImagePlaceholder/ImagePlaceholder'
import OrganicIcon, { type OrganicIconName } from '../../components/OrganicIcon/OrganicIcon'
import PullQuote from '../../components/PullQuote/PullQuote'
import safetyData from '../../data/safety.json'
import type { PullQuote as PullQuoteEntry, SafetyData, SafetySection } from '../../data/types'

import styles from './GuiasPage.module.css'

const data = safetyData as SafetyData

const sectionMeta: Record<
  SafetySection['variant'],
  {
    eyebrow: string
    icon?: string
    tinted?: boolean
  }
> = {
  about: { eyebrow: '📖 SOBRE A AUTORA' },
  legal: { eyebrow: '⚠️ AVISO LEGAL', icon: '⚠️', tinted: true },
  alerts: { eyebrow: '🔒 ALERTAS DE SEGURANÇA' },
  ingestion: { eyebrow: '💊 GUIA DE INGESTÃO SEGURA', tinted: true },
  topical: { eyebrow: '💆 GUIA DE USO TÓPICO' },
  closing: { eyebrow: '🌿 MENSAGEM FINAL' },
}

const alertIcons: OrganicIconName[] = ['shield', 'capsule', 'dropper', 'sun', 'droplet']

const contraindications = [
  'Grávidas e lactantes: consultar médico antes.',
  'Epilepsia ou histórico de convulsões: validar cada óleo com um profissional.',
  'Medicamentos para diabetes, hipertensão ou anticoagulantes: evitar uso interno sem liberação clínica.',
  'Cirurgia recente, amamentação ou recuperação sensível: priorizar formas aromáticas e orientação profissional.',
]

function getQuoteAfterSection(sectionId: string) {
  return data.pullQuotes.find((entry) => entry.afterSection === sectionId && entry.id !== 'quote-5') ?? null
}

function DropCapParagraph({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  return <p className={[styles.body, styles.dropCap, className].filter(Boolean).join(' ')}>{children}</p>
}

function EditorialParagraph({ children }: { children: string }) {
  return <p className={styles.body}>{children}</p>
}

function AboutSection({ section }: { section: SafetySection }) {
  const [leadParagraph, ...remainingParagraphs] = section.body

  return (
    <section aria-label={section.title} className={[styles.section, styles.asymmetric].join(' ')}>
      <p className={styles.eyebrow}>{sectionMeta.about.eyebrow}</p>

      <ImagePlaceholder
        aspectRatio="16:9"
        emoji="🌾"
        alt="Retrato editorial soft-focus da autora"
        pendingNote="Pendente: foto da autora em retrato soft-focus"
        className={styles.heroImage}
      />

      <div className={styles.copyStack}>
        <DropCapParagraph>{leadParagraph}</DropCapParagraph>
        {remainingParagraphs.map((paragraph, index) => (
          <EditorialParagraph key={`${section.id}-${index + 1}`}>{paragraph}</EditorialParagraph>
        ))}
      </div>
    </section>
  )
}

function LegalSection({ section }: { section: SafetySection }) {
  return (
    <section
      aria-label={section.title}
      className={[styles.section, styles.tintedSection, styles.asymmetric].join(' ')}
    >
      <div className={styles.inlineHeader}>
        <span className={styles.inlineIcon} aria-hidden="true">
          {sectionMeta.legal.icon}
        </span>
        <p className={styles.eyebrow}>{sectionMeta.legal.eyebrow.replace('⚠️ ', '')}</p>
      </div>

      <div className={styles.copyStack}>
        {section.body.map((paragraph, index) =>
          index === 0 ? (
            <DropCapParagraph key={`${section.id}-${index}`}>{paragraph}</DropCapParagraph>
          ) : (
            <EditorialParagraph key={`${section.id}-${index}`}>{paragraph}</EditorialParagraph>
          ),
        )}
      </div>
    </section>
  )
}

function AlertsSection({ section }: { section: SafetySection }) {
  return (
    <section aria-label={section.title} className={[styles.section, styles.asymmetric].join(' ')}>
      <p className={styles.eyebrow}>{sectionMeta.alerts.eyebrow}</p>

      <ul className={styles.alertList}>
        {section.bullets?.map((bullet, index) => (
          <li key={bullet} className={styles.alertItem}>
            <span className={styles.alertIcon} aria-hidden="true">
              <OrganicIcon name={alertIcons[index] ?? 'shield'} size={22} />
            </span>
            <p className={styles.body}>{bullet}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

function IngestionSection({ section }: { section: SafetySection }) {
  const [leadParagraph, ...remainingParagraphs] = section.body

  return (
    <section
      aria-label={section.title}
      className={[styles.section, styles.tintedSection, styles.asymmetric].join(' ')}
    >
      <p className={styles.eyebrow}>{sectionMeta.ingestion.eyebrow}</p>

      <div className={styles.copyStack}>
        <DropCapParagraph>{leadParagraph}</DropCapParagraph>
        {remainingParagraphs.map((paragraph, index) => (
          <EditorialParagraph key={`${section.id}-${index + 1}`}>{paragraph}</EditorialParagraph>
        ))}
      </div>

      <div className={styles.warningBox}>
        <p className={styles.warningLabel}>⚠️ CONTRAINDICAÇÕES</p>
        <ul className={styles.warningList}>
          {contraindications.map((item) => (
            <li key={item} className={styles.warningItem}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function TopicalSection({ section }: { section: SafetySection }) {
  const [leadParagraph, ...remainingParagraphs] = section.body

  return (
    <section aria-label={section.title} className={[styles.section, styles.asymmetric].join(' ')}>
      <p className={styles.eyebrow}>{sectionMeta.topical.eyebrow}</p>

      <ImagePlaceholder
        aspectRatio="16:9"
        emoji="🫶"
        alt="Foto editorial de mãos aplicando óleo essencial"
        pendingNote="Pendente: mãos massageando com luz quente"
        className={styles.heroImage}
      />

      <div className={styles.copyStack}>
        <DropCapParagraph>{leadParagraph}</DropCapParagraph>
        {remainingParagraphs.map((paragraph, index) => (
          <EditorialParagraph key={`${section.id}-${index + 1}`}>{paragraph}</EditorialParagraph>
        ))}
      </div>
    </section>
  )
}

function ClosingSection({ section }: { section: SafetySection }) {
  const [closingMessage, signature] = section.body

  return (
    <>
      <section
        aria-label={section.title}
        className={[styles.section, styles.asymmetric, styles.closingSection].join(' ')}
      >
        <p className={styles.closingEyebrow}>{sectionMeta.closing.eyebrow}</p>
        <h2 className={styles.closingTitle}>{closingMessage}</h2>
        <p className={styles.closingSignature}>{signature}</p>
      </section>

      <section
        aria-label="Fontes"
        className={[styles.section, styles.tintedSection, styles.sourcesSection].join(' ')}
      >
        <p className={styles.eyebrow}>📚 FONTES</p>
        <ul className={styles.sourcesList}>
          {section.sources?.map((source) => (
            <li key={source} className={styles.sourceItem}>
              {source}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

function SectionQuote({ quote, bridge }: { quote: PullQuoteEntry; bridge?: boolean }) {
  return (
    <PullQuote className={bridge ? styles.bridgeQuote : styles.quote}>
      {quote.text}
    </PullQuote>
  )
}

export default function GuiasPage() {
  const legalQuote = getQuoteAfterSection('aviso-legal')
  const alertsQuote = getQuoteAfterSection('alertas-de-seguranca')
  const ingestionQuote = getQuoteAfterSection('guia-de-ingestao')
  const topicalQuote = getQuoteAfterSection('guia-de-uso-topico')
  const quoteBeforeClosing = data.pullQuotes.find((entry) => entry.id === 'quote-5')

  return (
    <div className={styles.page}>
      <header className={[styles.section, styles.header].join(' ')}>
        <p className={styles.kicker}>Know the ritual. Respect the dose.</p>
        <h1 className="headline-lg">Guias &amp; Segurança</h1>
        <p className={[styles.body, styles.subtitle].join(' ')}>
          Conhecimento é a melhor proteção para transformar ritual em cuidado real.
        </p>
      </header>

      <AboutSection section={data.sections[0]} />
      <LegalSection section={data.sections[1]} />
      {legalQuote ? <SectionQuote quote={legalQuote} /> : null}

      <AlertsSection section={data.sections[2]} />
      {alertsQuote ? <SectionQuote quote={alertsQuote} /> : null}

      <IngestionSection section={data.sections[3]} />
      {ingestionQuote ? <SectionQuote quote={ingestionQuote} /> : null}

      <TopicalSection section={data.sections[4]} />
      {topicalQuote ? <SectionQuote quote={topicalQuote} /> : null}

      {quoteBeforeClosing ? <SectionQuote quote={quoteBeforeClosing} bridge /> : null}
      <ClosingSection section={data.sections[5]} />
    </div>
  )
}
