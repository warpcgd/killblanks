import Puppeteer from '../pup/index'
import Server from '../server/index'
import NodeSock from '../client/sock_node'
import Render from '../render/index'

let PUPPETEER: Puppeteer

let SERVER: Server
let NODESOCK: NodeSock
let RENDER: Render | null
export async function initMediator(option: Options) {
  PUPPETEER = new Puppeteer(option)
  await PUPPETEER.init()
  SERVER = new Server(option)
  NODESOCK = new NodeSock(option)
  if (SERVER.listenServer) {
    NODESOCK.createServer(SERVER.listenServer)
  }
  RENDER = new Render(option)
}

export function destroyMediator() {
  PUPPETEER.destroy()
  SERVER.destroy()
  NODESOCK.destroy()
  RENDER = null
}

export { PUPPETEER, SERVER, NODESOCK, RENDER }
