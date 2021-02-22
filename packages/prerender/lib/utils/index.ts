/*
 * @Author: lixichen
 * @Date: 2020-05-31 01:27:49
 * @Last Modified by: lixichen
 * @Last Modified time: 2020-07-28 01:49:41
 */

import qrcode from 'qrcode'
import merge from 'deepmerge'
import traverse from 'traverse'
import _ from 'lodash'
import log from '../log/index'
import { myFs } from '../utils/MemoryFileSystem'
import { htmlBeautifyConfig, minifyOptions } from '../config'
import skeletonConfig from '../config/skeletonConfig'
import { minify } from 'html-minifier'
const { html2json, json2html } = require('html2json')
const fs = require('fs')
const path = require('path')
const md5 = require('md5')
const htmlBeautify = require('js-beautify').html_beautify
const css2json: Css2json = require('css2json')

const cwd = process.cwd()

function json2css(obj: object) {
  const selectors = Object.keys(obj) as Array<keyof typeof obj>
  return selectors
    .map(selector => {
      const definition = obj[selector]
      const rules = Object.keys(definition) as Array<keyof typeof obj>
      const result = rules
        .map(rule => {
          return `${rule}:${definition[rule]}`
        })
        .join(';')
      return `${selector}{${result}}`
    })
    .join('')
}

function transClassAndStyle(obj: { [propName: string]: any }) {
  if (obj && obj.attr && obj.attr.class && typeof obj.attr.class === 'string') {
    obj.attr.class = [obj.attr.class]
  }
  if (obj && obj.attr && obj.attr.style && Array.isArray(obj.attr.style)) {
    let style = obj.attr.style.join(' ')
    // @ts-ignore
    style = style.split(';').map(i => (i += ';'))
    obj.attr.style = style
  }
  if (obj && obj.attr && obj.attr.style && typeof obj.attr.style === 'string') {
    obj.attr.style = [obj.attr.style]
  }

  if (obj.child && obj.child.length) {
    // @ts-ignore
    obj.child.forEach(element => {
      transClassAndStyle(element)
    })
  }
  return obj
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
export function addScriptTag(source: string, script: string, port: string | number) {
  const token = source.split('</body>')
  if (token.length < 2) return source
  const scriptTag = `
    <script id="_puppeteer_">
      window._pageSkeletonSocketPort = ${port}
    </script>
    <script type="text/javascript" id="_puppeteer_" defer>${script}</script>
    `
  return `${token[0]}${scriptTag}</body>${token[1]}`
}

export const removeElement = (ele: Element) => {
  const parent = ele.parentNode
  if (parent) {
    parent.removeChild(ele)
  }
}

export function htmlMinify(html: string, options: boolean) {
  return options === false ? htmlBeautify(html, htmlBeautifyConfig) : minify(html, minifyOptions)
}

export async function writeShell(html: string, option: Options) {
  const { shellDir, shellName } = option
  const filePath = path.join(cwd, shellDir, `${shellName}.html`)
  await fs.writeFileSync(filePath, htmlMinify(html, true), 'utf-8')
  return filePath
}

export async function writeMagicHtml(html: string, option: Options) {
  try {
    const { magicPath } = option
    const pathName = path.resolve(__dirname, '../', magicPath)
    let fileName = await md5(html)
    fileName += '.html'
    myFs.mkdirpSync(pathName)
    myFs.writeFileSync(path.join(pathName, fileName), html, 'utf8')
    return fileName
  } catch (err) {
    log.warn(err)
  }
}

export function getMagicHtml(fileName: string, option: Options): string {
  const { magicPath } = option
  try {
    const pathName = path.resolve(__dirname, '../', magicPath)
    const html = myFs.readFileSync(path.join(pathName, `${fileName}`), 'utf8')
    return html
  } catch (err) {
    log.warn(err)
    return ''
  }
}

export async function getShellHtml(option: Options): Promise<string> {
  const { shellDir, shellName } = option
  const filePath = path.join(cwd, shellDir, `${shellName}.html`)
  const html = (await fs.readFileSync(filePath, 'utf-8')) || ''
  return html
}

export function arrayToObj<T extends string>(o: Array<T>): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key
    return res
  }, Object.create(null))
}

export function sleep(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}

export async function generateQR(url: string) {
  try {
    return await qrcode.toDataURL(url)
  } catch (err) {
    return Promise.reject(err)
  }
}

export function htmlToJson(html: string): object {
  try {
    return html2json(html)
  } catch (error) {
    log.warn(error)
    return {}
  }
}

export function jsonToHtml(json: object): string {
  try {
    return json2html(json)
  } catch (error) {
    log.warn(error)
    return ''
  }
}

