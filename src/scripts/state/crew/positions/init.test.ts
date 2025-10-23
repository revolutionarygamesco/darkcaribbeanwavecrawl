import initCrawlState from '../../init.ts'
import initPosition from './init.ts'

describe('initPosition', () => {
  it('initializes a new position', async () => {
    const position = 'code-monkey'
    const actual = await initPosition(position, initCrawlState(), false)
    expect(actual.crew.positions[position]).toHaveLength(0)
  })
})
