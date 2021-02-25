"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myFs = exports.initMemoryFileSystem = void 0;
const memoryFileSystem = require('memory-fs');
let myFs;
exports.myFs = myFs;
function initMemoryFileSystem() {
    exports.myFs = myFs = new memoryFileSystem();
}
exports.initMemoryFileSystem = initMemoryFileSystem;
