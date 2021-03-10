import * as sockjs from 'sockjs'
import * as http from 'http'
import log from '../log/index'
import { arrayToObj } from '../utils/index'
import { SOCK_NODE_EVENTS } from '../config'
import { RENDER } from '../core/init'

const SOCK_NODE_EVENTS_OBJ = arrayToObj(SOCK_NODE_EVENTS)
let originUrl = ''
type SOCK_NODE_EVENTS_TYPE = keyof typeof SOCK_NODE_EVENTS_OBJ
interface Msg {
  type: SOCK_NODE_EVENTS_TYPE
  data: any
}

type SOCKETS_TYPE = keyof Sockets
class NodeSock {
  sockjsServer: sockjs.Server | null = null

  option: Options | null = null

  sockets: Sockets | null = null

  routesData:
    | {
        fileName: string
        originUrl: string
        skeletonPageUrl: string
        qrCode: string
        html: string
      }
    | undefined = undefined

  constructor(option: Options) {
    this.option = option
  }

  createServer(listenServer: http.Server): void {
    this.sockjsServer = sockjs.createServer({
      log(severity, line) {
        if (severity === 'error') {
          log.warn(line)
        }
      }
    })
    this.sockjsServer.installHandlers(listenServer, { prefix: '/socket' })
    log.info(`SockjsServer server has started`)
    this.sockjsServer.on('connection', conn => {
      conn.on('data', this.resiveSocketData(conn))
      conn.on('close', () => {
        // log.info('Sock has closed')
        // this.sockets = {}
      })
    })
  }

  resiveSocketData(conn: sockjs.Connection) {
    return (message: string): void => {
      const msg: Msg = JSON.parse(message)
      const { type } = msg
      if (SOCK_NODE_EVENTS.includes(type)) {
        // @ts-ignore
        this[type](msg, conn)
      } else {
        log.info(msg)
        log.error(`Sock node can't find ${type} method`)
      }
    }
  }

  async update() {
    this.routesData = await RENDER?.renderPreivewScreen(originUrl, this.sockets as Sockets, false)
    this.getUrl()
  }

  async generate(msg: Msg): Promise<void> {
    originUrl = msg.data
    this.routesData = await RENDER?.renderPreivewScreen(originUrl, this.sockets as Sockets)
  }

  connect(msg: Msg, conn: sockjs.Connection): void {
    const message = msg
    const { data } = message
    if (!this.sockets) {
      this.sockets = {}
    }
    // @ts-ignore
    if (!this.sockets[data]) {
      // @ts-ignore
      this.sockets[data] = []
    }
    // @ts-ignore
    // log.info(`${data} sock has connected`)
    this.sockets[data].push(conn)
  }

  console(msg: Msg): void {
    const { data } = msg
    log.info(data)
  }

  getUrl(): void {
    this.sockWrite('preview', 'update', JSON.stringify(this.routesData))
  }

  sockWrite(name: SOCKETS_TYPE, type: string, data: string): void {
    const sock = (this.sockets && this.sockets[name]) || []
    sock &&
      sock.length &&
      sock.forEach(conn => {
        conn.write(
          JSON.stringify({
            type,
            data
          })
        )
      })
  }

  destroy() {
    if (this.sockjsServer) {
      this.sockets = {}
      this.sockjsServer.removeAllListeners()
    }
  }
}

export default NodeSock
