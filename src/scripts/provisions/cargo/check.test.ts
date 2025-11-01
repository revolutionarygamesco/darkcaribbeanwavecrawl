import { william } from '../../utilities/testing/crew.ts'
import checkCargoSpace from './check.ts'

describe('calculateCargoSpaceNeeded', () => {
  beforeEach(() => {
    william.system!.attributes.cargo = { value: 0, max: 2 }
    william.collections = { items: new Map<string, Document>() }
  })

  it('returns true when you’re only using free space', async () => {
    const provisions = { food: 10, water: 10, rum: 10 }
    const { will, could } = await checkCargoSpace(provisions, william)
    expect(will).toBe(true)
    expect(could).toBe(true)
  })

  it('returns true when you need cargo but have room for it', async () => {
    const provisions = { food: 300, water: 300, rum: 300 }
    const { will, could } = await checkCargoSpace(provisions, william)
    expect(will).toBe(true)
    expect(could).toBe(true)
  })

  it('returns true when you have cargo slots for it', async () => {
    william.collections.items.set('cargo1', { id: 'cargo1', name: 'Provisions', type: 'cargo', system: { value: '30' } } as unknown as Document)
    william.collections.items.set('cargo2', { id: 'cargo2', name: 'Treasure', type: 'cargo', system: { value: '1000' } } as unknown as Document)
    william.system!.attributes.cargo = { value: 2, max: 2 }
    const provisions = { food: 150, water: 150, rum: 150 }
    const { will, could } = await checkCargoSpace(provisions, william)
    expect(will).toBe(true)
    expect(could).toBe(true)
  })

  it('returns false when it’s more than the ship can hold', async () => {
    const provisions = { food: 350, water: 350, rum: 350 }
    const { will, could } = await checkCargoSpace(provisions, william)
    expect(will).toBe(false)
    expect(could).toBe(false)
  })

  it('returns false when it’s more than you have the cargo space for', async () => {
    william.collections.items.set('cargo1', { id: 'cargo1', name: 'Treasure', type: 'cargo', system: { value: '1000' } } as unknown as Document)
    william.collections.items.set('cargo2', { id: 'cargo2', name: 'Treasure', type: 'cargo', system: { value: '1000' } } as unknown as Document)
    william.system!.attributes.cargo = { value: 2, max: 2 }
    const provisions = { food: 145, water: 145, rum: 145 }
    const { will, could } = await checkCargoSpace(provisions, william)
    expect(will).toBe(false)
    expect(could).toBe(true)
  })
})
