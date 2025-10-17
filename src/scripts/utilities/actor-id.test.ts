import getActorId from './actor-id.ts'

describe('getActorId', () => {
  const id = 'calico-jack'

  it('returns the string if given a string', () => {
    expect(getActorId(id)).toBe(id)
  })

  it('returns the ID if given an Actor', () => {
    expect(getActorId({ id } as Actor)).toBe(id)
  })
})
