import { MODULE_ID } from '../../settings.ts'
import { Ghost } from '../state.ts'
import * as uuid from 'uuid'
import localize from '../../utilities/localize.ts'

const completeGhost = (input: Partial<Ghost>): Ghost => {
  const path = [MODULE_ID, 'default-ghost']
  return {
    id: input.id ?? uuid.v4(),
    names: {
      haunted: input.names?.haunted ?? localize([...path, 'names', 'haunted'].join('.')),
      human: input.names?.human ?? localize([...path, 'names', 'human'].join('.'))
    },
    actor: input.actor,
    notes: input.notes ?? localize([...path, 'notes'].join('.')),
    status: {
      seen: input.status?.seen ?? false,
      named: input.status?.named ?? false
    }
  }
}

export default completeGhost
