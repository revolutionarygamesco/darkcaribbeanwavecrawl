const toShuffledArray = <T>(array: T[]): T[] => {
  const arr = JSON.parse(JSON.stringify(array))
  let curr = arr.length
  let rnd: number

  while (curr !== 0) {
    rnd = Math.floor(Math.random() * curr)
    curr--

    [arr[curr], arr[rnd]] = [arr[rnd], arr[curr]]
  }

  return arr
}

export default toShuffledArray
