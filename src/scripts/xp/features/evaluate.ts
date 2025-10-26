import type CrawlState from '../../state/state.ts'
import getCrawlState from '../../state/get.ts'
import ids from '../../ids.ts'
import getXP from '../../state/crew/xp/get.ts'
import rank from '../rank.ts'
import setFeatures from './set.ts'

const evalFeatures = async (state?: CrawlState): Promise<void> => {
  if (!game.actors) return
  const cs = state ?? await getCrawlState()

  for (const id in cs.crew.xp) {
    for (const position in cs.crew.xp[id]) {
      if (!(position in ids.xp)) continue
      const { able, seasoned, veteran } = ids.xp[position as keyof typeof ids.xp]
      const tiers = [able, seasoned, veteran]
      const xp = await getXP(id, position, cs)
      const r = rank(xp)

      if (r === 'able') await setFeatures(id, 0, tiers)
      if (r === 'seasoned') await setFeatures(id, 1, tiers)
      if (r === 'veteran') await setFeatures(id, 2, tiers)
    }
  }
}

export default evalFeatures
