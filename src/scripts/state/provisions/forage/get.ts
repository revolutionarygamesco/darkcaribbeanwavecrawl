import type CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'

const getForage = (state: CrawlState = getCrawlState()): boolean => {
  return state.provisions.forage
}

export default getForage
