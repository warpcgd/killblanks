"use strict";
/*
 * @Author: lixichen
 * @Date: 2020-05-31 01:27:49
 * @Last Modified by: lixichen
 * @Last Modified time: 2021-03-12 01:56:07
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQR = exports.sleep = exports.arrayToObj = exports.getMagicHtml = exports.writeMagicHtml = exports.htmlMinify = exports.addScriptTag = void 0;
const tslib_1 = require("tslib");
const qrcode_1 = tslib_1.__importDefault(require("qrcode"));
const index_1 = tslib_1.__importDefault(require("../log/index"));
const MemoryFileSystem_1 = require("../utils/MemoryFileSystem");
const config_1 = require("../config");
const html_minifier_1 = require("html-minifier");
const path = require('path');
const md5 = require('md5');
function addScriptTag(source, script, port) {
    const token = source.split('</body>');
    if (token.length < 2)
        return source;
    const scriptTag = `
    <script id="_puppeteer_">
      window._killblanksSocketPort_ = ${port}
    </script>
    <script type="text/javascript" id="_puppeteer_" defer>${script}</script>
    `;
    return `${token[0]}${scriptTag}</body>${token[1]}`;
}
exports.addScriptTag = addScriptTag;
function htmlMinify(html) {
    return html_minifier_1.minify(html, config_1.minifyOptions);
}
exports.htmlMinify = htmlMinify;
async function writeMagicHtml(html, option) {
    try {
        const { magicPath } = option;
        const pathName = path.resolve(__dirname, '../', magicPath);
        let fileName = await md5(html);
        fileName += '_prerender.html';
        MemoryFileSystem_1.myFs.mkdirpSync(pathName);
        MemoryFileSystem_1.myFs.writeFileSync(path.join(pathName, fileName), html, 'utf8');
        return fileName;
    }
    catch (err) {
        index_1.default.warn(err);
        return undefined;
    }
}
exports.writeMagicHtml = writeMagicHtml;
function getMagicHtml(fileName, option) {
    const { magicPath } = option;
    try {
        const pathName = path.resolve(__dirname, '../', magicPath);
        const html = MemoryFileSystem_1.myFs.readFileSync(path.join(pathName, `${fileName}`), 'utf8');
        return html;
    }
    catch (err) {
        index_1.default.warn(err);
        return '';
    }
}
exports.getMagicHtml = getMagicHtml;
function arrayToObj(o) {
    return o.reduce((res, key) => {
        res[key] = key;
        return res;
    }, Object.create(null));
}
exports.arrayToObj = arrayToObj;
function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    });
}
exports.sleep = sleep;
async function generateQR(url) {
    try {
        return await qrcode_1.default.toDataURL(url);
    }
    catch (err) {
        return Promise.reject(err);
    }
}
exports.generateQR = generateQR;
