import type CrawlState from '../../state.ts'
import getRosterIds from './ids.ts'

const getRosterCount = async (
  state?: CrawlState
): Promise<number> => {
  const ids = await getRosterIds(state)
  return ids.length
}

export default getRosterCount
