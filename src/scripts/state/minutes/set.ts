import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import setCrawlState from '../set.ts'

const setMinutes = async (
  minutes: number,
  previous: CrawlState = getCrawlState(),
  skipSave: boolean = false
): Promise<CrawlState> => {
  const copy = { ...previous }
  copy.minutes = minutes
  if (!skipSave) await setCrawlState(copy)
  return copy
}

export default setMinutes
