export const dogWatches = ['first dog', 'second dog'] as const
export const allWatches = ['first', 'middle', 'morning', 'forenoon', 'afternoon', ...dogWatches] as const

type Watch = typeof allWatches[number]

export const isWatch = (candidate: unknown): candidate is Watch => {
  if (typeof candidate !== 'string') return false
  return allWatches.includes(candidate as typeof allWatches[number])
}

export const getWatches = (): string[] => {
  return allWatches.map(watch => watch.toString())
}

export const isDogWatch = (watch: Watch): boolean => {
  return dogWatches.includes(watch as typeof dogWatches[number])
}

export default Watch
