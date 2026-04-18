import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const currentDir = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(currentDir, "..");
const sourceRoot = resolve(appRoot, "assets-source", "openverse");
const generatedRoot = resolve(appRoot, "src", "assets", "content");
const generatedDataFile = resolve(
  appRoot,
  "src",
  "data",
  "contentImages.generated.ts"
);

const userAgent =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36";

const dryRun = process.argv.includes("--dry-run");
const withVariants = process.argv.includes("--with-variants");
const photoExcludes = [
  "illustration",
  "painting",
  "drawing",
  "sketch",
  "figure",
  "poster",
];

const sizePresets = {
  oilThumb: { width: 320, height: 320 },
  oilHero: { width: 1200, height: 900 },
  oilSpotlight: { width: 1200, height: 1600 },
  recipeHero: { width: 1280, height: 720 },
  step: { width: 960, height: 640 },
  guideHero: { width: 1280, height: 720 },
  texture: { width: 1080, height: 1080 },
};

const oilEntries = [
  oilEntry("alecrim", ["rosemary herb", "rosemary leaves"], {
    requireAny: ["rosemary"],
    exclude: ["rosemarie", "harris", "clooney", "dewitt", "spiderman"],
  }),
  oilEntry(
    "balance",
    ["essential oil bottles zen stones", "aromatherapy oil stones"],
    {
      requireAny: ["oil", "aroma", "aromatherapy"],
    }
  ),
  oilEntry(
    "basil",
    ["basil leaves", "sweet basil leaves", "ocimum basilicum"],
    {
      requireAny: ["basil", "ocimum"],
      exclude: ["cathedral", "saint", "solidus", "moscow"],
    }
  ),
  oilEntry(
    "camomila-romana",
    ["chamomile flowers", "roman chamomile flowers"],
    {
      requireAny: ["chamomile"],
      exclude: ["shark"],
    }
  ),
  oilEntry("cilantro", ["cilantro leaves", "coriander leaves"], {
    requireAny: ["cilantro", "coriander"],
  }),
  oilEntry("cinnamon-bark", ["cinnamon bark sticks", "cinnamon bark"], {
    requireAny: ["cinnamon"],
  }),
  oilEntry("fennel", ["fennel bulb", "fennel bulb sliced", "fennel"], {
    requireAny: ["fennel"],
  }),
  oilEntry("gengibre", ["ginger root", "ginger root sliced", "fresh ginger"], {
    requireAny: ["ginger"],
  }),
  oilEntry("grapefruit", ["pink grapefruit fruit", "grapefruit fruit"], {
    requireAny: ["grapefruit"],
    exclude: ["salad"],
  }),
  oilEntry("lime-e-lemon", ["lime lemon slices", "lime and lemon"], {
    requireAny: ["lime", "lemon"],
  }),
  oilEntry("peppermint", ["peppermint leaves", "mint leaves"], {
    requireAny: ["peppermint", "mint"],
    exclude: ["bass", "angelfish", "shrimp", "club"],
  }),
  oilEntry(
    "petitgrain",
    ["bitter orange leaves", "orange tree leaves", "citrus leaves"],
    {
      requireAny: ["orange", "citrus"],
    }
  ),
  oilEntry(
    "sandalo-hawaiano",
    ["sandalwood sticks", "sandalwood paste", "sandalwood wood"],
    {
      requireAny: ["sandalwood"],
      exclude: ["shaving", "buddha", "cremation"],
    }
  ),
  oilEntry("serenity", ["lavender flowers", "lavender field"], {
    requireAny: ["lavender"],
    exclude: ["waxbill"],
  }),
  oilEntry(
    "smart-e-sassy",
    ["grapefruit ginger orange", "grapefruit ginger", "ginger mint citrus"],
    {
      requireAny: ["grapefruit", "ginger", "mint", "citrus", "orange"],
      requireAll: ["grapefruit", "ginger"],
      allowReuse: true,
    }
  ),
  oilEntry("turmeric", ["turmeric root powder", "turmeric root"], {
    requireAny: ["turmeric"],
  }),
  oilEntry(
    "wild-orange",
    ["orange fruit leaves", "orange branch leaves", "orange with leaves"],
    {
      requireAny: ["orange"],
      requireAll: ["orange"],
      exclude: ["autumn", "background"],
      allowReuse: true,
    }
  ),
];

