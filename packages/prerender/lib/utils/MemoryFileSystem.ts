const memoryFileSystem = require('memory-fs')

let myFs: MemoryFileSystem

export function initMemoryFileSystem() {
  myFs = new memoryFileSystem()
}

export { myFs }
