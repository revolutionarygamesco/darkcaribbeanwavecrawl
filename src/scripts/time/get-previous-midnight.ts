const getPreviousMidnight = (date: Date): Date => {
  return new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    0,
    0,
    0,
    0
  ))
}

export default getPreviousMidnight