const recipeHeroEntries = [
  recipeHeroEntry(
    "brownie-com-wild-orange",
    ["chocolate brownie orange", "orange brownie"],
    {
      requireAny: ["brownie"],
      requireAll: ["brownie"],
    }
  ),
  recipeHeroEntry(
    "bruschetta",
    ["tomato bruschetta basil", "bruschetta tomato"],
    {
      requireAny: ["bruschetta"],
    }
  ),
  recipeHeroEntry(
    "granola-salgada",
    ["savory granola nuts seeds", "granola nuts seeds"],
    {
      requireAny: ["granola"],
    }
  ),
  recipeHeroEntry("guacamole", ["guacamole dip", "guacamole"], {
    requireAny: ["guacamole"],
  }),
  recipeHeroEntry(
    "mousse-de-chocolate-com-tangerina",
    ["chocolate mousse orange", "chocolate mousse tangerine"],
    {
      requireAny: ["mousse", "chocolate"],
    }
  ),
  recipeHeroEntry("pao-de-abobora", ["pumpkin bread slice", "pumpkin bread"], {
    requireAny: ["pumpkin", "bread"],
  }),
  recipeHeroEntry("chai-com-baunilha", ["vanilla chai latte", "chai latte"], {
    requireAny: ["chai", "latte"],
  }),
  recipeHeroEntry("horchata", ["horchata drink", "horchata"], {
    requireAny: ["horchata"],
  }),
  recipeHeroEntry("maquina-verde", ["green smoothie glass", "green smoothie"], {
    requireAny: ["smoothie"],
    requireAll: ["green", "smoothie"],
  }),
  recipeHeroEntry(
    "menta-com-chocolate",
    ["mint chocolate smoothie", "chocolate mint shake"],
    {
      requireAny: ["mint", "chocolate", "smoothie", "shake"],
      requireAll: ["mint", "chocolate"],
    }
  ),
  recipeHeroEntry(
    "picole-cremoso-de-laranja",
    ["orange popsicle", "orange ice pop"],
    {
      requireAny: ["orange", "popsicle", "pop"],
    }
  ),
  recipeHeroEntry(
    "picole-de-chocolate",
    ["chocolate popsicle", "chocolate ice pop"],
    {
      requireAny: ["chocolate", "popsicle", "pop"],
      requireAll: ["chocolate"],
      exclude: ["transparent", "sticker", "png"],
    }
  ),
  recipeHeroEntry(
    "smoothie-de-aveia-com-mirtilos",
    ["blueberry oat smoothie", "blueberry smoothie"],
    {
      requireAny: ["blueberry", "smoothie"],
    }
  ),
  recipeHeroEntry(
    "torta-de-limao",
    ["key lime pie", "lime pie", "lemon pie shake"],
    {
      requireAny: ["lime", "lemon", "pie"],
      requireAll: ["pie"],
    }
  ),
  recipeHeroEntry("tropical-colada", ["pina colada smoothie", "pina colada"], {
    requireAny: ["colada", "pina"],
  }),
  recipeHeroEntry(
    "laranja-e-limao",
    ["orange lemon drink", "orange lemon juice"],
    {
      requireAny: ["orange", "lemon", "lime"],
      requireAll: ["orange", "lemon"],
    }
  ),
  recipeHeroEntry(
    "maca-e-canela",
    ["apple cinnamon drink", "apple cinnamon juice"],
    {
      requireAny: ["apple", "cinnamon"],
      requireAll: ["apple", "cinnamon"],
    }
  ),
  recipeHeroEntry(
    "melancia-com-hortela",
    ["watermelon mint drink", "watermelon mint juice"],
    {
      requireAny: ["watermelon", "mint"],
      requireAll: ["watermelon", "mint"],
    }
  ),
  recipeHeroEntry(
    "morango-e-melancia",
    ["strawberry watermelon drink", "strawberry watermelon juice"],
    {
      requireAny: ["strawberry", "watermelon"],
      requireAll: ["strawberry", "watermelon"],
    }
  ),
  recipeHeroEntry("suco-de-maca", ["apple juice glass", "apple juice"], {
    requireAny: ["apple", "juice"],
  }),
  recipeHeroEntry("escalda-pes-detox", ["foot soaking spa", "foot soak spa"], {
    requireAny: ["foot", "soak", "spa"],
  }),
  recipeHeroEntry(
    "oleo-massagem-anti-celulite-v1",
    ["aroma massage", "massage oil spa"],
    {
      requireAny: ["massage", "oil", "spa"],
      allowReuse: true,
    }
  ),
  recipeHeroEntry(
    "oleo-massagem-anti-celulite-v2",
    ["massage oil spa", "aroma massage"],
    {
      requireAny: ["massage", "oil", "spa"],
      allowReuse: true,
    }
  ),
  recipeHeroEntry(
    "oleo-massagem-gordura-localizada",
    ["massage oil spa", "aroma massage"],
    {
      requireAny: ["massage", "oil", "spa"],
      allowReuse: true,
    }
  ),
  recipeHeroEntry("wrap-detox", ["spa body wrap", "spa towel body"], {
    requireAny: ["spa", "wrap", "towel"],
  }),
  recipeHeroEntry(
    "capsula-para-reduzir-apetite",
    ["capsules supplements spoon", "supplement capsules"],
    {
      requireAny: ["capsule", "capsules", "supplement"],
    }
  ),
  recipeHeroEntry(
    "combinacoes-para-difusor-combo-1",
    ["essential oil diffuser", "essential oil bottles"],
    {
      requireAny: ["essential", "oil", "diffuser", "aroma"],
      allowReuse: true,
    }
  ),
  recipeHeroEntry(
    "combinacoes-para-difusor-combo-2",
    ["essential oil diffuser", "essential oil bottles"],
    {
      requireAny: ["essential", "oil", "diffuser", "aroma"],
      allowReuse: true,
    }
  ),
  recipeHeroEntry(
    "combinacoes-para-difusor-combo-3",
    ["essential oil diffuser", "essential oil bottles"],
    {
      requireAny: ["essential", "oil", "diffuser", "aroma"],
      allowReuse: true,
    }
  ),
];

