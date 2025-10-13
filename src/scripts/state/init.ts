import type CrawlState from './state.ts'

const initCrawlState = (): CrawlState => ({
  crew: {
    positions: {
      captain: { shares: 2, assigned: [] },
      quartermaster: { shares: 2, assigned: [] },
      ['sailing-master']: { shares: 1.5, assigned: [] },
      bosun: { shares: 1.5, assigned: [] },
      gunner: { shares: 1.5, assigned: [] },
      carpenter: { shares: 1.25, assigned: [] },
      cook: { shares: 1.25, assigned: [] },
      surgeon: { shares: 1.25, assigned: [] },
      ['master-arms']: { shares: 1.25, assigned: [] },
      ['deck-priest']: { shares: 1.25, assigned: [] },
      ['deck-sorcerer']: { shares: 1.25, assigned: [] }
    },
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
