import CrawlState, { GlossedPositionData } from '../../state/state.ts'
import getCrawlState from '../../state/get.ts'
import glossPosition from './gloss.ts'

const glossAllPositions = async (
  state?: CrawlState
): Promise<Record<string, GlossedPositionData>> => {
  const { positions } = (state ?? await getCrawlState()).crew
  const glossary: Record<string, GlossedPositionData> = {}
  for (const key in positions) glossary[key] = await glossPosition(key, positions[key])
  return glossary
}

export default glossAllPositions
