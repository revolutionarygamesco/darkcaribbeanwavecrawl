import type CrawlState from './state.ts'

const initCrawlState = (): CrawlState => ({
  crew: {
    positions: {},
    teams: {
      starboard: { officer: 'quartermaster', members: [], onDuty: true },
      larboard: { officer: 'sailing-master', members: [], onDuty: false }
    },
    xp: {}
  },
  provisions: {
    food: 0,
    water: 0,
    rum: 0,
    forage: false
  },
  silver: {
    company: 0,
    crew: {}
  },
  ship: {
    barnacles: 0,
    position: {
      x: 2750, y: 1083, rotation: 30
    }
  },
  timestamp: -8029350000,
  chapter: 1,
  winds: 2,
  haunt: 1
})

export default initCrawlState
