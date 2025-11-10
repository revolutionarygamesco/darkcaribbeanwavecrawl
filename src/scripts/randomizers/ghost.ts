import CrawlState, { Ghost } from '../state/state.ts'
import getCrawlState from '../state/get.ts'
import toShuffledArray from '../utilities/shuffle.ts'

const selectRandomGhost = async (
  n: number = 1,
  state?: CrawlState
): Promise<Ghost | Ghost[]> => {
  const cs = state ?? await getCrawlState()
  const shuffled = toShuffledArray(cs.ghosts.haunting)

  if (shuffled.length < 1) return []
  if (n === 1) return shuffled[0]
  return shuffled.slice(0, n)
}

export default selectRandomGhost
