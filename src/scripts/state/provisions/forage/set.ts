import type CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'
import setCrawlState from '../../set.ts'
import cloneCrawlState from '../../clone.ts'

const setForage = async (
  value: boolean,
  previous: CrawlState = getCrawlState(),
  skipSave: boolean = false
): Promise<CrawlState> => {
  const copy = cloneCrawlState(previous)
  copy.provisions.forage = value
  if (!skipSave) await setCrawlState(copy)
  return copy
}

export default setForage
