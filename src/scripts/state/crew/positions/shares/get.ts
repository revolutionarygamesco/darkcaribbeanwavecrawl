import type CrawlState from '../../../state.ts'
import getCrawlState from '../../../get.ts'

const getShares = async (
  position: string,
  state?: CrawlState
): Promise<number | null> => {
  const cs = state ?? await getCrawlState()
  const pos = cs.crew.positions[position]
  return pos && pos.shares ? pos.shares : null
}

export default getShares
