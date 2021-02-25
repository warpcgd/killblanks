"use strict";
/*
 * @Author: lixichen
 * @Date: 2020-05-31 01:27:49
 * @Last Modified by: lixichen
 * @Last Modified time: 2020-07-28 01:49:41
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveMod = exports.removeDprAndFontSize = exports.renderShellHtml = exports.deepMerge = exports.deepMergeSkeleton = exports.getHtmlAndStyleFromJson = exports.jsonToHtml = exports.htmlToJson = exports.generateQR = exports.sleep = exports.arrayToObj = exports.getShellHtml = exports.getMagicHtml = exports.writeMagicHtml = exports.writeShell = exports.htmlMinify = exports.removeElement = exports.addScriptTag = void 0;
const tslib_1 = require("tslib");
const qrcode_1 = tslib_1.__importDefault(require("qrcode"));
const deepmerge_1 = tslib_1.__importDefault(require("deepmerge"));
const traverse_1 = tslib_1.__importDefault(require("traverse"));
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const index_1 = tslib_1.__importDefault(require("../log/index"));
const MemoryFileSystem_1 = require("../utils/MemoryFileSystem");
const config_1 = require("../config");
const skeletonConfig_1 = tslib_1.__importDefault(require("../config/skeletonConfig"));
const html_minifier_1 = require("html-minifier");
const { html2json, json2html } = require('html2json');
const fs = require('fs');
const path = require('path');
const md5 = require('md5');
const htmlBeautify = require('js-beautify').html_beautify;
const css2json = require('css2json');
const cwd = process.cwd();
function json2css(obj) {
    const selectors = Object.keys(obj);
    return selectors
        .map(selector => {
        const definition = obj[selector];
        const rules = Object.keys(definition);
        const result = rules
            .map(rule => {
            return `${rule}:${definition[rule]}`;
        })
            .join(';');
        return `${selector}{${result}}`;
    })
        .join('');
}
function transClassAndStyle(obj) {
    if (obj && obj.attr && obj.attr.class && typeof obj.attr.class === 'string') {
        obj.attr.class = [obj.attr.class];
    }
    if (obj && obj.attr && obj.attr.style && Array.isArray(obj.attr.style)) {
        let style = obj.attr.style.join(' ');
        // @ts-ignore
        style = style.split(';').map(i => (i += ';'));
        obj.attr.style = style;
    }
    if (obj && obj.attr && obj.attr.style && typeof obj.attr.style === 'string') {
        obj.attr.style = [obj.attr.style];
    }
    if (obj.child && obj.child.length) {
        // @ts-ignore
        obj.child.forEach(element => {
            transClassAndStyle(element);
        });
    }
    return obj;
}
/**
 *插入script标签到html body前
 *
 * @export
 * @param {*} source html源
 * @param {*} src script源
 * @param {*} port 端口
 * @returns
 */
