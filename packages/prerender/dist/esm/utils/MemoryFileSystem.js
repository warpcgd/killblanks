"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myFs = exports.initMemoryFileSystem = void 0;
const tslib_1 = require("tslib");
const log_1 = tslib_1.__importDefault(require("../log"));
const memoryFileSystem = require('memory-fs');
let myFs;
exports.myFs = myFs;
function initMemoryFileSystem() {
    exports.myFs = myFs = new memoryFileSystem();
    log_1.default.info('memoryFileSystem has started');
}
exports.initMemoryFileSystem = initMemoryFileSystem;
