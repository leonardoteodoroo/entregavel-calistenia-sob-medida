import { mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const currentDir = dirname(fileURLToPath(import.meta.url))
const appRoot = resolve(currentDir, '..')
const publicDir = resolve(appRoot, 'public')
const sourceIcon = resolve(publicDir, 'favicon.svg')

const outputs = [
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
]

await mkdir(publicDir, { recursive: true })

await Promise.all(
  outputs.map(({ file, size }) =>
    sharp(sourceIcon)
      .resize(size, size)
      .png()
      .toFile(resolve(publicDir, file)),
  ),
)
