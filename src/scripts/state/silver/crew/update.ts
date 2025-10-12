import type CrawlState from '../../state.ts'
import setCrawlState from '../../set.ts'
import cloneCrawlState from '../../clone.ts'
import getRoster from '../../crew/get.ts'
import getCrawlState from '../../get.ts'

export const fetchCrewSilver = (state: CrawlState = getCrawlState()): Record<string, number> => {
  const roster = getRoster(state)
  const ledger: Record<string, number> = {}
  for (const actor of roster) {
    ledger[actor.id] = actor.system.silver ?? 0
  }
  return ledger
}

const updateCrewSilver = async (previous: CrawlState, skipSave: boolean = false): Promise<CrawlState> => {
  const copy = cloneCrawlState(previous)
  copy.silver.crew = fetchCrewSilver(copy)
  return skipSave ? copy : await setCrawlState(copy)
}

export default updateCrewSilver
