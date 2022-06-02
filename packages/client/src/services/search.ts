import type { SearchResponse } from '@climatic/shared'

export interface SearchByQuery {
  q: string
}

export const searchByQuery = async ({ q }: SearchByQuery): Promise<SearchResponse> => {
  const queryString = new URLSearchParams({ q }).toString()
  const url = `/api/search?${queryString}`

  const data = await fetch(url).then(r => r.json()) as SearchResponse
  return data
}
