const mapCrewSilver = (record: Record<string, number>): Map<string, number> => {
  const map = new Map<string, number>()
  for (const key in record) map.set(key, record[key])
  return map
}

export default mapCrewSilver
