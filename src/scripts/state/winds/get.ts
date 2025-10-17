import type CrawlState from '../state.ts'
import type Winds from './winds.ts'
import getCrawlState from '../get.ts'
import describeWinds from './describe.ts'

const getWinds = async (
  state?: CrawlState
): Promise<Winds> => {
  const value = (state ?? await getCrawlState()).winds
  const description = describeWinds(value)
  return { value, description }
}

export default getWinds
