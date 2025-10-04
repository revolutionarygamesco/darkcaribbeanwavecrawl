import adjustDate from '../utilities/adjust-date.ts'

export const dinnerTime = {
  hour: 18,
  minutes: 0
}

const countDinnersBack = (start: Date, end: Date): number => {
  if (start.getTime() < end.getTime()) return countDinners(start, end)

  const last = new Date(start)
  last.setHours(dinnerTime.hour, dinnerTime.minutes, 0, 0)
  if (start.getTime() < last.getTime()) adjustDate(last, -1)

  let count = 0
  const curr = new Date(last)

  while (curr.getTime() >= end.getTime()) {
    count--
    adjustDate(curr, -1)
  }

  return count
}

const countDinners = (start: Date, end: Date): number => {
  if (start.getTime() > end.getTime()) return countDinnersBack(start, end)

  const first = new Date(start)
  first.setHours(dinnerTime.hour, dinnerTime.minutes, 0, 0)
  if (start.getTime() >= first.getTime()) adjustDate(first, 1)

  let count = 0
  const curr = new Date(first)

  while (curr.getTime() <= end.getTime()) {
    count++
    adjustDate(curr, 1)
  }

  return count
}

export default countDinners
