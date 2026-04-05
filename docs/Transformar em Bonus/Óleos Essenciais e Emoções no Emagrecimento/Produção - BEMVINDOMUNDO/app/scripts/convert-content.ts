import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

type OilFilter =
  | 'citricos'
  | 'amadeirados'
  | 'florais'
  | 'especiarias'
  | 'mentolados'
  | 'detox'

type RecipeTab = 'topico' | 'culinaria' | 'trimshake' | 'bebidas' | 'difusao'
type RecipePeriod = 'AM' | 'PM' | '16h' | 'atemporal'

interface Oil {
  id: string
  name: string
  subtitle: string
  tags: string[]
  filter: OilFilter
  description: string
  usageSummary: string
  usage: {
    aromatic: string
    topical: string
    ingestion: string
  }
  sourceFile: string
}

interface Recipe {
  id: string
  name: string
  sopTitle: string
  tab: RecipeTab
  format: 'recipe' | 'capsule' | 'diffuser'
  period: RecipePeriod
  periodLabel: string
  time: string
  frequency: string
  ingredients: string[]
  steps: string[]
  notes: string[]
  oilsUsed: string[]
  sourceFile: string
}

interface Tip {
  id: string
  number: number
  text: string
  label: string
  alliedOil: string
  alliedOilName: string
  alliedOilReason: string
  sourceFile: string
}

interface MindsetPair {
  id: string
  theme: string
  sabotage: string
  positive: string[]
}

interface MindsetData {
  sabotage: string[]
  positive: string[]
  pairs: MindsetPair[]
}

interface Spotlight {
  id: string
  oilId: string
  oilName: string
  title: string
  label: string
  callout: string
  suggestedRecipe: string
  sourceFile: string
}

interface SafetySection {
  id: string
  title: string
  variant:
    | 'about'
    | 'legal'
    | 'alerts'
    | 'ingestion'
    | 'topical'
    | 'closing'
  body: string[]
  bullets?: string[]
  sources?: string[]
  sourceFiles: string[]
}

interface PullQuote {
  id: string
  afterSection: string
  placement: string
  text: string
}

interface SafetyData {
  sections: SafetySection[]
  pullQuotes: PullQuote[]
}

interface RecipeMetadata {
  key: string
  sopTitle: string
  period: RecipePeriod
  periodLabel: string
  time: string
  frequency: string
}

interface TipMetadata {
  label: string
  alliedOilName: string
  alliedOilReason: string
}

const scriptDir = dirname(fileURLToPath(import.meta.url))
const appRoot = join(scriptDir, '..')
const contentRoot = join(scriptDir, '..', '..', '..')
const dataDir = join(appRoot, 'src', 'data')

const knownOilNames = [
  'Serenity',
  'Lime e Lemon',
  'Basil',
  'Camomila Romana',
  'Smart & Sassy',
  'Balance',
  'Wild Orange',
  'Grapefruit',
  'Cinnamon Bark',
  'Gengibre',
  'Peppermint',
  'Alecrim',
  'Fennel',
  'Turmeric',
  'Sândalo Hawaiano',
  'Cilantro',
  'Petitgrain',
  'Lemon',
  'Lime',
  'Clove',
  'Frankincense',
  'Cedro',
  'Ylang Ylang',
  'Clary Sage',
  'Lavanda',
  'Eucalipto',
  'Tangerina',
  'Juniper Berry',
  'Blue Tansy',
  'Olíbano',
  'Vetiver',
]

const oilAliases = new Map<string, string>([
  ['lemon', 'lime-e-lemon'],
  ['lime', 'lime-e-lemon'],
  ['lime e lemon', 'lime-e-lemon'],
  ['sandalo hawaiano', 'sandalo-hawaiano'],
  ['sândalo hawaiano', 'sandalo-hawaiano'],
  ['smart e sassy', 'smart-e-sassy'],
  ['smart & sassy', 'smart-e-sassy'],
  ['camomila romana', 'camomila-romana'],
  ['wild orange', 'wild-orange'],
  ['cinnamon bark', 'cinnamon-bark'],
])

const oilDisplayAliases = new Map<string, string>([
  ['lime-e-lemon', 'Lime e Lemon'],
  ['sandalo-hawaiano', 'Sândalo Hawaiano'],
  ['smart-e-sassy', 'Smart & Sassy'],
  ['camomila-romana', 'Camomila Romana'],
  ['wild-orange', 'Wild Orange'],
  ['cinnamon-bark', 'Cinnamon Bark'],
])

