import type CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'
import mapIdsToActors from '../../../utilities/map-ids-to-actors.ts'

const getAssigned = (position: string, state: CrawlState = getCrawlState()): Actor[] => {
  const pos = state.crew.positions[position]
  const ids = pos && pos.assigned ? pos.assigned : []
  return mapIdsToActors(ids)
}

export default getAssigned
