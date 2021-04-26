"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const init_1 = require("../core/init");
const index_1 = require("../utils/index");
const log_1 = tslib_1.__importDefault(require("../log"));
const open = require('open');
const path = require('path');
const fs = require('fs');
const cwd = process.cwd();
class Render {
    constructor(option) {
        this.option = null;
        this.previewPageUrl = '';
        this.option = option;
        this.previewPageUrl = `http://${this.option.host}:${this.option.port}/index.html`;
    }
    async renderPreivewScreen(origin, sockets, open = true) {
        var _a, _b;
        try {
            const page = await init_1.PUPPETEER.newPage();
            const url = origin;
            await (page === null || page === void 0 ? void 0 : page.goto(url, { waitUntil: 'networkidle0' }));
            if (page) {
                await this.waitForRender(page);
            }
            const { rawHtml } = await this.getCleanHtmlAndStyle(page);
            const _rawHtml = index_1.htmlMinify(rawHtml).replace('<!DOCTYPE html>', '');
            const fileName = await index_1.writeMagicHtml(_rawHtml, this.option);
            const skeletonPageUrl = `http://${(_a = this === null || this === void 0 ? void 0 : this.option) === null || _a === void 0 ? void 0 : _a.host}:${(_b = this === null || this === void 0 ? void 0 : this.option) === null || _b === void 0 ? void 0 : _b.port}/${fileName}`;
            if (open) {
                this.openNewWindow(sockets);
            }
            init_1.PUPPETEER.closePage(page);
            return {
                fileName,
                originUrl: url,
                skeletonPageUrl,
                qrCode: await index_1.generateQR(skeletonPageUrl),
                html: ''
            };
        }
        catch (error) {
            log_1.default.error(error);
            process.exit();
        }
    }
    async waitForRender(page) {
        // @ts-ignore
        await page.evaluate(init_1.PUPPETEER.waitForRender, this.option);
    }
    async getCleanHtmlAndStyle(page, clean = 'true') {
        function inject(state) {
            var _a;
            if (state === 'true') {
                // 删除注入的
                const puppeteer = document.querySelectorAll('[id=_puppeteer_]');
                puppeteer.forEach(e => { var _a; return (_a = e === null || e === void 0 ? void 0 : e.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(e); });
            }
            // body 增加 prerender标志
            (_a = document === null || document === void 0 ? void 0 : document.querySelector('body')) === null || _a === void 0 ? void 0 : _a.setAttribute('prerender', 'true');
            const root = document.documentElement;
            const rawHtml = root.outerHTML;
            return {
                rawHtml
            };
        }
        return await page.evaluate((js, clean) => {
            eval(js);
            return inject(clean);
        }, inject.toString(), clean);
    }
    openNewWindow(sockets) {
        let appName = 'google chrome';
        if (process.platform === 'win32') {
            appName = 'chrome';
        }
        else if (process.platform === 'linux') {
            appName = 'google-chrome';
        }
        if (!sockets || !sockets.preview) {
            open(this.previewPageUrl, { app: [appName, '--incognito'] });
        }
    }
    async outputScreen() {
        const { langs } = this.option;
        const hasLang = langs && langs.length;
        if (hasLang) {
            log_1.default.info(`find langs:${langs}`);
            if (langs) {
                await Promise.all(langs.map((lang) => this.renderScreen(lang)));
                return;
            }
        }
        await this.renderScreen();
    }
    async renderScreen(lang) {
        try {
            const { outputDir, entryPath, outPutPath, host, port } = this.option;
            // 开启一个新页面
            const page = await init_1.PUPPETEER.newPage();
            await (page === null || page === void 0 ? void 0 : page.setDefaultNavigationTimeout(0));
            const langPath = lang && lang.length ? `?lang=${lang}` : '';
            const url = `http://${host}:${port}/${entryPath}.html${langPath}`;
            log_1.default.info(`page goto ${url}`);
            // 请求目标页面
            await (page === null || page === void 0 ? void 0 : page.goto(url, { waitUntil: 'domcontentloaded' }));
            await this.waitForRender(page);
            // 得到目标源码并处理
            const { rawHtml } = await this.getCleanHtmlAndStyle(page, 'true');
            // 压缩源码
            const newHtml = index_1.htmlMinify(rawHtml);
            const outputPath = lang && lang.length ? `${outPutPath}.${lang}.html` : `${outPutPath}.html`;
            // 输出到目标文件夹
            fs.writeFileSync(path.resolve(cwd, outputDir, outputPath), newHtml, 'utf8');
            log_1.default.info(`output ${outputPath} success`);
            await init_1.PUPPETEER.closePage(page);
            return true;
        }
        catch (error) {
            log_1.default.error(error);
            return false;
        }
    }
}
exports.default = Render;
