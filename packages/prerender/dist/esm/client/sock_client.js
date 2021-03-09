"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sockjs_client_1 = tslib_1.__importDefault(require("sockjs-client"));
const log_1 = require("./log");
const port = window._killblanksSocketPort_; // eslint-disable-line no-underscore-dangle
// TODO headless 打开的页面不连接 socket
const sock = new sockjs_client_1.default(`http://localhost:${port}/socket`);
function socketWrite(type, data) {
    sock.send(JSON.stringify({ type, data }));
}
sock.onopen = function () {
    log_1.log('Sock has connected');
    socketWrite('connect', 'dev');
};
// 用于调试
window.sock = sock;
window.log = log_1.log;
window.sockWrite = socketWrite;
// 用于输出
Object.defineProperty(window, 'PRERENDER_SKELETON', {
    get() {
        log_1.log('GENERATIND...');
        socketWrite('generate', window.location.href);
    }
});
sock.onmessage = function (e) {
    const { type, data } = JSON.parse(e.data);
    switch (type) {
        case 'success': {
            log_1.log(data);
            break;
        }
        case 'console': {
            log_1.log(data);
            break;
        }
        case 'error': {
            log_1.log(data, 'error');
            break;
        }
    }
    return;
};
sock.onclose = function () {
    log_1.log('Sock has closed');
    sock.close();
};
