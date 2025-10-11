import type CrawlState from '../../state.ts'
import setCrawlState from '../../set.ts'
import cloneCrawlState from '../../clone.ts'
import getRoster from '../../crew/get.ts'

const updateCrewSilver = async (previous: CrawlState, skipSave: boolean = false): Promise<CrawlState> => {
  const copy = cloneCrawlState(previous)
  const roster = getRoster(copy)
  for (const actor of roster) {
    copy.silver.crew[actor.id] = actor.system.silver ?? 0
  }
  return skipSave ? copy : await setCrawlState(copy)
}

export default updateCrewSilver