const stepSourceEntries = [
  stepEntry("culinaria-prep", ["chopped tomatoes basil", "tomato basil prep"], {
    requireAny: ["tomato", "basil", "chopped"],
    requireAll: ["tomato", "basil"],
  }),
  stepEntry("culinaria-mix", ["mixing batter bowl", "cake batter bowl"], {
    requireAny: ["mixing", "batter", "bowl", "cake"],
  }),
  stepEntry("culinaria-bake", ["oven baking tray", "baked bread oven"], {
    requireAny: ["oven", "baking", "baked", "bread"],
  }),
  stepEntry("culinaria-slice", ["pumpkin bread slice", "bread slices"], {
    requireAny: ["bread", "slice", "slices"],
  }),
  stepEntry(
    "trimshake-ingredients",
    ["smoothie ingredients bowl", "smoothie ingredients"],
    {
      requireAny: ["smoothie", "ingredients"],
    }
  ),
  stepEntry("trimshake-blend", ["blender smoothie", "green smoothie blender"], {
    requireAny: ["blender", "smoothie"],
  }),
  stepEntry("trimshake-pour", ["pouring smoothie glass", "smoothie pouring"], {
    requireAny: ["smoothie", "pouring", "glass"],
  }),
  stepEntry("trimshake-finish", ["smoothie jar garnish", "smoothie garnish"], {
    requireAny: ["smoothie", "garnish", "jar"],
  }),
  stepEntry(
    "capsule-prep",
    ["capsules supplements spoon", "supplement capsules"],
    {
      requireAny: ["capsule", "capsules", "supplement"],
    }
  ),
  stepEntry(
    "capsule-water",
    ["capsules water glass", "supplement glass water"],
    {
      requireAny: ["capsule", "capsules", "water", "glass", "supplement"],
      requireAll: ["water"],
    }
  ),
  stepEntry(
    "capsule-finish",
    ["essential oil diffuser", "essential oil bottles"],
    {
      requireAny: ["essential", "oil", "diffuser", "aroma"],
    }
  ),
];

const guideEntries = [
  guideEntry("author-portrait", ["portrait woman natural light"], {
    requireAny: ["woman", "portrait"],
    exclude: ["witch"],
  }),
  guideEntry("topical-usage", ["aroma massage", "massage oil spa"], {
    requireAny: ["massage", "oil", "spa"],
  }),
];

