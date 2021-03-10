import tiza from 'tiza'
import { log } from '../log'

describe('test log function', () => {
  beforeEach(function() {
    // eslint-disable-next-line jest/no-jasmine-globals
    spyOn(console, 'log').and.callThrough()
  })
  test('log can output success console', () => {
    const result = log('success', 'success')
    expect(result).toEqual(expect.any(tiza.constructor))
    expect(console['log']).toHaveBeenCalledTimes(1)
    expect(console['log']).toHaveBeenCalledWith(
      '%c[PRERENDER] success',
      'color:#006633;font-size:12px'
    )
  })

  test('log can output error console', () => {
    const result = log('error', 'error')
    expect(result).toEqual(expect.any(tiza.constructor))
    expect(console['log']).toHaveBeenCalledTimes(1)
    expect(console['log']).toHaveBeenCalledWith('%c[PRERENDER] error', 'color:red;font-size:12px')
  })
})