const usageKeywords = [
  'inger',
  'capsul',
  'agua',
  'chá',
  'cha',
  'difus',
  'inal',
  'aromat',
  'topic',
  'massag',
  'pele',
]

function readText(relativePath: string): string {
  return readFileSync(join(contentRoot, relativePath), 'utf8').replace(/\r/g, '').trim()
}

function readTextAbsolute(path: string): string {
  return readFileSync(path, 'utf8').replace(/\r/g, '').trim()
}

function readTxtFiles(relativeDir: string): string[] {
  const absoluteDir = join(contentRoot, relativeDir)
  return readdirSync(absoluteDir)
    .filter((entry) => entry.endsWith('.txt'))
    .sort((left, right) => left.localeCompare(right))
    .map((entry) => join(absoluteDir, entry))
}

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function normalizeKey(value: string): string {
  return normalizeWhitespace(
    value
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/&/g, ' e ')
      .replace(/[“”"']/g, '')
      .replace(/\(.*?\)/g, ' ')
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      .toLowerCase(),
  )
}

function slugify(value: string): string {
  return normalizeKey(value).replace(/\s+/g, '-')
}

function splitParagraphs(raw: string): string[] {
  return raw
    .split(/\n\s*\n/)
    .map((block) => normalizeWhitespace(block.replace(/\n/g, ' ')))
    .filter(Boolean)
}

function stripLeadingHeading(paragraphs: string[]): string[] {
  if (paragraphs.length <= 1) {
    return paragraphs
  }

  const [first, ...rest] = paragraphs
  return first.split(' ').length <= 3 ? rest : paragraphs
}

function getNonEmptyLines(raw: string): string[] {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function unique<T>(items: T[]): T[] {
  return [...new Set(items)]
}

function normalizeOilId(value: string): string {
  const normalized = normalizeKey(value)
  return oilAliases.get(normalized) ?? slugify(value)
}

function displayOilNameFromId(id: string): string {
  return oilDisplayAliases.get(id) ?? id.split('-').map(capitalize).join(' ')
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function normalizePeriod(value: string): RecipePeriod {
  if (value.includes('ATEMPORAL')) {
    return 'atemporal'
  }
  if (value.startsWith('AM')) {
    return 'AM'
  }
  if (value.startsWith('PM')) {
    return 'PM'
  }
  if (value.startsWith('16:00')) {
    return '16h'
  }
  throw new Error(`Período não suportado: ${value}`)
}

function normalizeStepLines(lines: string[]): string[] {
  const steps: string[] = []

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line || line.startsWith('---')) {
      continue
    }
    if (line.startsWith('(') && line.endsWith(')')) {
      continue
    }
    if (line.startsWith('DICA:')) {
      continue
    }

    const cleaned = line.replace(/^\d+\.\s*/, '')
    const previous = steps.at(-1)

    if (!previous) {
      steps.push(cleaned)
      continue
    }

    if (/^\d+\./.test(line)) {
      steps.push(cleaned)
      continue
    }

    if (/[.!?:)]$/.test(previous)) {
      steps.push(cleaned)
      continue
    }

    steps[steps.length - 1] = `${previous} ${cleaned}`
  }

  return steps.map((step) => normalizeWhitespace(step))
}

function parseArrowMap(filePath: string): Map<string, string> {
  const entries = new Map<string, string>()

  for (const line of getNonEmptyLines(readText(filePath))) {
    const match = line.match(/^(.+?)\s+→\s+(.+)$/)
    if (!match) {
      continue
    }
    entries.set(normalizeKey(match[1]), normalizeWhitespace(match[2]))
  }

  return entries
}

function parseTags(filePath: string): Map<string, string[]> {
  const entries = new Map<string, string[]>()

  for (const line of getNonEmptyLines(readText(filePath))) {
    const match = line.match(/^(.+?)\s+→\s+(.+)$/)
    if (!match) {
      continue
    }
    const tags = [...match[2].matchAll(/\[(.+?)\]/g)].map((entry) => entry[1])
    entries.set(normalizeKey(match[1]), tags)
  }

  return entries
}

