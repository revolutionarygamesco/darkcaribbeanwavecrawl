import type CrawlState from '../state.ts'
import type GhostReport from './report.ts'
import getCrawlState from '../get.ts'
import describeHaunt from './describe.ts'

const getGhosts = async (
  state?: CrawlState
): Promise<GhostReport> => {
  const cs = state ?? await getCrawlState()
  const haunt = await describeHaunt(cs)
  return { haunt, ghosts: cs.ghosts.haunting }
}

export default getGhosts
