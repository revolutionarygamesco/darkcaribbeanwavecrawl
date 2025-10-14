import type CrawlState from '../../state.ts'
import getCopy from '../../get-copy.ts'
import setCrawlState from '../../set.ts'

const switchTeams = async (
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const copy = await getCopy(state)
  copy.crew.teams.starboard.onDuty = !copy.crew.teams.starboard.onDuty
  copy.crew.teams.larboard.onDuty = !copy.crew.teams.starboard.onDuty
  return save ? await setCrawlState(copy) : copy
}

export default switchTeams
