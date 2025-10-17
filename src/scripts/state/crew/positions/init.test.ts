import initCrawlState from '../../init.ts'
import initPosition from './init.ts'

describe('initPosition', () => {
  it('initializes a new position', async () => {
    const position = 'code-monkey'
    const actual = await initPosition(position, 1, initCrawlState(), false)
    const { shares, assigned } = actual.crew.positions[position]
    expect(shares).toBe(1)
    expect(assigned).toHaveLength(0)
  })
})
