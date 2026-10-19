import { FlagEmbedding, EmbeddingModel } from 'fastembed'

let model: FlagEmbedding | null = null

export async function embed(text: string): Promise<number[]> {
  if (!model) {
    model = await FlagEmbedding.init({ model: EmbeddingModel.BGESmallENV15 })
  }
  const gen = model.embed([text])
  for await (const batch of gen) {
    return Array.from(batch[0])
  }
  throw new Error('No embedding returned')
}