function addScriptTag(source, script, port) {
    const token = source.split('</body>');
    if (token.length < 2)
        return source;
    const scriptTag = `
    <script id="_puppeteer_">
      window._pageSkeletonSocketPort = ${port}
    </script>
    <script type="text/javascript" id="_puppeteer_" defer>${script}</script>
    `;
    return `${token[0]}${scriptTag}</body>${token[1]}`;
}
exports.addScriptTag = addScriptTag;
exports.removeElement = (ele) => {
    const parent = ele.parentNode;
    if (parent) {
        parent.removeChild(ele);
    }
};
function htmlMinify(html, options) {
    return options === false ? htmlBeautify(html, config_1.htmlBeautifyConfig) : html_minifier_1.minify(html, config_1.minifyOptions);
}
exports.htmlMinify = htmlMinify;
async function writeShell(html, option) {
    const { shellDir, shellName } = option;
    const filePath = path.join(cwd, shellDir, `${shellName}.html`);
    await fs.writeFileSync(filePath, htmlMinify(html, true), 'utf-8');
    return filePath;
}
exports.writeShell = writeShell;
async function writeMagicHtml(html, option) {
    try {
        const { magicPath } = option;
        const pathName = path.resolve(__dirname, '../', magicPath);
        let fileName = await md5(html);
        fileName += '.html';
        MemoryFileSystem_1.myFs.mkdirpSync(pathName);
        MemoryFileSystem_1.myFs.writeFileSync(path.join(pathName, fileName), html, 'utf8');
        return fileName;
    }
    catch (err) {
        index_1.default.warn(err);
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
async function getShellHtml(option) {
    const { shellDir, shellName } = option;
    const filePath = path.join(cwd, shellDir, `${shellName}.html`);
    const html = (await fs.readFileSync(filePath, 'utf-8')) || '';
    return html;
}
exports.getShellHtml = getShellHtml;
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
function htmlToJson(html) {
    try {
        return html2json(html);
    }
    catch (error) {
        index_1.default.warn(error);
        return {};
    }
}
exports.htmlToJson = htmlToJson;
function jsonToHtml(json) {
    try {
        return json2html(json);
    }
    catch (error) {
        index_1.default.warn(error);
        return '';
    }
}
exports.jsonToHtml = jsonToHtml;
function getHtmlAndStyleFromJson(jsonForOriginHtml) {
    try {
        const originRoot = traverse_1.default(jsonForOriginHtml);
        if (originRoot) {
            let cleanedHtml = '';
            let styles = '';
            originRoot.forEach(function (node) {
                const isStyle = (e) => e && e.tag === 'style' && e.attr && e.attr.title && e.attr.title === '_skeleton_';
                const isElement = (e) => e && e.attr && e.attr._skeleton_;
                if (isStyle(node)) {
                    styles = jsonToHtml(node);
                }
                if (isElement(node)) {
                    cleanedHtml = jsonToHtml(node);
                }
            });
            return {
                cleanedHtml,
                styles
            };
        }
        return {};
    }
    catch (error) {
        index_1.default.warn(error);
        return {};
    }
}
exports.getHtmlAndStyleFromJson = getHtmlAndStyleFromJson;
function deepMergeSkeleton(jsonForOriginHtml, jsonForHtml) {
    try {
        const originRoot = traverse_1.default(jsonForOriginHtml);
        const Root = traverse_1.default(jsonForHtml);
        if (originRoot && Root) {
            Root.forEach((node) => {
                const isStyle = (e) => e && e.tag === 'style' && e.attr && e.attr.title && e.attr.title === '_skeleton_';
                const isElement = (e) => e && e.attr && e.attr._skeleton_ !== undefined && e.attr._skeleton_;
                const skeletonIndex = (e) => e && e.attr && e.attr._skeleton_ !== undefined && e.attr._skeleton_;
                if (isStyle(node) || isElement(node)) {
                    originRoot.forEach((originNode) => {
                        if (isElement(node) &&
                            isElement(originNode) &&
                            skeletonIndex(node) === skeletonIndex(originNode)) {
                            originNode = transClassAndStyle(originNode);
                            // console.log(originNode.child[0].child[0].child[0])
                            node = transClassAndStyle(node);
                            // console.log(node.child[0].child[0].child[0])
                            const newNode = deepmerge_1.default(originNode, node);
                            this.update(newNode);
                        }
                        if (isStyle(node) && isStyle(originNode)) {
                            const originCssText = originNode.child[0].text;
                            const cssText = node.child[0].text;
                            const originCss = css2json(originCssText);
                            const css = css2json(cssText);
                            const newCss = deepmerge_1.default(originCss, css);
                            originNode.child[0].text = json2css(newCss);
                            this.update(originNode);
                        }
                    });
                }
            });
        }
    }
    catch (error) {
        index_1.default.warn(error);
    }
}
exports.deepMergeSkeleton = deepMergeSkeleton;
function deepMerge(x, y) {
    const combineMergeeee = (target, source, options) => {
        const destination = target.slice();
        source.forEach((item, index) => {
            // console.log('target', target[index])
            // console.log('item', item)
            // console.log('>>>>>>>>>>>>>')
            if (typeof destination[index] === 'undefined') {
                // @ts-ignore
                destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
            }
            else if (options.isMergeableObject(item)) {
                destination[index] = deepmerge_1.default(target[index], item, options);
            }
            else if (target.indexOf(item) === -1) {
                destination.push(item);
            }
        });
        return destination;
    };
    return deepmerge_1.default(x, y, {
        arrayMerge: combineMergeeee
    });
}
exports.deepMerge = deepMerge;
function renderShellHtml(styles, cleanedHtml) {
    let shellHtml = `<html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Page Skeleton</title>
        <!-- 你可以直接修改html里面内容来自定义样式 -->
        $$css$$
      </head>
      <body>
        $$html$$
      </body>
      </html>`;
    shellHtml = shellHtml.replace('$$css$$', styles).replace('$$html$$', cleanedHtml);
    return shellHtml;
}
exports.renderShellHtml = renderShellHtml;
function removeDprAndFontSize(html) {
    const json = html2json(html);
    const rootElement = json.child.filter((c) => c.tag === 'html')[0];
    const oriAttr = rootElement.attr;
    const style = oriAttr.style || [];
    const index = style.indexOf('font-size:');
    if (index > -1) {
        style.splice(index + 1, 1);
        style.splice(index, 1);
    }
    if (oriAttr['data-dpr']) {
        delete oriAttr['data-dpr'];
    }
    const rootAttr = Object.assign(oriAttr, {
        style
    });
    rootElement.attr = rootAttr;
    return json2html(json);
}
exports.removeDprAndFontSize = removeDprAndFontSize;
function resolveMod(option) {
    const { mod } = option;
    if (lodash_1.default.isString(mod)) {
        // @ts-ignore
        const modeObject = skeletonConfig_1.default[mod] || skeletonConfig_1.default.default;
        option.mod = modeObject;
    }
    else if (lodash_1.default.isObject(mod)) {
        // @ts-ignore
        const userMod = mod.name || 'default';
        // @ts-ignore
        const modeObject = skeletonConfig_1.default[userMod] || skeletonConfig_1.default.default;
        option.mod = lodash_1.default.merge(modeObject, mod);
    }
    else {
        option.mod = skeletonConfig_1.default.default;
    }
    return option;
}
exports.resolveMod = resolveMod;
