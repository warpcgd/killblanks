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
    async saveShellFile(msg) {
        let { html } = msg.data;
        html = index_2.htmlMinify(html, true);
        const originHtml = index_2.getMagicHtml(this.routesData.fileName, this.option);
        const jsonForHtml = index_2.htmlToJson(html);
        const jsonForOriginHtml = index_2.htmlToJson(originHtml);
        index_2.deepMergeSkeleton(jsonForOriginHtml, jsonForHtml);
        const { cleanedHtml, styles } = index_2.getHtmlAndStyleFromJson(jsonForOriginHtml);
        const shellHtml = index_2.renderShellHtml(styles, cleanedHtml);
        const newHtml = index_2.jsonToHtml(jsonForOriginHtml);
        const fileName = await index_2.writeMagicHtml(newHtml, this.option);
        this.routesData.skeletonPageUrl = `http://${this.option.host}:${this.option.port}/${fileName}`;
        this.routesData.fileName = fileName;
        this.routesData.html = index_2.htmlMinify(shellHtml, false);
        this.routesData.qrCode = await index_2.generateQR(this.routesData.skeletonPageUrl);
        this.sockWrite('preview', 'update', JSON.stringify(this.routesData));
    }
    async writeShellFile() {
        this.sockWrite('preview', 'console', 'before write shell files...');
        const { routesData } = this;
        let filePath = '';
        try {
            filePath = await index_2.writeShell(routesData.html, this.option);
        }
        catch (err) {
            index_1.default.warn(err);
        }
        const afterWriteMsg = `Write files success, file path ${filePath}`;
        index_1.default.info(afterWriteMsg);
        this.sockWrite('preview', 'console', afterWriteMsg);
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