const textureEntries = Array.from({ length: 8 }, (_, index) =>
  textureEntry(`mindset-texture-${String(index + 1).padStart(2, "0")}`, [
    "beige paper texture",
    "beige concrete wall texture",
    "free abstract watercolor background",
    "palm leaf botanical texture background",
  ])
);

const culinaryStepMap = {
  "brownie-com-wild-orange": ["culinaria-mix", "culinaria-bake"],
  bruschetta: ["culinaria-prep"],
  "granola-salgada": ["culinaria-mix"],
  guacamole: ["culinaria-prep"],
  "mousse-de-chocolate-com-tangerina": [],
  "pao-de-abobora": ["culinaria-mix", "culinaria-bake", "culinaria-slice"],
};

const trimshakeBaseSequence = [
  "trimshake-ingredients",
  "trimshake-blend",
  "trimshake-pour",
  "trimshake-finish",
];

const trimshakeCounts = {
  "chai-com-baunilha": 4,
  horchata: 6,
  "maquina-verde": 4,
  "menta-com-chocolate": 5,
  "picole-cremoso-de-laranja": 0,
  "picole-de-chocolate": 0,
  "smoothie-de-aveia-com-mirtilos": 4,
  "torta-de-limao": 6,
  "tropical-colada": 5,
};

const capsuleStepMap = {
  "capsula-para-reduzir-apetite": [
    "capsule-prep",
    "capsule-water",
    "capsule-finish",
  ],
};

const recipesWithoutSteps = [
  "laranja-e-limao",
  "maca-e-canela",
  "melancia-com-hortela",
  "morango-e-melancia",
  "suco-de-maca",
  "escalda-pes-detox",
  "oleo-massagem-anti-celulite-v1",
  "oleo-massagem-anti-celulite-v2",
  "oleo-massagem-gordura-localizada",
  "wrap-detox",
  "combinacoes-para-difusor-combo-1",
  "combinacoes-para-difusor-combo-2",
  "combinacoes-para-difusor-combo-3",
];

function oilEntry(id, queries, options = {}) {
  const { exclude = [], ...rest } = options;
  return {
    id,
    kind: "oil",
    queries,
    outputs: [
      { variant: "thumb", preset: "oilThumb", outDir: "oils" },
      { variant: "hero", preset: "oilHero", outDir: "oils" },
      { variant: "spotlight", preset: "oilSpotlight", outDir: "oils" },
    ],
    exclude: [...photoExcludes, ...exclude],
    ...rest,
  };
}

function recipeHeroEntry(id, queries, options = {}) {
  const { exclude = [], ...rest } = options;
  return {
    id,
    kind: "recipeHero",
    queries,
    outputs: [
      { variant: "hero", preset: "recipeHero", outDir: "recipes/heroes" },
    ],
    exclude: [...photoExcludes, ...exclude],
    ...rest,
  };
}

function stepEntry(id, queries, options = {}) {
  const { exclude = [], ...rest } = options;
  return {
    id,
    kind: "step",
    queries,
    outputs: [{ variant: "step", preset: "step", outDir: "recipes/steps" }],
    exclude: [...photoExcludes, ...exclude],
    ...rest,
  };
}

function guideEntry(id, queries, options = {}) {
  const { exclude = [], ...rest } = options;
  return {
    id,
    kind: "guide",
    queries,
    outputs: [{ variant: "hero", preset: "guideHero", outDir: "guides" }],
    exclude: [...photoExcludes, ...exclude],
    ...rest,
  };
}

function textureEntry(id, queries, options = {}) {
  return {
    id,
    kind: "texture",
    queries,
    outputs: [{ variant: "texture", preset: "texture", outDir: "textures" }],
    ...options,
  };
}

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function sleep(ms) {
  return new Promise(resolvePromise => {
    setTimeout(resolvePromise, ms);
  });
}

function buildRepeatedSequence(sequence, count) {
  return Array.from(
    { length: count },
    (_, index) => sequence[index % sequence.length]
  );
}

function summarizeTextForScoring(result) {
  const tags = (result.tags ?? []).map(tag => tag.name).join(" ");
  return normalizeText([result.title, tags].filter(Boolean).join(" "));
}

