import type CrawlState from '../state/state.ts'
import Watch, { isDogWatch } from './watch.ts'
import consume from './consume.ts'
import gainXP from '../state/crew/xp/gain.ts'
import saveCrawlState from '../state/save.ts'
import setCrawlState from '../state/set.ts'
import setFeatures from './set-features.ts'
import switchTeams from '../state/crew/teams/switch.ts'
import updateState from '../state/update.ts'

const changeWatch = async (
  end: Watch,
  before?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const xp = isDogWatch(end) ? 2 : 4
  let after = await updateState(before)
  after = await gainXP(xp, after, false)
  after = await switchTeams(after, false)
  if (end === 'first dog') after = await consume(after)
  await setFeatures(after)

  if (save) {
    await setCrawlState(after)
    await saveCrawlState(after)
  }

  return after
}

export default changeWatch
