const mapPositions = (record: Record<string, string[]>): Map<string, string[]> => {
  const map = new Map<string, string[]>()
  for (const key in record) map.set(key, [...record[key]])
  return map
}

export default mapPositions
