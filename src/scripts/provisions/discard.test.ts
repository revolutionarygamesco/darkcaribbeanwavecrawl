import { CrawlProvisionStores } from '../state/state.ts'
import discardProvisions from './discard.ts'

describe('discardProvisions', () => {
  it('discards in a round robin', async () => {
    const before: CrawlProvisionStores = { food: 40, water: 30, rum: 20 }
    const { food, water, rum } = await discardProvisions(70, before)
    expect(food).toBe(15)
    expect(water).toBe(5)
    expect(rum).toBe(0)
  })
})
