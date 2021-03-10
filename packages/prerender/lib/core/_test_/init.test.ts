import { defaultOptions, getFreePort, getLocalIpAddress } from '../../config'
import { initMediator, destroyMediator, PUPPETEER, SERVER, NODESOCK, RENDER } from '../init'
import Puppeteer from '../../pup/index'
import Server from '../../server/index'
import NodeSock from '../../client/sock_node'
import Render from '../../render/index'
import merge from 'lodash/merge'
import { initMemoryFileSystem } from '../../utils/MemoryFileSystem'

beforeAll(async () => {
  const host = await getLocalIpAddress()
  const port = await getFreePort()
  const mergeOption = merge({ host, port }, defaultOptions)
  initMemoryFileSystem()
  return initMediator(mergeOption)
})

afterAll(() => {
  return destroyMediator()
})

describe('test Mediator has init', () => {
  test('puppeteer class has Instanced', () => {
    expect(PUPPETEER).toEqual(expect.any(Puppeteer))
  })
  test('server class has Instanced', () => {
    expect(SERVER).toEqual(expect.any(Server))
  })
  test('nodesock class has Instanced', () => {
    expect(NODESOCK).toEqual(expect.any(NodeSock))
  })
  test('render class has Instanced', () => {
    expect(RENDER).toEqual(expect.any(Render))
  })
})
