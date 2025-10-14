import type CrawlState from '../state.ts'
import type Haunt from './haunt.ts'
import getCrawlState from '../get.ts'
import describeHaunt from './describe.ts'

const getHaunt = async (
  state?: CrawlState
): Promise<Haunt> => {
  const value = (state ?? await getCrawlState()).haunt
  const description = describeHaunt(value)
  return { value, description }
}

export default getHaunt
