const adjustDate = (date: Date, days: number): void => {
  date.setDate(date.getDate() + days)
}

export default adjustDate