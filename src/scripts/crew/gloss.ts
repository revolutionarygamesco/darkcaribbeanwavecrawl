import type { Assignment, GlossedAssignment } from './Assignment.ts'
import { MODULE_ID} from '../settings.ts'
import localize from '../utilities/localize.ts'

const glossAssignment = async (assignment: Assignment): Promise<GlossedAssignment> => {
  const { id } = assignment
  const actors: Actor[] = []
  for (const id of assignment.assigned) {
    const actor = game.actors.get(id)
    if (actor?.type === 'character') actors.push(actor)
  }

  return {
    ...assignment,
    actors,
    title: localize(`${MODULE_ID}.crew-positions.${id}.title`),
    desc: localize(`${MODULE_ID}.crew-positions.${id}.desc`),
    sans: localize(`${MODULE_ID}.crew-positions.${id}.sans`)
  }
}

export default glossAssignment
