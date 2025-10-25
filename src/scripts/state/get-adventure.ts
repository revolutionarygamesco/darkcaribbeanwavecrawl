import ids from '../ids.ts'

const getAdventure = async (): Promise<Adventure | null> => {
  if (typeof fromUuid === 'undefined') return null
  const uuid = ids.adventure
  return await fromUuid(uuid) as Adventure | null
}

export default getAdventure