function scoreResult(result, entry) {
  const text = summarizeTextForScoring(result);
  let score = 0;
  let matchedAny = 0;

  const licenseScore = {
    cc0: 28,
    pdm: 24,
    by: 20,
    "by-sa": 6,
  };

  const sourceScore = {
    rawpixel: 22,
    wikimedia: 18,
    flickr: 10,
  };

  score += licenseScore[result.license] ?? 0;
  score += sourceScore[result.source] ?? 0;

  const minSide = Math.min(result.width ?? 0, result.height ?? 0);
  score += Math.min(32, Math.round(minSide / 120));

  for (const token of entry.requireAny ?? []) {
    if (text.includes(normalizeText(token))) {
      score += 9;
      matchedAny += 1;
    }
  }

  if ((entry.requireAny?.length ?? 0) > 0 && matchedAny === 0) {
    score -= 28;
  }

  if (entry.requireAll?.length) {
    for (const token of entry.requireAll) {
      score += text.includes(normalizeText(token)) ? 12 : -18;
    }
  }

  for (const token of entry.exclude ?? []) {
    if (text.includes(normalizeText(token))) {
      score -= 80;
    }
  }

  if (entry.kind === "texture" && result.source === "rawpixel") {
    score += 12;
  }

  if (entry.kind === "guide" && text.includes("portrait")) {
    score += 10;
  }

  return score;
}

async function fetchJsonWithRetry(url, attempt = 0) {
  const response = await fetch(url, {
    headers: {
      "user-agent": userAgent,
      accept: "application/json",
    },
    signal: AbortSignal.timeout(30_000),
  });

  const body = await response.text();
  const contentType = response.headers.get("content-type") ?? "";

  if (!response.ok || !contentType.includes("application/json")) {
    if (attempt < 3) {
      await sleep(900 * (attempt + 1));
      return fetchJsonWithRetry(url, attempt + 1);
    }

    throw new Error(`Openverse request failed (${response.status}): ${url}`);
  }

  try {
    return JSON.parse(body);
  } catch (error) {
    if (attempt < 3) {
      await sleep(900 * (attempt + 1));
      return fetchJsonWithRetry(url, attempt + 1);
    }

    throw error;
  }
}

async function searchEntry(entry) {
  const licenseSets = ["cc0,pdm,by", "cc0,pdm,by,by-sa"];
  let bestCandidates = [];

  for (const licenseSet of licenseSets) {
    const candidates = [];

    for (const query of entry.queries) {
      const url = new URL("https://api.openverse.org/v1/images/");
      url.searchParams.set("q", query);
      url.searchParams.set("page_size", "20");
      url.searchParams.set("license", licenseSet);

      let payload;

      try {
        payload = await fetchJsonWithRetry(url);
      } catch (error) {
        console.warn(`Skipping failed query for ${entry.id}: ${query}`);
        await sleep(500);
        continue;
      }

      for (const result of payload.results ?? []) {
        candidates.push({
          ...result,
          __query: query,
          __score: scoreResult(result, entry),
        });
      }

      await sleep(220);
    }

    const deduped = uniqueBy(candidates, item => item.id || item.url).sort(
      (left, right) => right.__score - left.__score
    );

    bestCandidates = deduped;

    if (deduped[0]?.__score >= 34) {
      return deduped;
    }
  }

  return bestCandidates;
}

