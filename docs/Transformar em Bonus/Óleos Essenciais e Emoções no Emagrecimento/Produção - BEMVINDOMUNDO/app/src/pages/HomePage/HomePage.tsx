import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/Button/Button'
import Card from '../../components/Card/Card'
import Chip from '../../components/Chip/Chip'
import GlassPill from '../../components/GlassPill/GlassPill'
import ImagePlaceholder from '../../components/ImagePlaceholder/ImagePlaceholder'
import StepNumber from '../../components/StepNumber/StepNumber'
import oilsData from '../../data/oils.json'
import { getOilEmoji } from '../../data/presentation'
import spotlightsData from '../../data/spotlights.json'
import type { Oil, Spotlight } from '../../data/types'
import styles from './HomePage.module.css'

const oils = oilsData as Oil[]
const spotlights = spotlightsData as Spotlight[]
const oilById = new Map(oils.map((oil) => [oil.id, oil]))

const neuralSteps = [
  {
    number: 1,
    title: 'Amygdala Response',
    eyebrow: 'O portal olfativo do emagrecimento',
    description:
      'Quando você inala um óleo essencial, os compostos voláteis atingem a amígdala cerebral em menos de 3 segundos e interceptam o circuito emocional antes que a compulsão alimentar se forme.',
  },
  {
    number: 2,
    title: 'VOC Signal Transmission',
    eyebrow: 'Compostos que reprogramam receptores',
    description:
      'Limoneno, Nootkathone e Linalol são moléculas com ação farmacológica real. Elas ativam enzimas no fígado, elevam norepinefrina e ajudam o corpo a reduzir tecido adiposo e inflamação metabólica.',
  },
  {
    number: 3,
    title: 'Dopaminergic Regulation',
    eyebrow: 'Do humor ao metabolismo, o circuito completo',
    description:
      'Canela regula o desejo por doces, Peppermint corta o impulso por açúcar e Fennel favorece a melatonina. Quando o circuito dopaminérgico estabiliza, o corpo para de pedir recompensa calórica.',
  },
] as const

const quickLinks = [
  {
    to: '/biblioteca',
    icon: '🌿',
    title: 'Biblioteca Botânica',
    description: '17 óleos essenciais para metabolismo, humor e digestão.',
  },
  {
    to: '/rituais',
    icon: '🧪',
    title: 'Rituais & Receitas',
    description: '29 protocolos práticos do despertar ao sono profundo.',
  },
  {
    to: '/mindset',
    icon: '🧠',
    title: 'Mindset',
    description: 'Cartas contra sabotagem emocional, culpa e impulso.',
  },
  {
    to: '/guias',
    icon: '⚖️',
    title: 'Guias & Segurança',
    description: 'Uso responsável, alertas editoriais e respaldo técnico.',
  },
] as const

const featuredOilIds = ['grapefruit', 'peppermint', 'serenity', 'wild-orange'] as const
const featuredOils = featuredOilIds
  .map((oilId) => oilById.get(oilId))
  .filter((oil): oil is Oil => oil !== undefined)

function getGreeting(date: Date) {
  const hours = date.getHours()

  if (hours < 12) {
    return 'Bom dia'
  }

  if (hours < 18) {
    return 'Boa tarde'
  }

  return 'Boa noite'
}

function getDayOfYear(date: Date) {
  const start = Date.UTC(date.getFullYear(), 0, 0)
  const current = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())

  return Math.floor((current - start) / 86_400_000)
}

