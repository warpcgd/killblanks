"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const puppeteer_1 = tslib_1.__importDefault(require("puppeteer"));
const log_1 = tslib_1.__importDefault(require("../log"));
class Puppeteer {
    constructor(option) {
        this.browser = null;
        this.option = null;
        this.pages = [];
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
        log_1.default.info('puppeteer has inited');
    }
    async newPage() {
        var _a, _b, _c;
        try {
            const page = await ((_a = this.browser) === null || _a === void 0 ? void 0 : _a.newPage());
            const { cookies } = (_b = this === null || this === void 0 ? void 0 : this.option) !== null && _b !== void 0 ? _b : {};
            // Request拦截
            if (page) {
                await this.interceptRequest(page);
                // 插入变量
                await this.injectProperty(page);
            }
            const { device } = this.option;
            const { devices } = puppeteer_1.default;
            if (device && devices[device]) {
                await (page === null || page === void 0 ? void 0 : page.emulate(devices[device]));
            }
            if ((_c = this === null || this === void 0 ? void 0 : this.option) === null || _c === void 0 ? void 0 : _c.debug) {
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
        catch (error) {
            log_1.default.error(error);
            return null;
        }
    }
    async interceptRequest(page) {
        await page.setRequestInterception(true);
        page.on('request', req => {
            var _a;
            if ((_a = this === null || this === void 0 ? void 0 : this.option) === null || _a === void 0 ? void 0 : _a.requestHandle) {
                return this.option.requestHandle(req, this.option);
            }
            return req.continue();
        });
    }
    async injectProperty(page) {
        var _a;
        if ((_a = this === null || this === void 0 ? void 0 : this.option) === null || _a === void 0 ? void 0 : _a.injectProperty) {
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
                        var _a;
                        // @ts-ignore
                        if (window.sockWrite) {
                            window.sockWrite('console', `Waited for ${((_a = options === null || options === void 0 ? void 0 : options.renderAfterTime) !== null && _a !== void 0 ? _a : 3000) /
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