function parseFilters(filePath: string): Map<string, OilFilter> {
  const filters = new Map<string, OilFilter>()
  let currentFilter: OilFilter | null = null

  for (const line of getNonEmptyLines(readText(filePath))) {
    if (line.endsWith(':') && line.includes('(')) {
      currentFilter = slugify(line.split('(')[0]) as OilFilter
      continue
    }

    if (line.startsWith('- ') && currentFilter) {
      filters.set(normalizeKey(line.slice(2)), currentFilter)
    }
  }

  return filters
}

function extractUsage(summary: string): Oil['usage'] {
  const normalized = normalizeKey(summary)
  return {
    aromatic:
      normalized.includes('difusor') ||
      normalized.includes('inal') ||
      normalized.includes('aromat')
        ? summary
        : '',
    topical:
      normalized.includes('massag') || normalized.includes('topic') || normalized.includes('pele')
        ? summary
        : '',
    ingestion:
      normalized.includes('inger') || normalized.includes('capsul') || normalized.includes('agua')
        ? summary
        : '',
  }
}

function pickUsageBlock(blocks: string[]): string {
  const ranked = blocks
    .map((block) => {
      const normalized = normalizeKey(block)
      const score = usageKeywords.reduce(
        (total, keyword) => total + (normalized.includes(keyword) ? 1 : 0),
        0,
      )
      return { block, score }
    })
    .sort((left, right) => right.score - left.score)

  return ranked[0]?.score ? ranked[0].block : blocks.at(-1) ?? ''
}

function parseOils(): Oil[] {
  const subtitleMap = parseArrowMap(
    '00-complementar/subtitulos-emocionais/subtitulos-emocionais.txt',
  )
  const tagsMap = parseTags('00-complementar/tags-beneficio/tags-beneficio.txt')
  const filterMap = parseFilters(
    '00-complementar/classificacao-filtros/classificacao-filtros.txt',
  )

  return readTxtFiles('04-oleos-essenciais').map((absolutePath) => {
    const relativePath = absolutePath.replace(`${contentRoot}/`, '')
    const sections = splitParagraphs(readTextAbsolute(absolutePath))
    const [name, ...content] = sections
    const usageSummary = pickUsageBlock(content)
    const descriptionBlocks = content.filter((block) => block !== usageSummary)
    const normalizedName = normalizeKey(name)

    return {
      id: basename(absolutePath, '.txt'),
      name,
      subtitle: subtitleMap.get(normalizedName) ?? '',
      tags: tagsMap.get(normalizedName) ?? [],
      filter: filterMap.get(normalizedName) ?? 'detox',
      description: descriptionBlocks.join('\n\n'),
      usageSummary,
      usage: extractUsage(usageSummary),
      sourceFile: relativePath,
    }
  })
}

function parseRecipeMetadata(): Map<string, RecipeMetadata> {
  const metadata = new Map<string, RecipeMetadata>()
  const lines = getNonEmptyLines(readText('00-complementar/metadados-receitas.txt'))
  let currentKey = ''

  for (const line of lines) {
    const entryMatch = line.match(/^([\w-]+\.txt)(?:\s+—\s+(Combo \d+))?$/)
    if (entryMatch) {
      const stem = basename(entryMatch[1], '.txt')
      currentKey = entryMatch[2]
        ? `${stem}-${slugify(entryMatch[2])}`
        : stem
      metadata.set(currentKey, {
        key: currentKey,
        sopTitle: '',
        period: 'atemporal',
        periodLabel: 'ATEMPORAL',
        time: '',
        frequency: '',
      })
      continue
    }

    if (!currentKey) {
      continue
    }

    const current = metadata.get(currentKey)
    if (!current) {
      continue
    }

    if (line.startsWith('Título SOP:')) {
      current.sopTitle = line
        .replace('Título SOP:', '')
        .trim()
        .replace(/^"|"$/g, '')
    } else if (line.startsWith('Período:')) {
      current.periodLabel = line.replace('Período:', '').trim()
      current.period = normalizePeriod(current.periodLabel)
    } else if (line.startsWith('Preparo:')) {
      current.time = line.replace('Preparo:', '').trim()
    } else if (line.startsWith('Frequência:')) {
      current.frequency = line.replace('Frequência:', '').trim()
    }
  }

  return metadata
}

