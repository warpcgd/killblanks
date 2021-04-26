"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_1 = tslib_1.__importDefault(require("http"));
const express_1 = tslib_1.__importDefault(require("express"));
const index_1 = tslib_1.__importDefault(require("../log/index"));
const path_1 = tslib_1.__importDefault(require("path"));
const index_2 = require("../utils/index");
const init_1 = require("../core/init");
const cwd = process.cwd();
class Server {
    constructor(option) {
        this.option = null;
        this.listenServer = null;
        this.app = null;
        this.option = option;
        this.init();
    }
    init() {
        this.createServer();
    }
    createServer() {
        var _a;
        const app = (this.app = express_1.default());
        this.listenServer = http_1.default.createServer(app);
        this.initRouters();
        this.listenServer.listen((_a = this === null || this === void 0 ? void 0 : this.option) === null || _a === void 0 ? void 0 : _a.port, () => {
            var _a;
            index_1.default.info(`prerender server listen at port:${(_a = this === null || this === void 0 ? void 0 : this.option) === null || _a === void 0 ? void 0 : _a.port}`);
        });
    }
    async initRouters() {
        const { app } = this;
        console.log(path_1.default.resolve(__dirname, '../', 'preview'));
        if (process.env.NODE_ENV !== 'production') {
            app === null || app === void 0 ? void 0 : app.use('/', express_1.default.static(path_1.default.resolve(__dirname, '../', 'preview')));
        }
        else {
            const { outputDir } = this.option;
            app === null || app === void 0 ? void 0 : app.use('/', express_1.default.static(path_1.default.resolve(cwd, outputDir)));
        }
        // app?.get('/preview.html', async (req, res) => {
        // })
        app === null || app === void 0 ? void 0 : app.get('/:filename', async (req, res) => {
            const { filename } = req.params;
            if (!/prerender\.html$/.test(filename))
                return;
            let html = 'Not Found';
            try {
                html = index_2.getMagicHtml(filename, this.option);
            }
            catch (err) {
                index_1.default.warn(`When you request the prerender html, ${err} ${filename}`);
            }
            res.send(html);
        });
    }
    destroy() {
        var _a;
        if (init_1.PUPPETEER && init_1.PUPPETEER.destroy) {
            init_1.PUPPETEER.destroy();
        }
        (_a = this === null || this === void 0 ? void 0 : this.listenServer) === null || _a === void 0 ? void 0 : _a.close(() => {
            index_1.default.info('server closed');
        });
    }
}
exports.default = Server;
