import initCrawlState from '../../init.ts'
import setupCrew, { setupState, william, jack, anne, mary } from '../../../utilities/testing/crew.ts'
import setAssigned from './set.ts'

describe('setAssigned', () => {
  setupCrew(true)

  it.each([
    ['captain', jack],
    ['mate', [anne, mary]],
    ['captain', []]
  ] as [string, string | string[]][])('sets %s to %s', async (position, value) => {
    const before = initCrawlState()
    before.ship.actor = 'william'
    const after = await setAssigned(position, value, before, false)
    const arr = typeof value === 'string' ? [value] : value
    expect(after?.crew.positions[position]).toHaveLength(arr.length)
    expect(after?.crew.positions[position]).toEqual(arr)
    expect(after).not.toBe(before)
  })

  it('sets the ship crew size', async () => {
    await setAssigned('crew', [], setupState(), false)
    expect(william.system?.attributes.crew?.value).toBe(2)
  })
})
