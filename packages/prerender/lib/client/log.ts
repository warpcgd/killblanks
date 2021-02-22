import tiza from 'tiza'

export const log = (msg: string, type = 'success'): void => {
  const color = type === 'success' ? '#006633' : 'red'
  tiza
    .color(color)
    // .italic()
    .size(14)
    .text(`[PRERENDER] ${msg}`)
    .log()
}
