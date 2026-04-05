import styles from './Chip.module.css'

export interface ChipProps {
  label: string
  active?: boolean
  onClick?: () => void
  className?: string
}

export default function Chip({ label, active = false, onClick, className }: ChipProps) {
  const resolvedClassName = [styles.chip, active ? styles.active : '', className]
    .filter(Boolean)
    .join(' ')

  if (!onClick) {
    return <span className={resolvedClassName}>{label}</span>
  }

  return (
    <button
      type="button"
      className={resolvedClassName}
      aria-pressed={active}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
