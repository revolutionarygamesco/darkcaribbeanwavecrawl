import type CrawlState from '../state.ts'
import mapIdsToActors from '../../utilities/map-ids-to-actors.ts'

const getRoster = (state: CrawlState): Actor[] => {
  let ids: string[] = []

  for (const position in state.crew.positions) {
    if (!state.crew.positions[position]?.assigned) continue
    ids = [...new Set([...ids, ...state.crew.positions[position].assigned])]
  }

  return mapIdsToActors(ids)
}

export default getRoster
