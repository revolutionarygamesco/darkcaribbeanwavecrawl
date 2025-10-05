import nouns from './nouns.ts'
import adjectives from './adjectives.ts'
import pickRandomElement from '../utilities/pick.ts'

const generateInsult = (): string => {
  const noun = pickRandomElement(nouns)
  const adjective = pickRandomElement(adjectives)
  return `${adjective} ${noun}`
}

export default generateInsult
