import { LocalIndex } from 'vectra'
import { embed } from './embed.js'
import path from 'path'
import { fileURLToPath } from 'url'
import type { ToipDocument } from './types.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const DATA_SOURCES = [
  'https://raw.githubusercontent.com/carlyh-micb/mcp_data_generation/main/data/curated/GMT20260917-145549_Recording.transcript.json',
  'https://raw.githubusercontent.com/carlyh-micb/mcp_data_generation/main/data/curated/GMT20260917-145549_Recording.cc.json',
  'https://raw.githubusercontent.com/carlyh-micb/mcp_data_generation/main/data/curated/GMT20260917-145549_RecordingnewChat.json',
  'https://raw.githubusercontent.com/carlyh-micb/mcp_data_generation/main/data/curated/GMT20261001-145557_Recording.transcript.json',
  'https://raw.githubusercontent.com/carlyh-micb/mcp_data_generation/main/data/curated/GMT20261001-145557_Recording.cc.json',
  'https://raw.githubusercontent.com/carlyh-micb/mcp_data_generation/main/data/curated/GMT20261001-145557_RecordingnewChat.json',
]

const CHUNK_SIZE = 500
const CHUNK_OVERLAP = 50

function chunkText(text: string, size: number, overlap: number): string[] {
  const words = text.split(' ')
  const chunks: string[] = []
  let i = 0
  while (i < words.length) {
    chunks.push(words.slice(i, i + size).join(' '))
    i += size - overlap
  }
  return chunks
}

async function fetchDocument(url: string): Promise<ToipDocument> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  return res.json() as Promise<ToipDocument>
}

export async function ingest(indexPath: string) {
  const index = new LocalIndex(indexPath)

  if (await index.isIndexCreated()) {
    await index.deleteIndex()
  }
  await index.createIndex()

  for (const url of DATA_SOURCES) {
    console.log(`Fetching ${url.split('/').pop()}...`)
    const doc = await fetchDocument(url)
    const chunks = chunkText(doc.content, CHUNK_SIZE, CHUNK_OVERLAP)

    for (let i = 0; i < chunks.length; i++) {
      const vector = await embed(chunks[i])

      await index.insertItem({
        vector,
        metadata: {
          doc_id: doc.id,
          chunk_index: i,
          chunk_text: chunks[i],
          title: doc.title,
          date: doc.date,
          project: doc.project,
          organizational_unit: JSON.stringify(doc.organizational_unit),
          source_system: doc.source_system,
          asset_type: doc.asset_type,
          content_type: doc.content_type,
          identifier: doc.identifier,
          identifier_type: doc.identifier_type,
          source_url: doc.source_url,
          collected_at: doc.collected_at ?? '',
        },
      })
    }
    console.log(`  → ${chunks.length} chunks indexed for ${doc.id}`)
  }

  console.log('Ingestion complete.')
}

const indexPath = path.join(__dirname, '..', '.index')
await ingest(indexPath)
