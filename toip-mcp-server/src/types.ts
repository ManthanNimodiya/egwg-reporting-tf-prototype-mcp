export interface ToipDocument {
  id: string
  project: string
  organizational_unit: string[]
  date: string
  source_system: string
  asset_type: string
  content_type: string
  title: string
  identifier: string
  identifier_type: string
  source_url: string
  content: string
  collected_at?: string
}

export interface DocumentChunk {
  doc_id: string
  chunk_index: number
  text: string
  metadata: Omit<ToipDocument, 'content'>
}