function extractOilMentions(lines: string[]): string[] {
  const mentions: string[] = []

  for (const line of lines) {
    const normalizedLine = normalizeKey(line)

    for (const oilName of knownOilNames) {
      if (normalizedLine.includes(normalizeKey(oilName))) {
        mentions.push(oilName)
      }
    }
  }

  return unique(mentions)
}

function buildRecipe(
  id: string,
  name: string,
  tab: RecipeTab,
  format: Recipe['format'],
  metadata: RecipeMetadata,
  ingredients: string[],
  steps: string[],
  notes: string[],
  sourceFile: string,
): Recipe {
  return {
    id,
    name,
    sopTitle: metadata.sopTitle,
    tab,
    format,
    period: metadata.period,
    periodLabel: metadata.periodLabel,
    time: metadata.time,
    frequency: metadata.frequency,
    ingredients,
    steps,
    notes,
    oilsUsed: extractOilMentions([...ingredients, ...steps, ...notes]),
    sourceFile,
  }
}

function parseRecipeFile(
  absolutePath: string,
  tab: RecipeTab,
  metadataMap: Map<string, RecipeMetadata>,
): Recipe {
  const relativePath = absolutePath.replace(`${contentRoot}/`, '')
  const lines = readTextAbsolute(absolutePath).split('\n').map((line) => line.trimEnd())
  const nonEmptyLines = lines.map((line) => line.trim())
  const ingredientsIndex = nonEmptyLines.findIndex((line) => line === 'INGREDIENTES')
  const modeIndex = nonEmptyLines.findIndex((line) => line.includes('MODO DE PREPARO'))

  const name = normalizeWhitespace(nonEmptyLines.slice(0, ingredientsIndex).join(' '))
  const ingredients = nonEmptyLines
    .slice(ingredientsIndex + 1, modeIndex === -1 ? undefined : modeIndex)
    .filter((line) => line && !line.startsWith('---'))

  const stepLines =
    modeIndex === -1
      ? ['Misture ou prepare a receita conforme a orientação editorial original.']
      : nonEmptyLines.slice(modeIndex + 1)

  const notes = stepLines
    .filter((line) => line.startsWith('DICA:'))
    .map((line) => normalizeWhitespace(line.replace('DICA:', '').trim()))

  const steps = normalizeStepLines(stepLines)
  const id = basename(absolutePath, '.txt')
  const metadata = metadataMap.get(id)

  if (!metadata) {
    throw new Error(`Metadados ausentes para a receita ${id}`)
  }

  return buildRecipe(id, name, tab, 'recipe', metadata, ingredients, steps, notes, relativePath)
}

function parseCapsuleRecipe(metadataMap: Map<string, RecipeMetadata>): Recipe {
  const relativePath =
    '09-ingestao-e-aromaterapia/capsula-para-reduzir-apetite.txt'
  const lines = getNonEmptyLines(readText(relativePath))
  const ingredientStart = lines.findIndex((line) => /^\d/.test(line))
  const stepStart = lines.findIndex((line) => line.startsWith('Coloque '))
  const id = 'capsula-para-reduzir-apetite'
  const metadata = metadataMap.get(id)

  if (!metadata) {
    throw new Error(`Metadados ausentes para a receita ${id}`)
  }

  return buildRecipe(
    id,
    normalizeWhitespace(lines.slice(0, ingredientStart).join(' ')),
    'difusao',
    'capsule',
    metadata,
    lines.slice(ingredientStart, stepStart),
    normalizeStepLines(lines.slice(stepStart)),
    [],
    relativePath,
  )
}

function parseDiffuserRecipes(metadataMap: Map<string, RecipeMetadata>): Recipe[] {
  const relativePath =
    '09-ingestao-e-aromaterapia/combinacoes-para-difusor.txt'
  const raw = readText(relativePath)
  const blocks = raw
    .split(/\n\s*\n/)
    .map((block) => block.split('\n').map((line) => line.trim()).filter(Boolean))
    .filter(Boolean)
  const combos = blocks.slice(1)

  return combos.map((ingredients, index) => {
    const comboId = `combinacoes-para-difusor-combo-${index + 1}`
    const metadataKey = `combinacoes-para-difusor-combo-${index + 1}`
    const metadata = metadataMap.get(metadataKey)

    if (!metadata) {
      throw new Error(`Metadados ausentes para a receita ${metadataKey}`)
    }

    const descriptiveName =
      metadata.sopTitle.split('—')[1]?.trim() ?? `Combinação para Difusor ${index + 1}`

    return buildRecipe(
      comboId,
      descriptiveName,
      'difusao',
      'diffuser',
      metadata,
      ingredients,
      [
        'Adicione as gotas ao difusor ultrassônico com água e inicie a difusão conforme a capacidade do aparelho.',
      ],
      [],
      relativePath,
    )
  })
}

