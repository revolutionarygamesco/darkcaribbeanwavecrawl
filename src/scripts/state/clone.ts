import type CrawlState from './state.ts'

const cloneCrawlState = (original: CrawlState): CrawlState => {
  if ('structuredClone' in global) return structuredClone(original)
  return JSON.parse(JSON.stringify(original))
}

export default cloneCrawlState
