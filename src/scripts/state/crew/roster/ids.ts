import type CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'

const getRosterIds = async (
  state?: CrawlState
): Promise<string[]> => {
  let ids: string[] = []
  const { positions } = (state ?? await getCrawlState()).crew

  for (const position in positions) {
    if (!positions[position]) continue
    ids = [...new Set([...ids, ...positions[position]])]
  }

  return ids
}

export default getRosterIds
