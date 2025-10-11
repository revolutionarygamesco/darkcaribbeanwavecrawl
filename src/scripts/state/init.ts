import type CrawlState from './state.ts'

const initCrawlState = (): CrawlState => ({
  crew: {
    positions: {},
    teams: {
      starboard: { officer: 'quartermaster', crew: [] },
      larboard: { officer: 'sailing-master', crew: [] }
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
  ship: {
    barnacles: 0
  },
  minutes: 0,
  chapter: 1,
  winds: 2,
  haunt: 1
})

export default initCrawlState
