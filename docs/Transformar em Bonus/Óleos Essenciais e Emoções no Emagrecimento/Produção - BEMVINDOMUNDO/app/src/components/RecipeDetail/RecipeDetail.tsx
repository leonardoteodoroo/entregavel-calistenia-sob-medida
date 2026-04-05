import { useState } from 'react'

import Card from '../Card/Card'
import GlassPill from '../GlassPill/GlassPill'
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder'
import StepNumber from '../StepNumber/StepNumber'
import { getRecipeEmoji } from '../../data/recipesPresentation'
import type { Recipe } from '../../data/types'
import styles from './RecipeDetail.module.css'

function isInstructionLine(value: string) {
  return value.trim().endsWith('.')
}

function isGenericPlaceholder(recipe: Recipe) {
  return (
    recipe.steps.length === 1 && recipe.steps[0].includes('orientação editorial original')
  )
}

function getChecklistItems(recipe: Recipe) {
  return recipe.ingredients.filter((item) => !isInstructionLine(item))
}

function getPreparationSteps(recipe: Recipe) {
  if (!isGenericPlaceholder(recipe)) {
    return recipe.steps
  }

  const inferredSteps = recipe.ingredients.filter(isInstructionLine)

  return inferredSteps.length > 0 ? inferredSteps : recipe.steps
}

export interface RecipeDetailProps {
  recipe: Recipe
  id?: string
}

export default function RecipeDetail({ recipe, id }: RecipeDetailProps) {
  const checklistItems = getChecklistItems(recipe)
  const preparationSteps = getPreparationSteps(recipe)
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({})

  return (
    <section id={id} className={styles.shell}>
      <Card className={styles.card}>
        <ImagePlaceholder
          aspectRatio="16:9"
          emoji={getRecipeEmoji(recipe.tab)}
          alt={`Hero editorial de ${recipe.name}`}
          pendingNote={`Hero 16:9 de ${recipe.name}`}
          className={styles.hero}
        />

        <div className={styles.pills}>
          <GlassPill>{recipe.time}</GlassPill>
          <GlassPill>{recipe.frequency}</GlassPill>
          <GlassPill>{recipe.periodLabel}</GlassPill>
        </div>

        <div className={styles.body}>
          <p className={styles.label}>{recipe.periodLabel}</p>
          <h2 className={styles.title}>{recipe.sopTitle}</h2>
          <p className={styles.name}>{recipe.name}</p>

          <div className={styles.section}>
            <p className="label-md text-variant">📋 O que usar</p>
            <div className={styles.checklist}>
              {checklistItems.map((item, index) => (
                <label key={`${recipe.id}-${item}`} className={styles.checkItem}>
                  <input
                    type="checkbox"
                    checked={Boolean(checkedItems[index])}
                    onChange={() =>
                      setCheckedItems((current) => ({
                        ...current,
                        [index]: !current[index],
                      }))
                    }
                  />
                  <span>💧 {item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <p className="label-md text-variant">🔢 Como fazer</p>

            <div className={styles.steps}>
              {preparationSteps.map((step, index) => (
                <div key={`${recipe.id}-step-${index + 1}`} className={styles.stepBlock}>
                  <StepNumber
                    number={index + 1}
                    title={`Etapa ${index + 1}`}
                    description={<p>{step}</p>}
                  />

                  {index < preparationSteps.length - 1 ? (
                    <ImagePlaceholder
                      aspectRatio="3:2"
                      emoji={getRecipeEmoji(recipe.tab)}
                      alt={`Passo ${index + 1} de ${recipe.name}`}
                      pendingNote={`Passo ${index + 1} de ${recipe.name}`}
                      className={styles.stepImage}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </section>
  )
}
