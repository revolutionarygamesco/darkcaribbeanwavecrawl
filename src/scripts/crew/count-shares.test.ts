import countShares from './count-shares.ts'

describe('countShares', () => {
  it('counts up the total number of shares', () => {
    const { total, shares } = countShares({
      captain: {
        id: 'captain',
        shares: 1.5,
        assigned: ['calico-jack']
      },
      quartermaster: {
        id: 'quartermaster',
        shares: 1.25,
        assigned: ['anne-bonny']
      },
      gunner: {
        id: 'gunner',
        shares: 1,
        assigned: ['calico-jack', 'anne-bonny', 'mary-read']
      }
    })

    // Each member of the crew is only counted once, for the highest value
    // of any assignment they hold, so Jack gets 1.5 as captain, Anne gets
    // 1.25 as quartermaster, and Mary gets 1 as gunner.
    expect(total).toBe(1.5 + 1.25 + 1)
    expect(shares['calico-jack']).toBe(1.5)
    expect(shares['anne-bonny']).toBe(1.25)
    expect(shares['mary-read']).toBe(1)
  })
})
