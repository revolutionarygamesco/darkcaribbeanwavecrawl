import CrawlState, { CrawlTeamSide } from '../../../state.ts'
import getOppositeSide from '../opposite.ts'
import getCrawlState from '../../../get.ts'
import cloneCrawlState from '../../../clone.ts'
import setCrawlState from '../../../set.ts'
import getActorId from '../../../../utilities/actor-id.ts'
import removeTeamMember from '../remove.ts'
import warnExempt from '../warn-exempt.ts'

const setLookout = async (
  side: CrawlTeamSide,
  lookout: Actor | string,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const previous = state ?? await getCrawlState()
  const id = getActorId(lookout)
  await warnExempt([lookout], previous)
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