function parseRecipes(): Recipe[] {
  const metadataMap = parseRecipeMetadata()

  const recipeFiles: Array<{ dir: string; tab: RecipeTab }> = [
    { dir: '05-receitas-com-oleos', tab: 'culinaria' },
    { dir: '06-receitas-com-trimshake', tab: 'trimshake' },
    { dir: '07-bebidas-com-oleos', tab: 'bebidas' },
    { dir: '08-uso-topico', tab: 'topico' },
  ]

  const recipes = recipeFiles.flatMap(({ dir, tab }) =>
    readTxtFiles(dir)
      .filter((absolutePath) => !absolutePath.endsWith('orientacoes-massagem-e-diluicao.txt'))
      .map((absolutePath) => parseRecipeFile(absolutePath, tab, metadataMap)),
  )

  recipes.push(parseCapsuleRecipe(metadataMap))
  recipes.push(...parseDiffuserRecipes(metadataMap))

  return recipes
}

function parseTipMetadata(): Map<string, TipMetadata> {
  const metadata = new Map<string, TipMetadata>()
  const lines = getNonEmptyLines(readText('00-complementar/metadados-dicas-mindset.txt'))
  let currentKey = ''

  for (const line of lines) {
    if (line.endsWith('.txt')) {
      currentKey = basename(line, '.txt')
      metadata.set(currentKey, {
        label: '',
        alliedOilName: '',
        alliedOilReason: '',
      })
      continue
    }

    const current = metadata.get(currentKey)
    if (!current) {
      continue
    }

    if (line.startsWith('Label:')) {
      current.label = line.replace('Label:', '').trim().replace(/^"|"$/g, '')
    } else if (line.startsWith('Óleo Aliado:')) {
      const [oilName, reason] = line.replace('Óleo Aliado:', '').trim().split(/\s+—\s+/)
      current.alliedOilName = oilName.trim()
      current.alliedOilReason = normalizeWhitespace(reason ?? '')
    }
  }

  return metadata
}

function parseTips(): Tip[] {
  const metadataMap = parseTipMetadata()

  return readTxtFiles('10-dicas').map((absolutePath) => {
    const id = basename(absolutePath, '.txt')
    const metadata = metadataMap.get(id)

    if (!metadata) {
      throw new Error(`Metadados ausentes para a dica ${id}`)
    }

    const number = Number.parseInt(id.split('-')[0], 10)
    const alliedOil = normalizeOilId(metadata.alliedOilName)

    return {
      id,
      number,
      text: splitParagraphs(readTextAbsolute(absolutePath)).join('\n\n'),
      label: metadata.label,
      alliedOil,
      alliedOilName: displayOilNameFromId(alliedOil),
      alliedOilReason: metadata.alliedOilReason,
      sourceFile: absolutePath.replace(`${contentRoot}/`, ''),
    }
  })
}

function extractQuotedStrings(raw: string): string[] {
  return [...raw.matchAll(/"([\s\S]+?)"/g)].map((match) =>
    normalizeWhitespace(match[1]).replace('deixarpara', 'deixar para'),
  )
}

function parseQuotedLines(relativePath: string): string[] {
  return extractQuotedStrings(readText(relativePath))
}

function parseMindsetPairs(relativePath: string): MindsetPair[] {
  const pairs: MindsetPair[] = []
  const lines = getNonEmptyLines(readText(relativePath))
  let current: MindsetPair | null = null

  for (const line of lines) {
    const pairMatch = line.match(/^PAR (\d+) — (.+)$/)
    if (pairMatch) {
      current = {
        id: `par-${pairMatch[1]}`,
        theme: pairMatch[2],
        sabotage: '',
        positive: [],
      }
      pairs.push(current)
      continue
    }

    if (!current) {
      continue
    }

    if (line.startsWith('✗ ')) {
      current.sabotage = extractQuotedStrings(line)[0] ?? ''
    } else if (line.startsWith('✓ ')) {
      current.positive.push(...extractQuotedStrings(line))
    }
  }

  return pairs
}

