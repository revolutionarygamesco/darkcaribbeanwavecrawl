import { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'
import type CrawlState from './state.ts'

const initCrawlState = (): CrawlState => {
  const defaultStart = '24 July 1715'
  const str = game.settings.get<string>(MODULE_ID, MODULE_SETTINGS.STARTDATE) ?? defaultStart
  const start = new Date(str)

  return {
    date: {
      start: isNaN(start.getTime()) ? new Date(defaultStart) : start,
      minutes: 0
    },
    crew: {
      positions: {},
      teams: {
        quartermaster: { crew: [] },
        sailmaster: { crew: [] }
      },
      xp: {}
    },
    provisions: {
      food: 0,
      water: 0,
      rum: 0
    },
    silver: {
      ship: 0,
      crew: {}
    },
    chapter: 1,
    winds: 2,
    haunt: 1
  }
}

export default initCrawlState
