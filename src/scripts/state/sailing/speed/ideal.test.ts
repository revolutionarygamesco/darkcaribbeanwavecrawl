import { william } from '../../../utilities/testing/crew.ts'
import calculateIdealSpeed, { MILES_PER_NAUTICAL_MILE } from './ideal.ts'

describe('calculateIdealSpeed', () => {
  it('calculates ship’s ideal speed in knots', () => {
    const speed = william.system!.attributes.speed!.value
    const nauticalMilesPerDay = (speed * 50) / MILES_PER_NAUTICAL_MILE
    const expected = nauticalMilesPerDay / 24
    expect(calculateIdealSpeed(william)).toBeCloseTo(expected)
  })
})
