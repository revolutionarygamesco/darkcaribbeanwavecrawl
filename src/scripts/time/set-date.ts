const setDate = async (str: string): Promise<void> => {
  const timestamp = Date.parse(str)
  const parsed = isNaN(timestamp) ? null : new Date(timestamp)
  if (!parsed) return

  const year = parsed.getUTCFullYear()
  const month = parsed.getUTCMonth()
  const day = parsed.getUTCDate()

  const before = new Date(game.time.worldTime)
  const hour = before.getUTCHours()
  const minute = before.getUTCMinutes()

  const date = new Date(year, month, day, hour, minute)
  await game.time.set(date.getTime())
}

export default setDate
