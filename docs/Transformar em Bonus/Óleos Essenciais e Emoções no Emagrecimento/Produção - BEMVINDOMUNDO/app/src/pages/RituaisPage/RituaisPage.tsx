import { useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

import Card from '../../components/Card/Card'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import RecipeDetail from '../../components/RecipeDetail/RecipeDetail'
import recipesData from '../../data/recipes.json'
import { recipeTabOptions } from '../../data/recipesPresentation'
import safetyData from '../../data/safety.json'
import type { Recipe, RecipeTab, SafetyData } from '../../data/types'
import styles from './RituaisPage.module.css'

const recipes = recipesData as Recipe[]
const safety = safetyData as SafetyData
const topicalGuide = safety.sections.find((section) => section.id === 'guia-de-uso-topico')

function isRecipeTab(value: string | null): value is RecipeTab {
  return recipeTabOptions.some((option) => option.value === value)
}

export default function RituaisPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const rawTab = searchParams.get('tab')

  const activeTab: RecipeTab = isRecipeTab(rawTab) ? rawTab : 'topico'
  const tabRecipes = recipes.filter((recipe) => recipe.tab === activeTab)
  const recipeParam = searchParams.get('recipe')
  const expandedRecipe = tabRecipes.find((recipe) => recipe.id === recipeParam) ?? tabRecipes[0] ?? null

  const updateParams = (tab: RecipeTab, recipeId: string | null) => {
    const nextParams = new URLSearchParams()

    if (tab !== 'topico') {
      nextParams.set('tab', tab)
    }

    if (recipeId) {
      nextParams.set('recipe', recipeId)
    }

    setSearchParams(nextParams, { replace: true })
  }

  const handleTabChange = (tab: RecipeTab) => {
    const firstRecipe = recipes.find((recipe) => recipe.tab === tab)

    updateParams(tab, firstRecipe?.id ?? null)
  }

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % recipeTabOptions.length
        break
      case 'ArrowLeft':
        nextIndex = (index - 1 + recipeTabOptions.length) % recipeTabOptions.length
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = recipeTabOptions.length - 1
        break
      default:
        return
    }

    event.preventDefault()

    const nextTab = recipeTabOptions[nextIndex]

    handleTabChange(nextTab.value)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className="headline-lg">Rituais &amp; Receitas</h1>
        <p className="body-md text-variant mt-4">29 protocolos — do café da manhã ao sono</p>
      </header>

      <nav
        role="tablist"
        aria-label="Categorias de receitas"
        aria-orientation="horizontal"
        className={styles.tabs}
      >
        {recipeTabOptions.map((option, index) => {
          const isActive = activeTab === option.value

          return (
            <button
              key={option.value}
              id={`tab-${option.value}`}
              ref={(node) => {
                tabRefs.current[index] = node
              }}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`panel-${option.value}`}
              tabIndex={isActive ? 0 : -1}
              className={[styles.tabButton, isActive ? styles.tabButtonActive : '']
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleTabChange(option.value)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              {option.label}
            </button>
          )
        })}
      </nav>

      <div
        key={activeTab}
        id={`panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={0}
        className={[styles.panel, styles.panelAnimated].join(' ')}
      >
        {activeTab === 'topico' && topicalGuide ? (
          <Card className={styles.editorialCard}>
            <p className="label-md text-variant">Orientações de diluição</p>
            <div className={styles.editorialCopy}>
              {topicalGuide.body.slice(2, 5).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Card>
        ) : null}

        {tabRecipes.map((recipe) => {
          const isExpanded = expandedRecipe?.id === recipe.id
          const detailId = `detail-${recipe.id}`

          return (
            <div key={recipe.id} className={styles.recipeStack}>
              <RecipeCard
                recipe={recipe}
                isExpanded={isExpanded}
                detailsId={detailId}
                onToggle={() => updateParams(activeTab, recipe.id)}
              />

              {isExpanded ? <RecipeDetail id={detailId} recipe={recipe} /> : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
