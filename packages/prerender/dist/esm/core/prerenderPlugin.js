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
    constructor(option) {
        this.init(option);
    }
    /**
     * @internal
     */
    apply(compiler) {
        compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
            const htmlWebpackPlugin = compiler.options.plugins
                .map(({ constructor }) => constructor)
                .find(({ name }) => name === 'HtmlWebpackPlugin');
            if (htmlWebpackPlugin) {
                if (compiler.hooks) {
                    const htmlWebpackPluginBeforeHtmlProcessing = 
                    // @ts-ignore
                    compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing ||
                        // @ts-ignore
                        htmlWebpackPlugin.getHooks(compilation).beforeEmit;
                    htmlWebpackPluginBeforeHtmlProcessing.tapAsync(PLUGIN_NAME, (htmlPluginData, callback) => {
                        if (process.env.NODE_ENV !== 'production') {
                            this.injectJs(htmlPluginData);
                        }
                        callback(null, htmlPluginData);
                    });
                }
            }
        });
        // @ts-ignore
        compiler.hooks.afterEmit.tapAsync(PLUGIN_NAME, async (compilation, callback) => {
            if (process.env.NODE_ENV === 'production') {
                await this.outputSkeletonScreen();
                init_1.SERVER.destroy();
            }
            callback();
        });
        EVENT_LIST.forEach(event => {
            // @ts-ignore
            compiler.hooks[event].tap(PLUGIN_NAME, () => {
                if (init_1.SERVER) {
                    init_1.SERVER.destroy();
                }
            });
        });
    }
    /**
     * @internal
     */
    async init(option) {
        try {
            const host = await config_1.getLocalIpAddress();
            const port = await config_1.getFreePort();
            const mergeOption = merge_1.default({ host, port }, config_1.defaultOptions, option);
            this.option = utils_1.resolveMod(mergeOption);
            await init_1.initMediator(this.option);
            MemoryFileSystem_1.initMemoryFileSystem();
        }
        catch (error) {
            index_1.default.error(error);
        }
    }
    /**
     * @internal
     */
    injectJs(htmlPluginData) {
        const script = fs_1.default.readFileSync(path_1.default.join(__dirname, '../client/sock_client.bundle.js'));
        const oldHtml = htmlPluginData.html;
        htmlPluginData.html = utils_1.addScriptTag(oldHtml, script.toString(), this.option.port);
        return htmlPluginData;
    }
    /**
     * @internal
     */
    async outputSkeletonScreen() {
        return await init_1.RENDER.outputScreen();
    }
}
exports.default = PrerenderPlugin;
