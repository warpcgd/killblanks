/*
 * @Author: lixichen
 * @Date: 2020-05-31 01:27:49
 * @Last Modified by: lixichen
 * @Last Modified time: 2021-03-12 01:56:07
 */

import qrcode from 'qrcode'
import log from '../log/index'
import { myFs } from '../utils/MemoryFileSystem'
import { minifyOptions } from '../config'
import { minify } from 'html-minifier'
const path = require('path')
const md5 = require('md5')

export function addScriptTag(source: string, script: string, port: string | number) {
  const token = source.split('</body>')
  if (token.length < 2) return source
  const scriptTag = `
    <script id="_puppeteer_">
      window._killblanksSocketPort_ = ${port}
    </script>
    <script type="text/javascript" id="_puppeteer_" defer>${script}</script>
    `
  return `${token[0]}${scriptTag}</body>${token[1]}`
}

export function htmlMinify(html: string) {
  return minify(html, minifyOptions)
}

export async function writeMagicHtml(html: string, option: Options) {
  try {
    const { magicPath } = option
    const pathName = path.resolve(__dirname, '../', magicPath)
    let fileName = await md5(html)
    fileName += '_prerender.html'
    myFs.mkdirpSync(pathName)
    myFs.writeFileSync(path.join(pathName, fileName), html, 'utf8')
    return fileName
  } catch (err) {
    log.warn(err)
    return undefined
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
