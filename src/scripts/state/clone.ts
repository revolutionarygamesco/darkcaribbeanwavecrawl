import type CrawlState from './state.ts'

const cloneCrawlState = (original: CrawlState): CrawlState => {
  if (typeof structuredClone === 'undefined') return JSON.parse(JSON.stringify(original))
  return structuredClone(original)
}

export default cloneCrawlState
