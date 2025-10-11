import type CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'
import setCrawlState from '../../set.ts'
import cloneCrawlState from '../../clone.ts'

const switchTeams = async (
  previous: CrawlState = getCrawlState(),
  save: boolean = true
): Promise<CrawlState> => {
  const copy = cloneCrawlState(previous)
  copy.crew.teams.starboard.onDuty = !copy.crew.teams.starboard.onDuty
  copy.crew.teams.larboard.onDuty = !copy.crew.teams.starboard.onDuty
  return save ? await setCrawlState(copy) : copy
}

export default switchTeams
