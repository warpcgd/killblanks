import * as sockjs from 'sockjs'
import * as http from 'http'
import log from '../log/index'
import {
  arrayToObj,
  getMagicHtml,
  htmlToJson,
  deepMergeSkeleton,
  htmlMinify,
  jsonToHtml,
  writeMagicHtml,
  getHtmlAndStyleFromJson,
  renderShellHtml,
  generateQR,
  writeShell
} from '../utils/index'
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
  sockjsServer: sockjs.Server

  option: Options

  sockets: Sockets

  routesData: {
    fileName: string
    originUrl: string
    skeletonPageUrl: string
    qrCode: string
    html: string
  }

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
    this.routesData = await RENDER.renderPreivewScreen(originUrl, this.sockets, false)
    this.getUrl()
  }

  async generate(msg: Msg): Promise<void> {
    originUrl = msg.data
    this.routesData = await RENDER.renderPreivewScreen(originUrl, this.sockets)
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

  async saveShellFile(msg: Msg): Promise<void> {
    let { html } = msg.data
    html = htmlMinify(html, true)
    const originHtml = getMagicHtml(this.routesData.fileName, this.option)
    const jsonForHtml = htmlToJson(html)
    const jsonForOriginHtml = htmlToJson(originHtml)
    deepMergeSkeleton(jsonForOriginHtml, jsonForHtml)
    const { cleanedHtml, styles } = getHtmlAndStyleFromJson(jsonForOriginHtml)
    const shellHtml = renderShellHtml(styles, cleanedHtml)
    const newHtml = jsonToHtml(jsonForOriginHtml)
    const fileName = await writeMagicHtml(newHtml, this.option)
    this.routesData.skeletonPageUrl = `http://${this.option.host}:${this.option.port}/${fileName}`
    this.routesData.fileName = fileName
    this.routesData.html = htmlMinify(shellHtml, false)
    this.routesData.qrCode = await generateQR(this.routesData.skeletonPageUrl)
    this.sockWrite('preview', 'update', JSON.stringify(this.routesData))
  }

  async writeShellFile(): Promise<void> {
    this.sockWrite('preview', 'console', 'before write shell files...')
    const { routesData } = this
    let filePath = ''
    try {
      filePath = await writeShell(routesData.html, this.option)
    } catch (err) {
      log.warn(err)
    }
    const afterWriteMsg = `Write files success, file path ${filePath}`
    log.info(afterWriteMsg)
    this.sockWrite('preview', 'console', afterWriteMsg)
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
}

export default NodeSock
