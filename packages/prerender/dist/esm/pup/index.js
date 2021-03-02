"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const puppeteer_1 = tslib_1.__importDefault(require("puppeteer"));
const log_1 = tslib_1.__importDefault(require("../log"));
class Puppeteer {
    constructor(option) {
        this.option = option;
    }
    async init() {
        const args = [];
        if (process.platform === 'linux') {
            args.push('--no-sandbox');
            args.push('--disable-setuid-sandbox');
        }
        this.browser = await puppeteer_1.default.launch({
            headless: true,
            args
        });
    }
    async newPage() {
        const page = await this.browser.newPage();
        const { cookies } = this.option;
        // Request拦截
        await this.interceptRequest(page);
        // 插入变量
        await this.injectProperty(page);
        const { device } = this.option;
        const { devices } = puppeteer_1.default;
        await page.emulate(devices[device]);
        if (this.option.debug) {
            // @ts-ignore
            page.on('console', (...args) => {
                log_1.default.info(...args);
            });
        }
        if ((cookies && cookies.length) || typeof cookies === 'function') {
            let _cookie = cookies;
            if (typeof cookies === 'function') {
                _cookie = await cookies();
                // log.info(_cookie)
            }
            // @ts-ignore
            await page.setCookie(..._cookie.filter(cookie => typeof cookie === 'object'));
        }
        return page;
    }
    async interceptRequest(page) {
        await page.setRequestInterception(true);
        page.on('request', req => {
            if (this.option.requestHandle) {
                return this.option.requestHandle(req, this.option);
            }
            return req.continue();
        });
    }
    async injectProperty(page) {
        if (this.option.injectProperty) {
            await page.evaluateOnNewDocument(`(function () { window['${this.option.injectProperty}'] = true; })();`);
        }
    }
    async closePage(page) {
        await page.close();
    }
    destroy() {
        if (this.browser) {
            this.browser.close();
            this.browser = null;
        }
    }
    waitForRender(options) {
        return new Promise((resolve, reject) => {
            try {
                // Render when an event fires on the document.
                if (options.renderAfterDocumentEvent) {
                    document.addEventListener(options.renderAfterDocumentEvent, () => resolve(true));
                    setTimeout(() => {
                        // @ts-ignore
                        if (window.sockWrite) {
                            window.sockWrite('console', `Waited for ${options.renderAfterTime /
                                1000} seconds, renderAfterDocumentEvent event was not found, automatically exited the page`);
                        }
                        return resolve(true);
                    }, options.renderAfterTime);
                    // Render after a certain number of milliseconds.
                }
                else if (options.renderAfterTime) {
                    setTimeout(() => resolve(true), options.renderAfterTime);
                    // Default: Render immediately after page content loads.
                }
                else {
                    resolve(true);
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.default = Puppeteer;
