"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sockjs = tslib_1.__importStar(require("sockjs"));
const index_1 = tslib_1.__importDefault(require("../log/index"));
const index_2 = require("../utils/index");
const config_1 = require("../config");
const init_1 = require("../core/init");
const SOCK_NODE_EVENTS_OBJ = index_2.arrayToObj(config_1.SOCK_NODE_EVENTS);
let originUrl = '';
class NodeSock {
    constructor(option) {
        this.option = option;
    }
    createServer(listenServer) {
        this.sockjsServer = sockjs.createServer({
            log(severity, line) {
                if (severity === 'error') {
                    index_1.default.warn(line);
                }
            }
        });
        this.sockjsServer.installHandlers(listenServer, { prefix: '/socket' });
        index_1.default.info(`SockjsServer server has started`);
        this.sockjsServer.on('connection', conn => {
            conn.on('data', this.resiveSocketData(conn));
            conn.on('close', () => {
                // log.info('Sock has closed')
                // this.sockets = {}
            });
        });
    }
    resiveSocketData(conn) {
        return (message) => {
            const msg = JSON.parse(message);
            const { type } = msg;
            if (config_1.SOCK_NODE_EVENTS.includes(type)) {
                // @ts-ignore
                this[type](msg, conn);
            }
            else {
                index_1.default.info(msg);
                index_1.default.error(`Sock node can't find ${type} method`);
            }
        };
    }
    async update() {
        this.routesData = await init_1.RENDER.renderPreivewScreen(originUrl, this.sockets, false);
        this.getUrl();
    }
    async generate(msg) {
        originUrl = msg.data;
        this.routesData = await init_1.RENDER.renderPreivewScreen(originUrl, this.sockets);
    }
    connect(msg, conn) {
        const message = msg;
        const { data } = message;
        if (!this.sockets) {
            this.sockets = {};
        }
        // @ts-ignore
        if (!this.sockets[data]) {
            // @ts-ignore
            this.sockets[data] = [];
        }
        // @ts-ignore
        // log.info(`${data} sock has connected`)
        this.sockets[data].push(conn);
    }
    console(msg) {
        const { data } = msg;
        index_1.default.info(data);
    }
    getUrl() {
        this.sockWrite('preview', 'update', JSON.stringify(this.routesData));
    }
    sockWrite(name, type, data) {
        const sock = (this.sockets && this.sockets[name]) || [];
        sock &&
            sock.length &&
            sock.forEach(conn => {
                conn.write(JSON.stringify({
                    type,
                    data
                }));
            });
    }
}
exports.default = NodeSock;
