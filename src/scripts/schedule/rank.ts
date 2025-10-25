const rank = (hours: number = 0): string => {
  if (hours < 1000) return 'novice'
  if (hours < 6000) return 'able'
  if (hours < 10000) return 'seasoned'
  return 'veteran'
}

export default rank
