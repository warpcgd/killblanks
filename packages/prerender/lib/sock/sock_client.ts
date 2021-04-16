import SockJS from 'sockjs-client'
import { log } from './log'

const port: number | string = window._killblanksSocketPort_ // eslint-disable-line no-underscore-dangle

// TODO headless 打开的页面不连接 socket
const sock: WebSocket = new SockJS(`http://localhost:${port}/socket`)

function socketWrite(type: string, data: string): void {
  sock.send(JSON.stringify({ type, data }))
}

sock.onopen = function(): void {
  log('Sock has connected')
  socketWrite('connect', 'dev')
}
// 用于调试
window.sock = sock
window.log = log
window.sockWrite = socketWrite
// 用于输出
Object.defineProperty(window, 'PRERENDER_PREVIEW', {
  get() {
    log('GENERATIND...')
    socketWrite('generate', window.location.href)
  }
})

sock.onmessage = function(e): void {
  const { type, data } = JSON.parse(e.data)
  switch (type) {
    case 'success': {
      log(data)
      break
    }
    case 'console': {
      log(data)
      break
    }
    case 'error': {
      log(data, 'error')
      break
    }
  }
  return
}

sock.onclose = function(): void {
  log('Sock has closed')
  sock.close()
}