export default function HomePage() {
  const [visibleSteps, setVisibleSteps] = useState<Record<number, boolean>>({})
  const stepRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          const index = Number(entry.target.getAttribute('data-step-index'))

          setVisibleSteps((current) => {
            if (current[index]) {
              return current
            }

            return { ...current, [index]: true }
          })

          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.2,
      },
    )

    stepRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  if (spotlights.length === 0) {
    return (
      <section className="section">
        <p className="label-md">Home indisponível</p>
        <h1 className="display-lg mt-4">Santuário em preparação</h1>
        <p className="body-md text-variant mt-4">
          Os dados editoriais da Home ainda não foram carregados.
        </p>
      </section>
    )
  }

  const now = new Date()
  const greeting = getGreeting(now)
  const spotlight = spotlights[getDayOfYear(now) % spotlights.length] ?? spotlights[0]
  const spotlightOil = oilById.get(spotlight.oilId)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className="body-md text-variant">{greeting},</p>
          <p className="title-sm">Bem-vinda ao Santuário</p>
        </div>

        <div className={styles.avatar} aria-hidden="true">
          🌸
        </div>
      </header>

      <section aria-label="Óleo do dia" className={styles.heroSection}>
        <ImagePlaceholder
          aspectRatio="3:4"
          emoji={getOilEmoji(spotlight.oilId)}
          alt={`Visual botânico de ${spotlight.oilName}`}
          pendingNote={`Foto macro vertical de ${spotlight.oilName}`}
          className={styles.heroImage}
        />

        <div className={styles.heroOverlay}>
          <div className={styles.heroPills}>
            <GlassPill className={styles.heroPill}>Óleo do dia</GlassPill>
            <GlassPill className={styles.heroPill}>{spotlight.oilName}</GlassPill>
          </div>

          <p className={`label-md ${styles.heroLabel}`}>{spotlight.label}</p>
          <h1 className={styles.heroTitle}>{spotlight.title}</h1>
          {spotlightOil ? <p className={styles.heroSubtitle}>{spotlightOil.subtitle}</p> : null}
          <p className={styles.heroCopy}>{spotlight.callout}</p>

          <Button
            to={`/biblioteca/${spotlight.oilId}`}
            variant="secondary"
            className={styles.heroButton}
          >
            Conhecer {spotlight.oilName} →
          </Button>
        </div>
      </section>

      <section aria-label="Como funciona" className={styles.neuralSection}>
        <p className="label-md text-variant">Como seu cérebro processa os óleos</p>

        <div className={styles.neuralList}>
          {neuralSteps.map((step, index) => {
            const isVisible = visibleSteps[index]
            const stepClassName = [styles.neuralStep, isVisible ? styles.neuralStepVisible : '']
              .filter(Boolean)
              .join(' ')

            return (
              <div
                key={step.title}
                ref={(node) => {
                  stepRefs.current[index] = node
                }}
                data-step-index={index}
                className={stepClassName}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <StepNumber
                  number={step.number}
                  title={step.title}
                  description={
                    <>
                      <p className={styles.neuralEyebrow}>{step.eyebrow}</p>
                      <p>{step.description}</p>
                    </>
                  }
                />
              </div>
            )
          })}
        </div>
      </section>

      <section aria-label="Navegação rápida" className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className="label-md text-variant">Atalhos rápidos</p>
          <h2 className="headline-sm mt-4">Quatro portas para o seu ritual diário</h2>
        </div>

        <div className={styles.quickGrid}>
          {quickLinks.map((item) => (
            <Link key={item.to} to={item.to} className={styles.quickLink}>
              <Card className={styles.quickCard}>
                <span className={styles.quickIcon} aria-hidden="true">
                  {item.icon}
                </span>
                <p className={styles.quickTitle}>{item.title}</p>
                <p className={styles.quickDescription}>{item.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section aria-label="Compostos biológicos em destaque" className={styles.section}>
        <div className={styles.sectionHeading}>
          <div>
            <p className="label-md text-variant">Slide to Compare</p>
            <h2 className="headline-sm mt-4">Compostos biológicos em foco</h2>
          </div>
          <p className={styles.carouselHint}>Deslize lateralmente</p>
        </div>

        <div className={styles.carousel} role="list" aria-label="Óleos em destaque">
          {featuredOils.map((oil) => (
            <Card key={oil.id} as="article" variant="elevated" className={styles.compareCard}>
              <ImagePlaceholder
                aspectRatio="4:3"
                emoji={getOilEmoji(oil.id)}
                alt={`Hero editorial de ${oil.name}`}
                pendingNote={`Hero 4:3 de ${oil.name}`}
                className={styles.compareImage}
              />

              <div className={styles.compareContent}>
                <div>
                  <p className={styles.compareTitle}>{oil.name}</p>
                  <p className={styles.compareSubtitle}>{oil.subtitle}</p>
                </div>

                <div className={styles.compareTags}>
                  {oil.tags.slice(0, 2).map((tag) => (
                    <Chip key={`${oil.id}-${tag}`} label={tag} />
                  ))}
                </div>

                <p className={styles.compareSummary}>{oil.usageSummary}</p>

                <Button to={`/biblioteca/${oil.id}`} variant="secondary">
                  Abrir ficha →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