function parseMindset(): MindsetData {
  return {
    sabotage: parseQuotedLines(
      '11-nossa-mente/pensamentos-de-autossabotagem.txt',
    ),
    positive: parseQuotedLines(
      '11-nossa-mente/pensamentos-de-substituicao-positiva.txt',
    ),
    pairs: parseMindsetPairs(
      '00-complementar/mindset-pareamento/pareamento-sabotagem-substituicao.txt',
    ),
  }
}

function parseSpotlightFile(
  absolutePath: string,
  oilNamesById: Map<string, string>,
): Spotlight {
  const relativePath = absolutePath.replace(`${contentRoot}/`, '')
  const blocks = getNonEmptyLines(readTextAbsolute(absolutePath))
  const sections = new Map<string, string>()
  let currentLabel = ''

  for (const block of blocks) {
    if (
      block === 'TÍTULO EDITORIAL' ||
      block === 'LABEL SOP' ||
      block === 'CHAMADA' ||
      block === 'RECEITA SUGERIDA'
    ) {
      currentLabel = block
      sections.set(currentLabel, '')
      continue
    }

    if (currentLabel) {
      const existing = sections.get(currentLabel)
      sections.set(
        currentLabel,
        normalizeWhitespace([existing, block].filter(Boolean).join(' ')),
      )
    }
  }

  const oilId = basename(absolutePath, '.txt').replace(/^spotlight-/, '')

  return {
    id: oilId,
    oilId,
    oilName: oilNamesById.get(oilId) ?? displayOilNameFromId(oilId),
    title: sections.get('TÍTULO EDITORIAL') ?? '',
    label: sections.get('LABEL SOP') ?? '',
    callout: sections.get('CHAMADA') ?? '',
    suggestedRecipe: (sections.get('RECEITA SUGERIDA') ?? '')
      .replace(/\s*\(.+\)$/, '')
      .replace(/\.txt$/, ''),
    sourceFile: relativePath,
  }
}

function parseSpotlights(oils: Oil[]): Spotlight[] {
  const oilNamesById = new Map(oils.map((oil) => [oil.id, oil.name]))

  return readTxtFiles('00-complementar/home-spotlight').map((absolutePath) =>
    parseSpotlightFile(absolutePath, oilNamesById),
  )
}

