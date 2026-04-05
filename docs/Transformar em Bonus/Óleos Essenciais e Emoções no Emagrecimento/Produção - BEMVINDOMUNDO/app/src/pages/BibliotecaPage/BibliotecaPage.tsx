import { useId } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import Card from '../../components/Card/Card'
import Chip from '../../components/Chip/Chip'
import OilCard from '../../components/OilCard/OilCard'
import OilDetail from '../../components/OilDetail/OilDetail'
import oilsData from '../../data/oils.json'
import { normalizeSearchText, oilFilterOptions } from '../../data/presentation'
import type { Oil, OilFilter } from '../../data/types'
import styles from './BibliotecaPage.module.css'

type LibraryFilter = OilFilter | 'todos'

const oils = oilsData as Oil[]

function isLibraryFilter(value: string | null): value is LibraryFilter {
  return value === 'todos' || oilFilterOptions.some((option) => option.value === value)
}

export default function BibliotecaPage() {
  const searchId = useId()
  const { oilId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const rawFilter = searchParams.get('filter')

  const selectedFilter: LibraryFilter = isLibraryFilter(rawFilter) ? rawFilter : 'todos'
  const searchQuery = searchParams.get('q') ?? ''
  const currentSearch = searchParams.toString()
  const routeSearch = currentSearch ? `?${currentSearch}` : ''

  const normalizedQuery = normalizeSearchText(searchQuery.trim())
  const selectedOil = oilId ? oils.find((oil) => oil.id === oilId) : undefined

  const visibleOils = oils.filter((oil) => {
    const matchesFilter = selectedFilter === 'todos' || oil.filter === selectedFilter

    const haystack = normalizeSearchText(
      [oil.name, oil.subtitle, oil.description, oil.usageSummary, oil.tags.join(' ')].join(' '),
    )

    const matchesQuery = normalizedQuery.length === 0 || haystack.includes(normalizedQuery)

    return matchesFilter && matchesQuery
  })

  const updateSearchParams = (filter: LibraryFilter, query: string) => {
    const nextParams = new URLSearchParams()
    const trimmedQuery = query.trim()

    if (filter !== 'todos') {
      nextParams.set('filter', filter)
    }

    if (trimmedQuery) {
      nextParams.set('q', trimmedQuery)
    }

    setSearchParams(nextParams, { replace: true })
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className="headline-lg">Biblioteca Botânica</h1>
        <p className="body-md text-variant mt-4">17 óleos essenciais catalogados</p>
      </header>

      <section className={styles.controls}>
        <label className="sr-only" htmlFor={searchId}>
          Buscar óleos essenciais
        </label>
        <input
          id={searchId}
          type="search"
          value={searchQuery}
          className={styles.searchInput}
          placeholder="Qual composto molecular?"
          onChange={(event) => updateSearchParams(selectedFilter, event.target.value)}
        />

        <div className={styles.filters} role="toolbar" aria-label="Filtros da biblioteca">
          {oilFilterOptions.map((option) => (
            <Chip
              key={option.value}
              label={option.emoji ? `${option.emoji} ${option.label}` : option.label}
              active={selectedFilter === option.value}
              onClick={() => updateSearchParams(option.value, searchQuery)}
            />
          ))}
        </div>
      </section>

      <section aria-label="Catálogo de Óleos" className={styles.catalog}>
        {oilId && !selectedOil ? (
          <Card className={styles.emptyState}>
            <p className="title-sm">Óleo não encontrado</p>
            <p className="body-md text-variant mt-4">
              O deep-link solicitado não corresponde a nenhuma ficha do acervo.
            </p>
          </Card>
        ) : null}

        {selectedOil ? <OilDetail oil={selectedOil} catalogSearch={routeSearch} /> : null}

        <div className={styles.resultsRow}>
          <p className="body-md text-variant">
            {visibleOils.length} {visibleOils.length === 1 ? 'óleo encontrado' : 'óleos encontrados'}
          </p>
        </div>

        {visibleOils.length > 0 ? (
          visibleOils.map((oil) => (
            <OilCard
              key={oil.id}
              oil={oil}
              isActive={oil.id === oilId}
              search={routeSearch}
            />
          ))
        ) : (
          <Card className={styles.emptyState}>
            <p className="title-sm">Nenhum óleo corresponde à busca</p>
            <p className="body-md text-variant mt-4">
              Ajuste o termo pesquisado ou selecione outra família botânica.
            </p>
          </Card>
        )}
      </section>
    </div>
  )
}
