const toShuffledArray = <T>(array: T[]): T[] => {
  const arr = [...array]
  let curr = arr.length
  let rnd: number

  while (curr !== 0) {
    rnd = Math.floor(Math.random() * curr)
    curr--

    const tmp = arr[curr]
    arr[curr] = arr[rnd]
    arr[rnd] = tmp
  }

  return arr
}

export default toShuffledArray
