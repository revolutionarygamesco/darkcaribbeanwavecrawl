import mapXP from './map-xp.ts'

describe('mapXP', () => {
  it('turns a record of crew position experience into a map', () => {
    const record: Record<string, Record<string, number>> = { captain: { 'calico-jack': 1 } }
    const actual = mapXP(record)
    expect(actual.get('captain')?.get('calico-jack')).toEqual(record.captain['calico-jack'])
  })

  it('is immutable', () => {
    const record: Record<string, Record<string, number>> = { captain: { 'calico-jack': 1 } }
    const actual = mapXP(record)
    record.captain['calico-jack'] = 2
    expect(actual.get('captain')?.get('calico-jack')).not.toEqual(record.captain['calico-jack'])
  })
})
