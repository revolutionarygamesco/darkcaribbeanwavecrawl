import type CrawlState from '../state.ts'
import type GhostReport from './report.ts'
import getCrawlState from '../get.ts'
import describeHaunt from './describe.ts'

const getGhosts = async (
  state?: CrawlState
): Promise<GhostReport> => {
  const cs = state ?? await getCrawlState()
  const haunt = await describeHaunt(cs)
  const { haunting, potential } = cs.ghosts
  return { haunt, haunting, potential }
}

export default getGhosts
