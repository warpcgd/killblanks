"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_1 = tslib_1.__importDefault(require("http"));
const express_1 = tslib_1.__importDefault(require("express"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const index_1 = tslib_1.__importDefault(require("../log/index"));
const path_1 = tslib_1.__importDefault(require("path"));
const index_2 = require("../utils/index");
const init_1 = require("../core/init");
const cwd = process.cwd();
class Server {
    constructor(option) {
        this.option = option;
        this.init();
    }
    init() {
        this.createServer();
    }
    createServer() {
        const app = (this.app = express_1.default());
        this.listenServer = http_1.default.createServer(app);
        this.initRouters();
        this.listenServer.listen(this.option.port, () => {
            index_1.default.info(`prerender server listen at port:${this.option.port}`);
        });
    }
    async initRouters() {
        const { app } = this;
        if (process.env.NODE_ENV !== 'production') {
            app.use('/', express_1.default.static(path_1.default.resolve(__dirname, '../', 'preview')));
        }
        else {
            const { outputDir } = this.option;
            app.use('/', express_1.default.static(path_1.default.resolve(cwd, outputDir)));
        }
        app.get('/preview.html', async (res) => {
            // @ts-ignore
            fs_1.default.createReadStream(path_1.default.resolve(__dirname, '../', 'preview/index.html')).pipe(res);
        });
        app.get('/:filename', async (req, res) => {
            const { filename } = req.params;
            if (!/\.html$/.test(filename))
                return;
            let html = 'Not Found';
            try {
                html = index_2.getMagicHtml(filename, this.option);
            }
            catch (err) {
                index_1.default.warn(`When you request the preview html, ${err} ${filename}`);
            }
            res.send(html);
        });
    }
    destroy() {
        if (init_1.PUPPETEER && init_1.PUPPETEER.destroy) {
            init_1.PUPPETEER.destroy();
        }
        this.listenServer.close(() => {
            index_1.default.info('server closed');
        });
    }
}
exports.default = Server;
