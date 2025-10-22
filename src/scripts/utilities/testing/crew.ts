import type CrawlState from '../../state/state.ts'
import initCrawlState from '../../state/init.ts'

export const jack = 'calico-jack'
export const anne = 'anne-bonny'
export const mary = 'mary-read'
export const extras = ['alice', 'bob', 'charlie', 'debbie', 'ed', 'frank', 'gary', 'harry', 'isabel', 'john']

export const william = {
  id: 'william',
  name: 'William',
  system: { attributes: { crew: { min: 3, max: 10, value: 0 } } },
  update: jest.fn().mockImplementation(async function(this: any, data: any) {
    if (data['system.attributes.crew.value'] !== undefined) {
      william.system.attributes.crew!.value = data['system.attributes.crew.value']
    }
  })
} as unknown as Actor

export const setupActors = (map: Map<string, Actor>, ...ids: string[]) => {
  for (const id of ids) map.set(id, { id, system: { silver: 50 } } as Actor)
}

export const setupState = (): CrawlState => {
  const state = initCrawlState()
  state.ship.actor = 'william'
  state.crew.positions.captain = { shares: 2, assigned: [jack] }
  state.crew.positions.quartermaster = { shares: 1.5, assigned: [anne] }
  state.crew.positions.crew = { shares: 1, assigned: [mary] }
  state.crew.xp = {
    [jack]: { quartermaster: 200, crew: 10 },
    [anne]: { captain: 0, crew: 1000 },
    [mary]: { captain: 0, quartermaster: 0, crew: 1000 }
  }
  return state
}

const setupCrew = (includeExtras: boolean = false) => {
  let originalActors: Map<string, Actor>

  beforeAll(() => {
    originalActors = game.actors
  })

  beforeEach(() => {
    game.actors = new Map<string, Actor>()
    game.actors.set(william.id, william)
    setupActors(game.actors, jack, anne, mary)
    if (includeExtras) setupActors(game.actors, ...extras)
  })

  afterEach(() => {
    game.actors = originalActors
  })
}

export default setupCrew
