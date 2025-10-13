import CrawlState, { GlossedPositionData } from '../../state/state.ts'
import getCrawlState from '../../state/get.ts'
import glossPosition from './gloss.ts'

const glossAllPositions = (state: CrawlState = getCrawlState()): Record<string, GlossedPositionData> => {
  const { positions } = state.crew
  const glossary: Record<string, GlossedPositionData> = {}
  for (const key in positions) glossary[key] = glossPosition(key, positions[key])
  return glossary
}

export default glossAllPositions
