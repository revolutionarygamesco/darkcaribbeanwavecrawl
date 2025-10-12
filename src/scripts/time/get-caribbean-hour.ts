const getCaribbeanHour = (date: Date): number =>{
  return (date.getUTCHours() - 5 + 24) % 24
}

export default getCaribbeanHour