function uniqueBy(items, getKey) {
  const seen = new Set();
  return items.filter(item => {
    const key = getKey(item);
    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function inferExtension(result, contentType) {
  const urlExtension = extname(new URL(result.url).pathname).toLowerCase();

  if ([".jpg", ".jpeg", ".png", ".webp"].includes(urlExtension)) {
    return urlExtension;
  }

  if (contentType?.includes("png")) {
    return ".png";
  }

  if (contentType?.includes("webp")) {
    return ".webp";
  }

  return ".jpg";
}

async function pathExists(targetPath) {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function fetchBinaryWithRetry(url, landingUrl, attempt = 0) {
  const response = await fetch(url, {
    headers: {
      "user-agent": userAgent,
      referer: landingUrl ?? url,
    },
    signal: AbortSignal.timeout(60_000),
  });

  if (!response.ok) {
    if ((response.status === 429 || response.status === 403) && attempt < 4) {
      const retryAfter = Number(response.headers.get("retry-after") ?? "0");
      const waitMs =
        retryAfter > 0 ? retryAfter * 1_000 : 1_500 * (attempt + 1);
      await sleep(waitMs);
      return fetchBinaryWithRetry(url, landingUrl, attempt + 1);
    }

    throw new Error(`Download failed (${response.status}) for ${url}`);
  }

  return response;
}

async function downloadOriginal(result, entry) {
  const baseOriginalPath = resolve(
    sourceRoot,
    entry.kind,
    `${entry.id}-original`
  );
  const knownExtensions = [".jpg", ".jpeg", ".png", ".webp"];

  for (const extension of knownExtensions) {
    const existingPath = `${baseOriginalPath}${extension}`;
    if (await pathExists(existingPath)) {
      return {
        buffer: await readFile(existingPath),
        originalPath: existingPath,
      };
    }
  }

  const response = await fetchBinaryWithRetry(
    result.url,
    result.foreign_landing_url
  );
  const contentType = response.headers.get("content-type") ?? "";
  const extension = inferExtension(result, contentType);
  const buffer = Buffer.from(await response.arrayBuffer());
  const originalPath = `${baseOriginalPath}${extension}`;

  await mkdir(dirname(originalPath), { recursive: true });
  await writeFile(originalPath, buffer);

  return {
    buffer,
    originalPath,
  };
}

async function writeVariant(buffer, outputPath, preset) {
  await mkdir(dirname(outputPath), { recursive: true });

  await sharp(buffer)
    .rotate()
    .resize(preset.width, preset.height, {
      fit: "cover",
      position: "attention",
    })
    .webp({ quality: 82 })
    .toFile(outputPath);
}

function toImportVariable(filePath) {
  return basename(filePath, extname(filePath))
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, character) => character.toUpperCase())
    .replace(/^[A-Z]/, character => character.toLowerCase());
}

function createGeneratedFile(assetMap) {
  const imports = [];
  const variableByPath = new Map();

  const ensureImport = absolutePath => {
    if (variableByPath.has(absolutePath)) {
      return variableByPath.get(absolutePath);
    }

    const relativeImport = relative(
      dirname(generatedDataFile),
      absolutePath
    ).replaceAll("\\", "/");
    const importPath = relativeImport.startsWith(".")
      ? relativeImport
      : `./${relativeImport}`;
    const variableName = toImportVariable(absolutePath);

    imports.push(`import ${variableName} from '${importPath}'`);
    variableByPath.set(absolutePath, variableName);
    return variableName;
  };

  const oilLines = Object.entries(assetMap.oils)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([id, value]) => {
      return `  '${id}': { thumb: ${ensureImport(value.thumb)}, hero: ${ensureImport(value.hero)}, spotlight: ${ensureImport(value.spotlight)} },`;
    });

  const recipeLines = Object.entries(assetMap.recipes)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([id, value]) => {
      const steps = value.steps
        .map(stepPath => ensureImport(stepPath))
        .join(", ");
      return `  '${id}': { hero: ${ensureImport(value.hero)}, steps: [${steps}] },`;
    });

  const guideLines = [
    `  authorPortrait: ${ensureImport(assetMap.guides.authorPortrait)},`,
    `  topicalUsage: ${ensureImport(assetMap.guides.topicalUsage)},`,
    `  textures: [${assetMap.guides.textures.map(item => ensureImport(item)).join(", ")}],`,
  ];

  return `${imports.join("\n")}

export const oilImages = {
${oilLines.join("\n")}
} as const

export const recipeImages = {
${recipeLines.join("\n")}
} as const

export const guideImages = {
${guideLines.join("\n")}
} as const
`;
}

