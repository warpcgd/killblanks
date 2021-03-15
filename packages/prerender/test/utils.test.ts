import { initMemoryFileSystem } from '../lib/utils/MemoryFileSystem'
import {
  addScriptTag,
  writeMagicHtml,
  getMagicHtml,
  arrayToObj,
  sleep,
  generateQR
} from '../lib/utils/index'

describe('test util methods', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    initMemoryFileSystem()
  })
  test('addScriptTag should add script behind the </body>', () => {
    const source = '<body></body>'
    const script = 'test add script'
    const port = 'test add port 8888'
    const result = addScriptTag(source, script, port)
    const reg = new RegExp(`<body>|${script}|${port}|</body>`, 'gi')
    const matches = result.match(reg)
    expect(result).toMatch(new RegExp(script))
    expect(result).toMatch(new RegExp(port))
    expect(matches).not.toBeNull()
    if (Array.isArray(matches)) {
      expect(matches.length).toBe(4)
      expect(matches[0]).toEqual('<body>')
      expect(matches[3]).toEqual('</body>')
      expect(matches).toContain(script)
      expect(matches).toContain(port)
    }
  })

  test('writeMagicHtml and getMagicHtml work', async () => {
    const { defaultOptions } = require('../lib/config')
    const md5 = require('md5')
    const testHtml = '<div>test</div>'
    const fileName = await writeMagicHtml(testHtml, defaultOptions)
    expect(fileName).toBeDefined()
    expect(fileName).toEqual((await md5(testHtml)) + '_prerender.html')

    const result = await getMagicHtml(fileName, defaultOptions)
    expect(result).toBeDefined()
    expect(result).toEqual(testHtml)
  })

  test('arrayToObj work', () => {
    const testArray = ['a', 'b', 'c']
    const result = arrayToObj(testArray)
    expect(result).toBeDefined()
    expect(result).toEqual({
      a: 'a',
      b: 'b',
      c: 'c'
    })
  })

  test('sleep work', () => {
    sleep(1000)
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)
  })

  test('generateQR work', async () => {
    const testURL = 'https://github.com/warpcgd/killblanks'
    const result = await generateQR(testURL)
    expect(result).toBeDefined()
    expect(result).toEqual(expect.any(String))
  })
})
