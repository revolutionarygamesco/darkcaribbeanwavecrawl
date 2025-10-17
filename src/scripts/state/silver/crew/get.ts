import type CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'

const getCrewSilver = async (
  id: string,
  state?: CrawlState
): Promise<number | null> => {
  return (state ?? await getCrawlState()).silver.crew[id] ?? null
}

export default getCrewSilver
