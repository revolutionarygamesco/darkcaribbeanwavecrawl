const advanceTime = async (minutes: number): Promise<void> => {
  await game.time.advance(minutes * 60)
}

export default advanceTime
