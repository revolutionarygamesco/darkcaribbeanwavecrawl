import calculateConsumption from './consumption.ts'

describe('calculateConsumption', () => {
  it('calculates how much food, water, and rum a crew consumes in a day', () => {
    const { food, water, rum } = calculateConsumption(10)
    expect(food).toBe(10)
    expect(water).toBe(18)
    expect(rum).toBe(2)
  })
})
