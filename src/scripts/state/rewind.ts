import type CrawlState from './state.ts'
import getSavedCrawlStates from './get-saved-crawl-states.ts'
import setSavedCrawlStates from './set-saved-crawl-states.ts'
import setCrawlState from './set.ts'

const rewind = async (
  goal: Date,
  stack?: CrawlState[],
  save: boolean = true
): Promise<CrawlState> => {
  const timestamp = goal.getTime()
  const states = stack ?? await getSavedCrawlStates()
  const sorted = states.sort((a, b) => a.timestamp - b.timestamp)
  const earlier = sorted.filter(state => state.timestamp <= timestamp)
  if (earlier.length === 0) earlier.push(sorted[0])

  const state = earlier[earlier.length - 1]
  if (!save) return state
  await setSavedCrawlStates(earlier)
  return await setCrawlState(state)
}

export default rewind
