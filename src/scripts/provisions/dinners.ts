export const dinnerTime = {
  hour: 18,
  minutes: 0
}

const advanceDate24h = (date: Date): void => {
  date.setDate(date.getDate() + 1)
}

const setDateBack24h = (date: Date): void => {
  date.setDate(date.getDate() - 1)
}

const countDinnersBack = (start: Date, end: Date): number => {
  if (start.getTime() < end.getTime()) return countDinners(start, end)

  const last = new Date(start)
  last.setHours(dinnerTime.hour, dinnerTime.minutes, 0, 0)
  if (start.getTime() < last.getTime()) setDateBack24h(last)

  let count = 0
  const curr = new Date(last)

  while (curr.getTime() >= end.getTime()) {
    count--
    setDateBack24h(curr)
  }

  return count
}

const countDinners = (start: Date, end: Date): number => {
  if (start.getTime() > end.getTime()) return countDinnersBack(start, end)

  const first = new Date(start)
  first.setHours(dinnerTime.hour, dinnerTime.minutes, 0, 0)
  if (start.getTime() >= first.getTime()) advanceDate24h(first)

  let count = 0
  const curr = new Date(first)

  while (curr.getTime() <= end.getTime()) {
    count++
    advanceDate24h(curr)
  }

  return count
}

export default countDinners
