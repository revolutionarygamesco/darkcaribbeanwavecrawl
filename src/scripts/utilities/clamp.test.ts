import clamp from './clamp'

describe('clamp', () => {
  it('returns min if given a value too small', () => {
    expect(clamp(1, 2, 3)).toBe(2)
  })

  it('returns the value if between min and max', () => {
    expect(clamp(2, 1, 3)).toBe(2)
  })

  it('returns the max if given a value too big', () => {
    expect(clamp(3, 1, 2)).toBe(2)
  })
})
