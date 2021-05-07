"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("../utils");
const index_1 = tslib_1.__importDefault(require("../log/index"));
const init_1 = require("./init");
const config_1 = require("../config");
const MemoryFileSystem_1 = require("../utils/MemoryFileSystem");
const merge_1 = tslib_1.__importDefault(require("lodash/merge"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
/**
 * @internal
 */
const PLUGIN_NAME = 'prerenderPlugin';
/**
 * @internal
 */
const EVENT_LIST = process.env.NODE_ENV === 'production'
    ? ['watchClose', 'failed', 'done']
    : ['watchClose', 'failed'];
class PrerenderPlugin {
    /**
     * @internal
     */
    constructor(option = {}) {
        /**
         * @internal
         */
        this.option = undefined;
        this.hasInit = false;
        this.option = option;
    }
    /**
     * @internal
     */
    apply(compiler) {
        compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
            var _a, _b;
            const htmlWebpackPlugin = ((_b = (_a = compiler === null || compiler === void 0 ? void 0 : compiler.options) === null || _a === void 0 ? void 0 : _a.plugins) !== null && _b !== void 0 ? _b : [])
                .map(({ constructor }) => constructor)
                .find(({ name }) => name === 'HtmlWebpackPlugin');
            if (htmlWebpackPlugin) {
                if (compiler.hooks) {
                    const htmlWebpackPluginBeforeHtmlProcessing = 
                    // @ts-ignore
                    compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing ||
                        // @ts-ignore
                        htmlWebpackPlugin.getHooks(compilation).beforeEmit;
                    htmlWebpackPluginBeforeHtmlProcessing.tapAsync(PLUGIN_NAME, async (htmlPluginData, callback) => {
                        await this.init(this.option);
                        if (process.env.NODE_ENV !== 'production') {
                            htmlPluginData = this.injectJs(htmlPluginData);
                        }
                        callback(null, htmlPluginData);
                    });
                }
            }
        });
        compiler.hooks.afterEmit.tapAsync(PLUGIN_NAME, async (_compilation, callback) => {
            if (process.env.NODE_ENV === 'production') {
                await this.outputSkeletonScreen();
            }
            callback();
            this.hasInit = false;
        });
        EVENT_LIST.forEach(event => {
            // @ts-ignore
            compiler.hooks[event].tap(PLUGIN_NAME, () => {
                if (init_1.SERVER) {
                    init_1.SERVER.destroy();
                    this.hasInit = false;
                }
            });
        });
    }
    /**
     * @internal
     */
    async init(option = {}) {
        try {
            if (this.hasInit) {
                return;
            }
            const host = await config_1.getLocalIpAddress();
            const port = await config_1.getFreePort();
            const mergeOption = merge_1.default({ host, port }, config_1.defaultOptions, option);
            this.option = mergeOption;
            await init_1.initMediator(this.option);
            MemoryFileSystem_1.initMemoryFileSystem();
            this.hasInit = true;
        }
        catch (error) {
            index_1.default.error(error);
            this.hasInit = false;
        }
    }
    /**
     * @internal
     */
    injectJs(htmlPluginData) {
        var _a, _b;
        const script = fs_1.default.readFileSync(path_1.default.join(__dirname, '../sock/sock_client.bundle.js'));
        const oldHtml = htmlPluginData.html;
        htmlPluginData.html = utils_1.addScriptTag(oldHtml, script.toString(), (_b = (_a = this === null || this === void 0 ? void 0 : this.option) === null || _a === void 0 ? void 0 : _a.port) !== null && _b !== void 0 ? _b : 8888);
        return htmlPluginData;
    }
    /**
     * @internal
     */
    async outputSkeletonScreen() {
        await (init_1.RENDER === null || init_1.RENDER === void 0 ? void 0 : init_1.RENDER.outputScreen());
    }
}
exports.default = PrerenderPlugin;
