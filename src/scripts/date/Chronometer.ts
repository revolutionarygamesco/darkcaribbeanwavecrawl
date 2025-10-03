import { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'

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
    await this.addMinutes(1)
  }

  async addMinutes (m: number) {
    const before = game.settings.get<number>(MODULE_ID, MODULE_SETTINGS.MINUTES)
    await game.settings.set<number>(MODULE_ID, MODULE_SETTINGS.MINUTES, before + m)
  }
}
