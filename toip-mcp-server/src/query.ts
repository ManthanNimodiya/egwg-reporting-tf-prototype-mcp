import { LocalIndex } from 'vectra'
import path from 'path'
import { fileURLToPath } from 'url'
import { embed } from './embed.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const index = new LocalIndex(path.join(__dirname, '..', '.index'))

const query = process.argv.slice(2).join(' ')
if (!query) {
  console.error('Usage: npm run query "your question"')
  process.exit(1)
}

const results = await index.queryItems(await embed(query), query, 5)

console.log(
  JSON.stringify(
    results.map((r) => ({ score: r.score, metadata: r.item.metadata })),
    null,
    2
  )
)
