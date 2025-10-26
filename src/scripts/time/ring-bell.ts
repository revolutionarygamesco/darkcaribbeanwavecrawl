import { MODULE_ID } from '../settings.ts'
import getWatch from './get-watch.ts'
import getBells from './get-bells.ts'
import describeNauticalTime from './nautical-time.ts'
import localize from '../utilities/localize.ts'

export const shouldBellRing = (minutes: number): boolean => {
  return minutes === 0 || minutes === 30
}

const ringBell = async (): Promise<void> => {
  const now = new Date(game.time.worldTime)
  const hour = now.getUTCHours()
  const minutes = now.getUTCMinutes()
  if (!shouldBellRing(minutes)) return

  const watch = getWatch(hour, minutes)
  const bells = getBells(hour, minutes)
  const content = describeNauticalTime(watch, bells)

  await foundry.audio.AudioHelper.play({
    autoplay: true,
    channel: 'environment',
    src: `modules/${MODULE_ID}/sfx/bell.mp3`
  })

  await foundry.documents.ChatMessage.create({
    speaker: { alias: localize(`${MODULE_ID}.ships-bell`) },
    content
  })
}

export default ringBell
