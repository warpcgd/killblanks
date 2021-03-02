"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RENDER = exports.NODESOCK = exports.SERVER = exports.PUPPETEER = exports.initMediator = void 0;
const tslib_1 = require("tslib");
const index_1 = tslib_1.__importDefault(require("../pup/index"));
const index_2 = tslib_1.__importDefault(require("../server/index"));
const sock_node_1 = tslib_1.__importDefault(require("../client/sock_node"));
const index_3 = tslib_1.__importDefault(require("../render/index"));
let PUPPETEER;
exports.PUPPETEER = PUPPETEER;
let SERVER;
exports.SERVER = SERVER;
let NODESOCK;
exports.NODESOCK = NODESOCK;
let RENDER;
exports.RENDER = RENDER;
async function initMediator(option) {
    exports.PUPPETEER = PUPPETEER = new index_1.default(option);
    await PUPPETEER.init();
    exports.SERVER = SERVER = new index_2.default(option);
    exports.NODESOCK = NODESOCK = new sock_node_1.default(option);
    NODESOCK.createServer(SERVER.listenServer);
    exports.RENDER = RENDER = new index_3.default(option);
}
exports.initMediator = initMediator;
