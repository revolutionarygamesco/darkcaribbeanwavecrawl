import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'

const getSilver = async (
  state?: CrawlState
): Promise<number> => {
  return (state ?? await getCrawlState()).silver.company
}

export default getSilver
