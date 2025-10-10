import mapCrewSilver from './map-crew-silver.ts'

describe('mapCrewSilver', () => {
  it('turns a record of each crew member’s silver into a map', () => {
    const record: Record<string, number> = { 'calico-jack': 5000000 }
    const actual = mapCrewSilver(record)
    expect(actual.get('calico-jack')).toEqual(record['calico-jack'])
  })

  it('is immutable', () => {
    const record: Record<string, number> = { 'calico-jack': 5000000 }
    const actual = mapCrewSilver(record)
    record['calico-jack'] = 0
    expect(actual.get('calico-jack')).not.toEqual(record['calico-jack'])
  })
})
