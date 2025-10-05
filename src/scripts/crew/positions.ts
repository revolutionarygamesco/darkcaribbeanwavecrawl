import { MODULE_ID } from '../settings.ts'
import localize from '../utilities/localize.ts'
import getAssignments from './get.ts'

export interface Position {
  id: string
  title: string
  desc: string
  sans: string
  assigned: Actor[]
}

const getPosition = async (id: string, assignments: Record<string, string[]>): Promise<Position> => {
  const assignedIds = id in assignments ? assignments[id] : []
  const assigned: Actor[] = []
  for (const id of assignedIds) {
    const actor = await fromUuid(`Actor.${id}`) as Actor
    if (actor?.type === 'character') assigned.push(actor)
  }

  return {
    id,
    title: localize(`${MODULE_ID}.crew-positions.${id}.title`),
    desc: localize(`${MODULE_ID}.crew-positions.${id}.desc`),
    sans: localize(`${MODULE_ID}.crew-positions.${id}.sans`),
    assigned
  }
}

const getPositions = async (): Promise<Record<string, Position>> => {
  const positions = [
    'captain',
    'quartermaster',
    'pilot',
    'pilot-mate',
    'bosun',
    'bosun-mate',
    'gunner',
    'gunner-mate',
    'master',
    'master-mate',
    'carpenter',
    'carpenter-mate',
    'cook',
    'surgeon',
    'master-arms',
    'priest',
    'sorcerer'
  ]

  const assignments = getAssignments()
  const data: Record<string, Position> = {}
  for (const position of positions) {
    data[position] = await getPosition(position, assignments)
  }

  return data
}

export default getPositions
