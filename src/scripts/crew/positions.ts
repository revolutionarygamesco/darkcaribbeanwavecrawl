import { MODULE_ID } from '../settings.ts'
import localize from '../utilities/localize.ts'

export interface Position {
  id: string
  title: string
  desc: string
  sans: string
}

const getPosition = (id: string): Position => {
  return {
    id,
    title: localize(`${MODULE_ID}.crew-positions.${id}.title`),
    desc: localize(`${MODULE_ID}.crew-positions.${id}.desc`),
    sans: localize(`${MODULE_ID}.crew-positions.${id}.sans`)
  }
}

const getPositions = (): Record<string, Position> => {
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

  const data: Record<string, Position> = {}
  for (const position of positions) {
    data[position] = getPosition(position)
  }

  return data
}

export default getPositions
