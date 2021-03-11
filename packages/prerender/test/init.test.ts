import { defaultOptions, getFreePort, getLocalIpAddress } from '../lib/config'
import {
  initMediator,
  destroyMediator,
  PUPPETEER,
  SERVER,
  NODESOCK,
  RENDER
} from '../lib/core/init'
import Puppeteer from '../lib/pup/index'
import Server from '../lib/server/index'
import NodeSock from '../lib/sock/sock_node'
import Render from '../lib/render/index'
import merge from 'lodash/merge'
import { initMemoryFileSystem } from '../lib/utils/MemoryFileSystem'

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
