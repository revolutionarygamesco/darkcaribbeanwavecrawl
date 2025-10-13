export interface PanelDimensions {
  width: number
  height: number
  top: number
  left: number
}

const getPanelDimensions = (
  width: number,
  height: number
): PanelDimensions => {
  const ww = window.innerWidth
  const wh = window.innerHeight
  const w = Math.floor(ww * width)
  const h = Math.floor(wh * height)
  const left = Math.ceil((ww - w) / 2)
  const top = Math.ceil((wh - h) / 2)
  return { width: w, height: h, left, top }
}

export default getPanelDimensions