function parsePullQuotes(): PullQuote[] {
  const lines = readText('00-complementar/pull-quotes-editoriais/pull-quotes.txt')
    .split('\n')
    .map((line) => line.trim())
  const quotes: PullQuote[] = []
  let current: PullQuote | null = null
  let quoteBuffer: string[] = []
  let collectingQuote = false

  const flushQuote = () => {
    if (current && quoteBuffer.length) {
      current.text = normalizeWhitespace(quoteBuffer.join(' '))
    }
    quoteBuffer = []
    collectingQuote = false
  }

  for (const line of lines) {
    if (!line || line.startsWith('PULL-QUOTES')) {
      continue
    }

    if (line.startsWith('NOTA DE DESIGN:')) {
      flushQuote()
      break
    }

    if (line.startsWith('═')) {
      continue
    }

    const quoteMatch = line.match(/^QUOTE (\d+) — (.+)$/)
    if (quoteMatch) {
      flushQuote()
      const sourceFile = quoteMatch[2].match(/\(([^)]+\.txt)\)/)?.[1] ?? ''
      const afterSectionBySource = new Map<string, string>([
        ['observacoes-legais.txt', 'aviso-legal'],
        ['observacoes-importantes.txt', 'alertas-de-seguranca'],
        ['orientacoes-seguranca.txt', 'guia-de-ingestao'],
        ['orientacoes-massagem-e-diluicao.txt', 'guia-de-uso-topico'],
        ['conclusao.txt', 'mensagem-final'],
      ])
      current = {
        id: `quote-${quoteMatch[1]}`,
        afterSection:
          afterSectionBySource.get(sourceFile) ??
          slugify(quoteMatch[2].replace(/\(.+\)/, '')),
        placement: '',
        text: '',
      }
      quotes.push(current)
      continue
    }

    if (!current) {
      continue
    }

    if (line.startsWith('Posição:')) {
      current.placement = line.replace('Posição:', '').trim()
      continue
    }

    if (line.startsWith('"')) {
      collectingQuote = true
      quoteBuffer.push(line.replace(/^"/, '').replace(/"$/, ''))
      if (line.endsWith('"')) {
        flushQuote()
      }
      continue
    }

    if (collectingQuote) {
      quoteBuffer.push(line.replace(/"$/, ''))
      if (line.endsWith('"')) {
        flushQuote()
      }
    }
  }

  flushQuote()

  return quotes
}

function parseSafety(): SafetyData {
  const introduction = stripLeadingHeading(
    splitParagraphs(readText('02-introducao/introducao.txt')),
  )
  const presentation = stripLeadingHeading(
    splitParagraphs(readText('03-apresentacao/apresentacao.txt')),
  )
  const legal = stripLeadingHeading(
    splitParagraphs(readText('01-institucional/observacoes-legais.txt')),
  )
  const alertsBody = getNonEmptyLines(readText('03-apresentacao/observacoes-importantes.txt'))
  const alerts = alertsBody.filter((line) => line.startsWith('- ')).map((line) => line.slice(2))
  const ingestion = splitParagraphs(readText('09-ingestao-e-aromaterapia/orientacoes-seguranca.txt'))
  const topical = stripLeadingHeading(
    splitParagraphs(readText('08-uso-topico/orientacoes-massagem-e-diluicao.txt')),
  )
  const conclusion = stripLeadingHeading(
    splitParagraphs(readText('12-conclusao/conclusao.txt')),
  )
  const sources = getNonEmptyLines(readText('12-conclusao/fontes.txt'))
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2))

  return {
    sections: [
      {
        id: 'sobre-a-autora',
        title: 'Sobre a Autora',
        variant: 'about',
        body: [...introduction, ...presentation],
        sourceFiles: ['02-introducao/introducao.txt', '03-apresentacao/apresentacao.txt'],
      },
      {
        id: 'aviso-legal',
        title: 'Aviso Legal',
        variant: 'legal',
        body: legal,
        sourceFiles: ['01-institucional/observacoes-legais.txt'],
      },
      {
        id: 'alertas-de-seguranca',
        title: 'Alertas de Segurança',
        variant: 'alerts',
        body: [],
        bullets: alerts,
        sourceFiles: ['03-apresentacao/observacoes-importantes.txt'],
      },
      {
        id: 'guia-de-ingestao',
        title: 'Guia de Ingestão',
        variant: 'ingestion',
        body: ingestion,
        sourceFiles: ['09-ingestao-e-aromaterapia/orientacoes-seguranca.txt'],
      },
      {
        id: 'guia-de-uso-topico',
        title: 'Guia de Uso Tópico',
        variant: 'topical',
        body: topical[0]?.startsWith('Uso Tópico')
          ? topical.slice(1)
          : topical,
        sourceFiles: ['08-uso-topico/orientacoes-massagem-e-diluicao.txt'],
      },
      {
        id: 'mensagem-final',
        title: 'Mensagem Final',
        variant: 'closing',
        body: conclusion,
        sources,
        sourceFiles: ['12-conclusao/conclusao.txt', '12-conclusao/fontes.txt'],
      },
    ],
    pullQuotes: parsePullQuotes(),
  }
}

function writeJsonFile(name: string, value: unknown): void {
  mkdirSync(dataDir, { recursive: true })
  writeFileSync(join(dataDir, name), `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function main(): void {
  const oils = parseOils()
  const recipes = parseRecipes()
  const tips = parseTips()
  const mindset = parseMindset()
  const spotlights = parseSpotlights(oils)
  const safety = parseSafety()

  writeJsonFile('oils.json', oils)
  writeJsonFile('recipes.json', recipes)
  writeJsonFile('tips.json', tips)
  writeJsonFile('mindset.json', mindset)
  writeJsonFile('spotlights.json', spotlights)
  writeJsonFile('safety.json', safety)

  console.log(`oils.json: ${oils.length}`)
  console.log(`recipes.json: ${recipes.length}`)
  console.log(`tips.json: ${tips.length}`)
  console.log(
    `mindset.json: ${mindset.sabotage.length} sabotagens / ${mindset.positive.length} positivas / ${mindset.pairs.length} pares`,
  )
  console.log(`spotlights.json: ${spotlights.length}`)
  console.log(
    `safety.json: ${safety.sections.length} seções / ${safety.pullQuotes.length} pull-quotes`,
  )
}

main()
