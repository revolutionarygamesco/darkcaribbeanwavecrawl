import getShares from './get.ts'

describe('getShares', () => {
  it('gets the shares assigned to a position from the state', async () => {
    expect(await getShares('captain')).toBe(2)
  })

  it('returns null if there is no such position', async () => {
    expect(await getShares('code monkey')).toBeNull()
  })
})
