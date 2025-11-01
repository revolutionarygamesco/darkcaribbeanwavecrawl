import { william } from '../utilities/testing/crew.ts'
import calculateFreeSpace, { PROVISION_TYPES, FREE_SPACE_DAYS } from './free-space.ts'

describe('calculateFreeSpace', () => {
  it('calculates the free space on the ship', async () => {
    const fullCrew = william.system!.attributes.crew!.max
    const expected = fullCrew * PROVISION_TYPES * FREE_SPACE_DAYS
    expect(await calculateFreeSpace(william)).toBe(expected)
  })
})
