import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import styles from './BreatheModal.module.css'

const cycleDuration = 19

function getPhase(elapsedSeconds: number) {
  if (elapsedSeconds < 4) {
    return {
      label: 'Inspira',
      secondsLeft: Math.max(1, Math.ceil(4 - elapsedSeconds)),
    }
  }

  if (elapsedSeconds < 11) {
    return {
      label: 'Segura',
      secondsLeft: Math.max(1, Math.ceil(11 - elapsedSeconds)),
    }
  }

  return {
    label: 'Expira',
    secondsLeft: Math.max(1, Math.ceil(cycleDuration - elapsedSeconds)),
  }
}

export default function BreatheModal() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const isOpen = searchParams.get('breathe') === 'open'

  const phase = getPhase(elapsedSeconds)

  useEffect(() => {
    if (!isOpen) {
      setElapsedSeconds(0)
      return
    }

    const startedAt = performance.now()
    const intervalId = window.setInterval(() => {
      const seconds = ((performance.now() - startedAt) / 1000) % cycleDuration
      setElapsedSeconds(seconds)
    }, 200)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.clearInterval(intervalId)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  const openModal = () => {
    const next = new URLSearchParams(searchParams)
    next.set('breathe', 'open')
    setSearchParams(next, { replace: true })
  }

  const closeModal = () => {
    const next = new URLSearchParams(searchParams)
    next.delete('breathe')
    setSearchParams(next, { replace: true })
  }

  return (
    <>
      <button type="button" className={styles.fab} aria-label="Respirar" onClick={openModal}>
        🌬 Respirar
      </button>

      {isOpen ? (
        <div className={styles.overlay} role="presentation" onClick={closeModal}>
          <div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-label="Respiração 4-7-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className={styles.closeButton} onClick={closeModal}>
              Fechar
            </button>

            <div className={styles.orb} aria-hidden="true" />

            <div className={styles.copy} aria-live="polite">
              <p className={styles.phase}>{phase.label}</p>
              <p className={styles.counter}>{phase.secondsLeft}s</p>
              <p className={styles.description}>
                Inspire por 4 segundos, segure por 7 e expire por 8. Repita até o impulso passar.
              </p>
            </div>

            <Link to="/biblioteca/serenity" className={styles.suggestion}>
              Aplique 1 gota de Serenity nos pulsos
            </Link>
          </div>
        </div>
      ) : null}
    </>
  )
}
