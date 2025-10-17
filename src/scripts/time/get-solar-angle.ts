import degreesToRadians from '../utilities/degrees-to-radians.ts'
import radiansToDegrees from '../utilities/radians-to-degrees.ts'

const getSolarAngle = (date: Date): number => {
  const latitude = 17.5
  const longitude = -75

  const newYear = new Date(Date.UTC(date.getUTCFullYear(), 0, 0))
  const diff = date.getTime() - newYear.getTime()
  const day = Math.floor(diff / (24 * 60 * 60 * 1000))

  const declination = 23.45 * Math.sin((360 / 365) * (day - 81) * Math.PI / 180)
  const hours = date.getUTCHours() + (date.getUTCMinutes() / 60)
  const noon = 12 - (longitude / 15)
  const angle = (hours - noon) * 15

  const l = degreesToRadians(latitude)
  const d = degreesToRadians(declination)
  const a = degreesToRadians(angle)

  const altitude = Math.asin(
    Math.sin(l) * Math.sin(d) +
    Math.cos(l) * Math.cos(d) * Math.cos(a)
  )

  return radiansToDegrees(altitude)
}

export default getSolarAngle
