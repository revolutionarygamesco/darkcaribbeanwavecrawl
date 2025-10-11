import type CrawlState from '../state.ts'
import type Winds from './winds.ts'
import getCrawlState from '../get.ts'
import describeWinds from './describe.ts'

const getWinds = (state: CrawlState = getCrawlState()): Winds => {
  const value = state.winds
  const description = describeWinds(value)
  return { value, description }
}

export default getWinds