export function getHtmlAndStyleFromJson(jsonForOriginHtml: object) {
  try {
    const originRoot = traverse(jsonForOriginHtml)
    if (originRoot) {
      let cleanedHtml = ''
      let styles = ''
      originRoot.forEach(function(node) {
        const isStyle = (e: any) =>
          e && e.tag === 'style' && e.attr && e.attr.title && e.attr.title === '_skeleton_'
        const isElement = (e: any) => e && e.attr && e.attr._skeleton_
        if (isStyle(node)) {
          styles = jsonToHtml(node)
        }
        if (isElement(node)) {
          cleanedHtml = jsonToHtml(node)
        }
      })
      return {
        cleanedHtml,
        styles
      }
    }
    return {}
  } catch (error) {
    log.warn(error)
    return {}
  }
}

export function deepMergeSkeleton(jsonForOriginHtml: object, jsonForHtml: object): void {
  try {
    const originRoot = traverse(jsonForOriginHtml)
    const Root = traverse(jsonForHtml)
    if (originRoot && Root) {
      Root.forEach((node: DefaultObjectType) => {
        const isStyle = (e: any) =>
          e && e.tag === 'style' && e.attr && e.attr.title && e.attr.title === '_skeleton_'
        const isElement = (e: any) =>
          e && e.attr && e.attr._skeleton_ !== undefined && e.attr._skeleton_
        const skeletonIndex = (e: any) =>
          e && e.attr && e.attr._skeleton_ !== undefined && e.attr._skeleton_
        if (isStyle(node) || isElement(node)) {
          originRoot.forEach((originNode: DefaultObjectType) => {
            if (
              isElement(node) &&
              isElement(originNode) &&
              skeletonIndex(node) === skeletonIndex(originNode)
            ) {
              originNode = transClassAndStyle(originNode)
              // console.log(originNode.child[0].child[0].child[0])
              node = transClassAndStyle(node)
              // console.log(node.child[0].child[0].child[0])
              const newNode = merge(originNode, node)
              this.update(newNode)
            }
            if (isStyle(node) && isStyle(originNode)) {
              const originCssText: string = originNode.child[0].text
              const cssText: string = node.child[0].text
              const originCss = css2json(originCssText)
              const css = css2json(cssText)
              const newCss: object = merge(originCss, css)
              originNode.child[0].text = json2css(newCss)
              this.update(originNode)
            }
          })
        }
      })
    }
  } catch (error) {
    log.warn(error)
  }
}

export function deepMerge(x: object, y: object): object {
  const combineMergeeee = (target: Array<any>, source: Array<any>, options: merge.Options) => {
    const destination = target.slice()

    source.forEach((item, index) => {
      // console.log('target', target[index])
      // console.log('item', item)
      // console.log('>>>>>>>>>>>>>')
      if (typeof destination[index] === 'undefined') {
        // @ts-ignore
        destination[index] = options.cloneUnlessOtherwiseSpecified(item, options)
      } else if (options.isMergeableObject(item)) {
        destination[index] = merge(target[index], item, options)
      } else if (target.indexOf(item) === -1) {
        destination.push(item)
      }
    })
    return destination
  }

  return merge(x, y, {
    arrayMerge: combineMergeeee
  })
}

export function renderShellHtml(styles: string, cleanedHtml: string) {
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
      </html>`
  shellHtml = shellHtml.replace('$$css$$', styles).replace('$$html$$', cleanedHtml)
  return shellHtml
}

export function removeDprAndFontSize(html: string): string {
  const json = html2json(html)
  const rootElement = json.child.filter((c: { tag: string }) => c.tag === 'html')[0]
  const oriAttr = rootElement.attr
  const style = oriAttr.style || []
  const index = style.indexOf('font-size:')
  if (index > -1) {
    style.splice(index + 1, 1)
    style.splice(index, 1)
  }
  if (oriAttr['data-dpr']) {
    delete oriAttr['data-dpr']
  }
  const rootAttr = Object.assign(oriAttr, {
    style
  })
  rootElement.attr = rootAttr
  return json2html(json)
}

export function resolveMod(option: Options) {
  const { mod } = option
  if (_.isString(mod)) {
    // @ts-ignore
    const modeObject = skeletonConfig[mod] || skeletonConfig.default
    option.mod = modeObject
  } else if (_.isObject(mod)) {
    // @ts-ignore
    const userMod = mod.name || 'default'
    // @ts-ignore
    const modeObject = skeletonConfig[userMod] || skeletonConfig.default
    option.mod = _.merge(modeObject, mod)
  } else {
    option.mod = skeletonConfig.default
  }
  return option
}
