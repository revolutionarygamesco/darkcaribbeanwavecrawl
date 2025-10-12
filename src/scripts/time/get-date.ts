const getDate = (timestamp: number = game.time.worldTime): Date => new Date(timestamp * 1000)

export default getDate