async function main() {
  const entries = [
    ...oilEntries,
    ...recipeHeroEntries,
    ...stepSourceEntries,
    ...guideEntries,
    ...textureEntries,
  ];
  const attribution = {
    generatedOn: new Date().toISOString(),
    provider: "Openverse",
    mode: withVariants ? "raw-and-derived" : "raw-only",
    entries: [],
  };
  const assetMap = {
    oils: {},
    recipes: {},
    guides: {
      authorPortrait: "",
      topicalUsage: "",
      textures: [],
    },
  };
  const resolvedPaths = new Map();
  const usedResultIds = new Set();

  for (const entry of entries) {
    const candidates = await searchEntry(entry);
    const candidatePool = entry.allowReuse
      ? candidates
      : [
          ...candidates.filter(candidate => !usedResultIds.has(candidate.id)),
          ...candidates,
        ];
    const previewCandidate = candidatePool[0];

    if (!previewCandidate) {
      throw new Error(`No candidate found for ${entry.id}`);
    }

    if (dryRun) {
      console.log(
        `${entry.kind}\t${entry.id}\t${previewCandidate.__score}\t${previewCandidate.title}\t${previewCandidate.license}\t${previewCandidate.source}\t${previewCandidate.url}`
      );
      continue;
    }

    let selected = null;
    let buffer = null;
    let originalPath = "";

    for (const candidate of candidatePool) {
      try {
        console.log(
          `Downloading ${entry.kind}:${entry.id} -> ${candidate.title}`
        );
        const download = await downloadOriginal(candidate, entry);
        selected = candidate;
        buffer = download.buffer;
        originalPath = download.originalPath;
        break;
      } catch (error) {
        console.warn(
          `Retrying ${entry.id} with next candidate after failure on ${candidate.url}`
        );
      }
    }

    if (!selected || !buffer || !originalPath) {
      throw new Error(`No downloadable candidate found for ${entry.id}`);
    }

    usedResultIds.add(selected.id);

    const outputPaths = {};

    if (withVariants) {
      for (const output of entry.outputs) {
        const preset = sizePresets[output.preset];
        const outputPath = resolve(
          generatedRoot,
          output.outDir,
          `${entry.id}-${output.variant}.webp`
        );
        await writeVariant(buffer, outputPath, preset);
        outputPaths[output.variant] = outputPath;
      }

      resolvedPaths.set(entry.id, outputPaths);
    }
    attribution.entries.push({
      id: entry.id,
      kind: entry.kind,
      queries: entry.queries,
      selectedQuery: selected.__query,
      title: selected.title,
      creator: selected.creator,
      creatorUrl: selected.creator_url,
      source: selected.source,
      license: selected.license,
      licenseUrl: selected.license_url,
      sourceUrl: selected.foreign_landing_url,
      mediaUrl: selected.url,
      originalPath: relative(appRoot, originalPath).replaceAll("\\", "/"),
      generatedOutputs: withVariants
        ? Object.fromEntries(
            Object.entries(outputPaths).map(([key, absolutePath]) => [
              key,
              relative(appRoot, absolutePath).replaceAll("\\", "/"),
            ])
          )
        : {},
      width: selected.width,
      height: selected.height,
      attribution: selected.attribution,
    });
  }

  if (dryRun) {
    return;
  }

  await mkdir(sourceRoot, { recursive: true });
  await writeFile(
    resolve(sourceRoot, "attributions.json"),
    `${JSON.stringify(attribution, null, 2)}\n`
  );

  if (!withVariants) {
    return;
  }

  for (const oil of oilEntries) {
    const outputs = resolvedPaths.get(oil.id);
    assetMap.oils[oil.id] = {
      thumb: outputs.thumb,
      hero: outputs.hero,
      spotlight: outputs.spotlight,
    };
  }

  for (const recipe of recipeHeroEntries) {
    const outputs = resolvedPaths.get(recipe.id);
    const directSteps =
      culinaryStepMap[recipe.id] ??
      capsuleStepMap[recipe.id] ??
      (trimshakeCounts[recipe.id]
        ? buildRepeatedSequence(
            trimshakeBaseSequence,
            trimshakeCounts[recipe.id]
          )
        : []);

    assetMap.recipes[recipe.id] = {
      hero: outputs.hero,
      steps: directSteps.map(stepId => resolvedPaths.get(stepId).step),
    };
  }

  for (const recipeId of recipesWithoutSteps) {
    if (!assetMap.recipes[recipeId]) {
      const outputs = resolvedPaths.get(recipeId);
      assetMap.recipes[recipeId] = { hero: outputs.hero, steps: [] };
    }
  }

  assetMap.guides.authorPortrait = resolvedPaths.get("author-portrait").hero;
  assetMap.guides.topicalUsage = resolvedPaths.get("topical-usage").hero;
  assetMap.guides.textures = textureEntries.map(
    entry => resolvedPaths.get(entry.id).texture
  );
  await writeFile(generatedDataFile, `${createGeneratedFile(assetMap)}\n`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
