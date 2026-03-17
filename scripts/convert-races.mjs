import sharp from 'sharp'
import { readdirSync, mkdirSync } from 'fs'
import { join, basename, extname } from 'path'

const INPUT_DIR = 'public/races-brutes'
const OUTPUT_DIR = 'public/races'

mkdirSync(OUTPUT_DIR, { recursive: true })

const files = readdirSync(INPUT_DIR).filter(f => /\.(jpg|jpeg|png)$/i.test(f))

for (const file of files) {
  const nameWithoutExt = basename(file, extname(file))
  const kebab = nameWithoutExt.replace(/_/g, '-').toLowerCase()
  const outputName = `${kebab}.webp`
  const inputPath = join(INPUT_DIR, file)
  const outputPath = join(OUTPUT_DIR, outputName)

  await sharp(inputPath)
    .resize(400, 300, { fit: 'cover', position: 'centre' })
    .webp({ quality: 82 })
    .toFile(outputPath)

  const inputSize = (await import('fs')).statSync(inputPath).size
  const outputSize = (await import('fs')).statSync(outputPath).size
  console.log(`✓ ${file} → ${outputName}  (${Math.round(inputSize/1024)}Ko → ${Math.round(outputSize/1024)}Ko)`)
}

console.log(`\n${files.length} images converties dans ${OUTPUT_DIR}`)
