import type CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'
import setCrawlState from '../../set.ts'
import cloneCrawlState from '../../clone.ts'

const setBarnacles = async (
  minutes: number,
  previous: CrawlState = getCrawlState(),
  skipSave: boolean = false
): Promise<CrawlState> => {
  const copy = cloneCrawlState(previous)
  copy.ship.barnacles = minutes
  if (!skipSave) await setCrawlState(copy)
  return copy
}

export default setBarnacles
