import mapPositions from './map-positions.ts'

describe('mapPositions', () => {
  it('turns a record of crew positions into a map', () => {
    const record: Record<string, string[]> = { captain: ['calico-jack'] }
    const actual = mapPositions(record)
    expect(actual.get('captain')).toEqual(record.captain)
  })

  it('is immutable', () => {
    const record: Record<string, string[]> = { captain: ['calico-jack'] }
    const actual = mapPositions(record)
    record.captain = ['calico-jack', 'anne-bonny']
    expect(actual.get('captain')).not.toEqual(record.captain)
  })
})
