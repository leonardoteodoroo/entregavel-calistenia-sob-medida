import { useEffect, useId, useRef, useState } from 'react'
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
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const titleId = useId()
  const descriptionId = useId()
  const isOpen = searchParams.get('breathe') === 'open'

  const phase = getPhase(elapsedSeconds)

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

  useEffect(() => {
    if (!isOpen) {
      setElapsedSeconds(0)
      return
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null

    const startedAt = performance.now()
    const intervalId = window.setInterval(() => {
      const seconds = ((performance.now() - startedAt) / 1000) % cycleDuration
      setElapsedSeconds(seconds)
    }, 200)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const animationFrameId = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus()
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!dialogRef.current) {
        return
      }

      if (event.key === 'Escape') {
        event.preventDefault()
        closeModal()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      )

      if (focusableElements.length === 0) {
        event.preventDefault()
        dialogRef.current.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const currentElement = document.activeElement

      if (event.shiftKey && currentElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && currentElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearInterval(intervalId)
      window.cancelAnimationFrame(animationFrameId)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocusRef.current?.focus()
    }
  }, [isOpen])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.fab}
        aria-label="Respirar"
        onClick={openModal}
      >
        🌬 Respirar
      </button>

      {isOpen ? (
        <div className={styles.overlay} role="presentation" onClick={closeModal}>
          <div
            ref={dialogRef}
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id={titleId} className="sr-only">
              Respiração 4-7-8
            </h2>

            <button
              ref={closeButtonRef}
              type="button"
              className={styles.closeButton}
              onClick={closeModal}
            >
              Fechar
            </button>

            <div className={styles.orb} aria-hidden="true" />

            <div className={styles.copy} aria-live="polite">
              <p className={styles.phase}>{phase.label}</p>
              <p className={styles.counter}>{phase.secondsLeft}s</p>
              <p id={descriptionId} className={styles.description}>
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
