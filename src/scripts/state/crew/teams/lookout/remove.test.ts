import CrawlState from '../../../state.ts'
import initCrawlState from '../../../init.ts'
import removeLookout from './remove.ts'

describe('removeLookout', () => {
  let before: CrawlState
  const anne = 'anne-bonny'

  beforeEach(() => {
    before = initCrawlState()
    before.crew.teams.starboard.members = [anne]
    before.crew.teams.starboard.lookout = anne
  })

  it('removes character as the team’s designated lookout', async () => {
    const after = await removeLookout('starboard', before, false)
    expect(after.crew.teams.starboard.lookout).toBeUndefined()
    expect(after.crew.teams.starboard.members).toContain(anne)
  })
})
