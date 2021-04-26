"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalIpAddress = exports.getFreePort = exports.SOCK_NODE_EVENTS = exports.minifyOptions = exports.defaultOptions = exports.htmlBeautifyConfig = void 0;
const tslib_1 = require("tslib");
const os_1 = tslib_1.__importDefault(require("os"));
const get_port_1 = tslib_1.__importDefault(require("get-port"));
const getFreePort = async function () {
    return await get_port_1.default();
};
exports.getFreePort = getFreePort;
const getLocalIpAddress = async () => {
    const interfaces = (os_1.default === null || os_1.default === void 0 ? void 0 : os_1.default.networkInterfaces()) || null;
    if (interfaces) {
        for (const devName in interfaces) {
            // eslint-disable-line guard-for-in
            const iface = (interfaces === null || interfaces === void 0 ? void 0 : interfaces[devName]) || null;
            if (iface) {
                for (const alias of iface) {
                    if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                        return alias.address;
                    }
                }
            }
        }
    }
    else {
        throw 'Error obtaining free address';
    }
};
exports.getLocalIpAddress = getLocalIpAddress;
const defaultOptions = {
    device: 'iPhone X',
    injectProperty: '__PRERENDER_INJECTED__',
    renderAfterDocumentEvent: 'prerender-skeleton',
    renderAfterTime: 3000,
    debug: false,
    requestHandle: null,
    outputDir: 'dist',
    entryPath: 'index',
    outPutPath: 'index',
    langs: [],
    magicPath: '__webpack_prerender_skeleton__'
};
exports.defaultOptions = defaultOptions;
const htmlBeautifyConfig = {
    indent_size: 2,
    html: {
        end_with_newline: true,
        js: {
            indent_size: 2
        },
        css: {
            indent_size: 2
        }
    },
    css: {
        indent_size: 1
    },
    js: {
        'preserve-newlines': true
    }
};
exports.htmlBeautifyConfig = htmlBeautifyConfig;
const SOCK_NODE_EVENTS = ['generate', 'connect', 'getUrl', 'console', 'saveShellFile', 'writeShellFile', 'update'];
exports.SOCK_NODE_EVENTS = SOCK_NODE_EVENTS;
const minifyOptions = {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeComments: false,
    removeAttributeQuotes: true,
    removeEmptyAttributes: false
};
exports.minifyOptions = minifyOptions;
