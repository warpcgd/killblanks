import log from '../log'

const memoryFileSystem = require('memory-fs')

let myFs: MemoryFileSystem

export function initMemoryFileSystem() {
  myFs = new memoryFileSystem()
  log.info('memoryFileSystem has started')
}

export { myFs }
