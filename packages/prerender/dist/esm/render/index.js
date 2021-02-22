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
        this.option = option;
        this.previewPageUrl = `http://${this.option.host}:${this.option.port}/preview.html`;
    }
    async renderPreivewScreen(origin, sockets, open = true) {
        try {
            const page = await init_1.PUPPETEER.newPage();
            const url = origin;
            await page.goto(url, { waitUntil: 'networkidle0' });
            await this.waitForRender(page);
            // await this.makeScreen(page)
            const { rawHtml, styles, cleanedHtml } = await this.getCleanHtmlAndStyle(page);
            const _rawHtml = index_1.htmlMinify(rawHtml, true).replace('<!DOCTYPE html>', '');
            const fileName = await index_1.writeMagicHtml(_rawHtml, this.option);
            const skeletonPageUrl = `http://${this.option.host}:${this.option.port}/${fileName}`;
            if (open) {
                this.openNewWindow(sockets);
            }
            const shellHtml = index_1.renderShellHtml(styles, cleanedHtml);
            init_1.PUPPETEER.closePage(page);
            return {
                fileName,
                originUrl: url,
                skeletonPageUrl,
                qrCode: await index_1.generateQR(skeletonPageUrl),
                html: index_1.htmlMinify(shellHtml, false)
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
    async makeScreen(page) {
        const js = fs.readFileSync(path.resolve(cwd, './node_modules/@killblank/skeleton/dist/index.js'), 'utf8');
        // return page
        const { mod } = this.option;
        await page.evaluate(async (option, js) => {
            eval(js);
            // @ts-ignore
            await Skeleton.genSkeleton(option);
        }, 
        // @ts-ignore
        mod, js.toString());
    }
    async getCleanHtmlAndStyle(page, clean = 'true') {
        function inject(state) {
            if (state === 'true') {
                // 删除注入的
                const puppeteer = document.querySelectorAll('[id=_puppeteer_]');
                puppeteer.forEach(e => e.parentNode.removeChild(e));
            }
            // body 增加 prerender标志
            document.querySelector('body').setAttribute('prerender', 'true');
            const root = document.documentElement;
            const rawHtml = root.outerHTML;
            const styles = document.querySelector('style[title="_skeleton_"]') &&
                document.querySelector('style[title="_skeleton_"]').outerHTML;
            const _skeleton_html = document.querySelectorAll('[_skeleton_]');
            const cleanedHtml = _skeleton_html.length
                ? Array.from(document.querySelectorAll('[_skeleton_]'))
                    .map(i => i.outerHTML.replace(/&quot;/g, "'"))
                    .join('')
                : '';
            return {
                rawHtml,
                styles,
                cleanedHtml
            };
        }
        // await page.addScriptTag({ content: genHtmlStyle.toString(), type: '_puppeteer_' })
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
            await Promise.all(langs.map((lang) => this.renderScreen(lang)));
            return true;
        }
        await this.renderScreen();
        return true;
    }
    async renderScreen(lang) {
        try {
            // const shellHtml = await getShellHtml(this.option)
            const { outputDir, entryPath, outPutPath, host, port } = this.option;
            const page = await init_1.PUPPETEER.newPage();
            const langPath = lang && lang.length ? `?lang=${lang}` : '';
            const url = `http://${host}:${port}/${entryPath}.html${langPath}`;
            await page.goto(url, { waitUntil: 'networkidle0' });
            await this.waitForRender(page);
            const { rawHtml } = await this.getCleanHtmlAndStyle(page, 'true');
            const newHtml = index_1.htmlMinify(rawHtml, true);
            const outputPath = lang && lang.length ? `${outPutPath}.${lang}.html` : `${outPutPath}.html`;
            fs.writeFileSync(path.resolve(cwd, outputDir, outputPath), newHtml, 'utf8');
            log_1.default.info(`output ${outputPath} success`);
            await init_1.PUPPETEER.closePage(page);
        }
        catch (error) {
            log_1.default.error(error);
        }
    }
}
exports.default = Render;
