import type CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'

const getForage = async (
  state?: CrawlState
): Promise<boolean> => {
  return (state ?? await getCrawlState()).provisions.forage
}

export default getForage
