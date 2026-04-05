import Card from '../Card/Card'
import GlassPill from '../GlassPill/GlassPill'
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder'
import { getRecipeEmoji } from '../../data/recipesPresentation'
import type { Recipe } from '../../data/types'
import styles from './RecipeCard.module.css'

export interface RecipeCardProps {
  recipe: Recipe
  isExpanded?: boolean
  detailsId?: string
  onToggle: () => void
}

export default function RecipeCard({
  recipe,
  isExpanded = false,
  detailsId,
  onToggle,
}: RecipeCardProps) {
  return (
    <button
      type="button"
      className={styles.trigger}
      aria-expanded={isExpanded}
      aria-controls={detailsId}
      onClick={onToggle}
    >
      <Card className={[styles.card, isExpanded ? styles.expanded : ''].filter(Boolean).join(' ')}>
        <ImagePlaceholder
          aspectRatio="16:9"
          emoji={getRecipeEmoji(recipe.tab)}
          alt={`Preview editorial de ${recipe.name}`}
          pendingNote={`Hero 16:9 de ${recipe.name}`}
          className={styles.hero}
        />

        <div className={styles.pills}>
          <GlassPill>{recipe.time}</GlassPill>
          <GlassPill>{recipe.frequency}</GlassPill>
          <GlassPill>{recipe.periodLabel}</GlassPill>
        </div>

        <div className={styles.content}>
          <p className={styles.label}>{recipe.periodLabel}</p>
          <h2 className={styles.title}>{recipe.sopTitle}</h2>
          <p className={styles.name}>{recipe.name}</p>
        </div>
      </Card>
    </button>
  )
}
