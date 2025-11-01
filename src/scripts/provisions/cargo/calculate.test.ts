import { william } from '../../utilities/testing/crew.ts'
import { CrawlProvisionStores } from '../../state/state.ts'
import calculateCargoSpaceNeeded from './calculate.ts'

describe('calculateCargoSpaceNeeded', () => {
  beforeEach(() => {
    william.system!.attributes.cargo = { value: 0, max: 2 }
  })

  it.each([
    [0, 0, { food: 0, water: 0, rum: 0 }],
    [0, 3, { food: 1, water: 1, rum: 1 }],
    [0, 420, { food: 140, water: 140, rum: 140 }],
    [1, 421, { food: 141, water: 140, rum: 140 }],
    [1, 670, { food: 223, water: 224, rum: 223 }],
    [2, 671, { food: 224, water: 224, rum: 223 }],
    [2, 920, { food: 307, water: 307, rum: 306 }],
    [3, 921, { food: 307, water: 307, rum: 307 }]
  ] as [number, number, CrawlProvisionStores][])('calls for %d cargo slots to store %d rations', async (expected, _total, stores) => {
    expect(await calculateCargoSpaceNeeded(stores, william)).toBe(expected)
  })
})
