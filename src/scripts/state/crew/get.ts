import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import mapIdsToActors from '../../utilities/map-ids-to-actors.ts'

const getRoster = async (
  state?: CrawlState
): Promise<Actor[]> => {
  let ids: string[] = []
  const { positions } = (state ?? await getCrawlState()).crew

  for (const position in positions) {
    if (!positions[position]?.assigned) continue
    ids = [...new Set([...ids, ...positions[position].assigned])]
  }

  return mapIdsToActors(ids)
}

export default getRoster
