import CrawlState from '../../../state.ts'
import initCrawlState from '../../../init.ts'
import removeHelm from './remove.ts'

describe('removeHelm', () => {
  let before: CrawlState
  const anne = 'anne-bonny'

  beforeEach(() => {
    before = initCrawlState()
    before.crew.teams.starboard.members = [anne]
    before.crew.teams.starboard.helm = anne
  })

  it('removes character as the team’s designated helmsman', async () => {
    const after = await removeHelm('starboard', before, false)
    expect(after.crew.teams.starboard.helm).toBeUndefined()
    expect(after.crew.teams.starboard.members).toContain(anne)
  })
})
