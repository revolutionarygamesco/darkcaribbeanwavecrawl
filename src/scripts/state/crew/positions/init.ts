import type CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'
import cloneCrawlState from '../../clone.ts'
import setCrawlState from '../../set.ts'

const initPosition = async (
  position: string,
  shares: number = 1,
  previous: CrawlState = getCrawlState(),
  save: boolean = true
): Promise<CrawlState> => {
  const copy = cloneCrawlState(previous)
  if (copy.crew.positions[position]) return copy
  copy.crew.positions[position] = { shares, assigned: [] }
  return save ? setCrawlState(copy) : copy
}

export default initPosition
