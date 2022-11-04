import type { SearchResponse } from '@climatic/shared'
import { API_URL } from '@lib/config'

export interface SearchByQuery {
	q: string
}

export const searchByQuery = async ({ q }: SearchByQuery): Promise<SearchResponse> => {
	const queryString = new URLSearchParams({ q }).toString()
	const url = `${API_URL}/search?${queryString}`

	const data = await fetch(url).then(r => r.json()) as SearchResponse
	return data
}
