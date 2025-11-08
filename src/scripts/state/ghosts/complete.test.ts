import { MODULE_ID } from '../../settings.ts'
import { Ghost } from '../state.ts'
import * as uuid from 'uuid'
import localize from '../../utilities/localize.ts'
import completeGhost from './complete.ts'

describe('completeGhost', () => {
  it('turns a partial into a full ghost', () => {
    const input: Partial<Ghost> = {}
    const { id, names, actor, notes, status } = completeGhost(input)
    console.log({ id, validation: uuid.validate(id) })
    expect(uuid.validate(id)).toBe(true)
    expect(names.haunted).toBe(localize(`${MODULE_ID}.default-ghost.names.haunted`))
    expect(names.human).toBe(localize(`${MODULE_ID}.default-ghost.names.human`))
    expect(actor).toBeUndefined()
    expect(notes).toBe(localize(`${MODULE_ID}.default-ghost.notes`))
    expect(status.seen).toBe(false)
    expect(status.named).toBe(false)
  })

  it('preserves what it’s given', () => {
    const casper: Partial<Ghost> = {
      id: 'casper',
      names: { haunted: 'The Friendly Ghost', human: 'Casper' },
      actor: 'casper',
      notes: 'He’s a friendly ghost.',
      status: { seen: true, named: true }
    }

    const actual = completeGhost(casper)
    expect(actual).toEqual(casper)
  })
})
