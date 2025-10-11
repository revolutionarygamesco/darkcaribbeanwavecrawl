import CrawlState, { CrawlTeamSide } from '../../../state.ts'
import getOppositeSide from '../opposite.ts'
import getCrawlState from '../../../get.ts'
import cloneCrawlState from '../../../clone.ts'
import setCrawlState from '../../../set.ts'
import getActorId from '../../../../utilities/actor-id.ts'
import removeTeamMember from '../remove.ts'

const setLookout = async (
  side: CrawlTeamSide,
  helm: Actor | string,
  previous: CrawlState = getCrawlState(),
  save: boolean = true
): Promise<CrawlState> => {
  const id = getActorId(helm)
  const opposite = getOppositeSide(side)
  const { officer } = previous.crew.teams[opposite]
  if ((previous.crew.positions[officer] ?? []).includes(id)) return previous

  const copy = cloneCrawlState(previous)
  copy.crew.teams[side].lookout = id
  copy.crew.teams[side].members = [...new Set([...copy.crew.teams[side].members, id])]
  removeTeamMember(opposite, id, copy)
  return save ? await setCrawlState(copy) : copy
}

export default setLookout
