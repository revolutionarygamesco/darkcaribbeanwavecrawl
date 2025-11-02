import ids from '../ids.ts'

interface RollTableResult {
  name: string
  description: string
}

const rollTable = async (
  id: keyof typeof ids.tables,
  options?: any
): Promise<RollTableResult | null> => {
  if (!game?.tables) return null
  const table = game.tables.get(ids.tables[id])
  if (!table) return null

  const drawn = await table.draw(options)
  if (!drawn || !drawn.results || !Array.isArray(drawn.results) || drawn.results < 1) return null
  const name = drawn.results[0].name
  const description = drawn.results[0].description
  if (name === undefined || description === undefined) return null
  return { name, description }
}

export default rollTable
