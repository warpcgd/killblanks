import tiza from 'tiza'

export const log = (msg: string, type = 'success') => {
  const color = type === 'success' ? '#006633' : 'red'
  return (
    tiza
      .color(color)
      // .italic()
      .size(12)
      .text(`[PRERENDER] ${msg}`)
      .log()
  )
}
