import type CrawlState from '../../state.ts'

const getCrewSilver = (id: string, state: CrawlState): number | null => {
  return state.silver.crew[id] ?? null
}

export default getCrewSilver
