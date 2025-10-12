export default class Stopwatch {
  private interval: number | null = null
  private paused: boolean = true
  private intervalSeconds: number = 60

  async start () {
    this.interval = window.setInterval(async () => {
      if (!this.paused) await this.increment()
    }, this.intervalSeconds * 1000)
  }

  stop () {
    if (this.interval === null) return
    window.clearInterval(this.interval)
    this.interval = null
  }

  handlePause (paused: boolean) {
    this.paused = paused
  }

  private async increment () {
    await game.time.advance(this.intervalSeconds)
    const { worldTime } = game.time
    console.log(`Stopwatch just updated world time to ${worldTime} (${new Date(worldTime)})`)
  }
}
