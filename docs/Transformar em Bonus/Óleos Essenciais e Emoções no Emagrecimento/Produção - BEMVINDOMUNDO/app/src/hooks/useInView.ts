import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions extends IntersectionObserverInit {
  once?: boolean
}

export default function useInView<T extends Element>({
  once = true,
  root = null,
  rootMargin = '0px',
  threshold = 0,
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null)
  const [isInView, setIsInView] = useState(false)
  const serializedThreshold = Array.isArray(threshold) ? threshold.join(',') : threshold.toString()

  useEffect(() => {
    const element = ref.current

    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)

          if (once) {
            observer.unobserve(entry.target)
          }

          return
        }

        if (!once) {
          setIsInView(false)
        }
      },
      {
        root,
        rootMargin,
        threshold,
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [once, root, rootMargin, serializedThreshold, threshold])

  return { ref, isInView }
}
