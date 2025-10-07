import { MODULE_ID } from '../settings.ts'
import adjustTime from './adjust.ts'
import getDate from './get.ts'
import getTime from './time.ts'
import ringBell from './ring.ts'

export default class Chronometer {
  private interval: number | null = null
  private isPaused: boolean = true

  async start () {
    this.interval = window.setInterval(async () => {
      if (!this.isPaused) await this.increment()
    }, 60 * 1000)
  }

  stop () {
    if (this.interval === null) return
    window.clearInterval(this.interval)
    this.interval = null
  }

  pause () {
    this.isPaused = true
  }

  resume () {
    this.isPaused = false
  }

  handlePause (paused: boolean) {
    if (paused) return this.pause()
    return this.resume()
  }

  private async increment () {
    await adjustTime(1)
    if (ringBell()) await this.ringBell()
  }

  private async ringBell () {
    const { text } = getTime(getDate())

    await foundry.audio.AudioHelper.play({
      autoplay: true,
      channel: 'environment',
      src: `modules/${MODULE_ID}/sfx/bell.mp3`
    })

    await foundry.documents.ChatMessage.create({
      speaker: { alias: game.i18n.localize(`${MODULE_ID}.ships-bell`) },
      content: text
    })
  }
}
