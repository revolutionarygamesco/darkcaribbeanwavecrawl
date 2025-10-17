const watchEnds = [0, 4, 8, 12, 16, 18, 20]

const getBells = (hour: number, minute: number) => {
  if (minute === 0 && watchEnds.includes(hour)) return 8
  const lastWatch = watchEnds.filter(h => h <= hour).pop() ?? 0
  return ((hour - lastWatch) * 2) + (minute >= 30 ? 1 : 0)
}

export default getBells
