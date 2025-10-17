import type CrawlState from '../../state.ts'
import setCrawlState from '../../set.ts'
import getCopy from '../../get-copy.ts'

const setForage = async (
  value: boolean,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const copy = await getCopy(state)
  copy.provisions.forage = value
  return save ? await setCrawlState(copy) : copy
}

export default setForage
