import * as puppeteer from 'puppeteer'
import { PUPPETEER } from '../core/init'
import { htmlMinify, writeMagicHtml, generateQR } from '../utils/index'
import log from '../log'

const open = require('open')
const path = require('path')
const fs = require('fs')
const cwd = process.cwd()
class Render {
  option: Options

  previewPageUrl: string

  constructor(option: Options) {
    this.option = option
    this.previewPageUrl = `http://${this.option.host}:${this.option.port}/preview.html`
  }

  async renderPreivewScreen(origin: string, sockets: Sockets, open = true) {
    try {
      const page = await PUPPETEER.newPage()
      const url = origin
      await page.goto(url, { waitUntil: 'networkidle0' })
      await this.waitForRender(page)
      const { rawHtml } = await this.getCleanHtmlAndStyle(page)
      const _rawHtml = htmlMinify(rawHtml).replace('<!DOCTYPE html>', '')
      const fileName = await writeMagicHtml(_rawHtml, this.option)
      const skeletonPageUrl = `http://${this.option.host}:${this.option.port}/${fileName}`
      if (open) {
        this.openNewWindow(sockets)
      }
      PUPPETEER.closePage(page)
      return {
        fileName,
        originUrl: url,
        skeletonPageUrl,
        qrCode: await generateQR(skeletonPageUrl),
        html: ''
      }
    } catch (error) {
      log.error(error)
      process.exit()
    }
  }

  async waitForRender(page: puppeteer.Page) {
    // @ts-ignore
    await page.evaluate(PUPPETEER.waitForRender, this.option)
  }

  async getCleanHtmlAndStyle(page: puppeteer.Page, clean = 'true') {
    function inject(state: string) {
      if (state === 'true') {
        // 删除注入的
        const puppeteer = document.querySelectorAll('[id=_puppeteer_]')
        puppeteer.forEach(e => e.parentNode.removeChild(e))
      }
      // body 增加 prerender标志
      document.querySelector('body').setAttribute('prerender', 'true')
      const root = document.documentElement
      const rawHtml = root.outerHTML
      const styles =
        document.querySelector('style[title="_skeleton_"]') &&
        document.querySelector('style[title="_skeleton_"]').outerHTML
      const _skeleton_html = document.querySelectorAll('[_skeleton_]')
      const cleanedHtml = _skeleton_html.length
        ? Array.from(document.querySelectorAll('[_skeleton_]'))
            .map(i => i.outerHTML.replace(/&quot;/g, "'"))
            .join('')
        : ''
      return {
        rawHtml,
        styles,
        cleanedHtml
      }
    }
    return await page.evaluate(
      (js, clean) => {
        eval(js)
        return inject(clean)
      },
      inject.toString(),
      clean
    )
  }

  openNewWindow(sockets: Sockets) {
    let appName = 'google chrome'
    if (process.platform === 'win32') {
      appName = 'chrome'
    } else if (process.platform === 'linux') {
      appName = 'google-chrome'
    }
    if (!sockets || !sockets.preview) {
      open(this.previewPageUrl, { app: [appName, '--incognito'] })
    }
  }

  async outputScreen() {
    const { langs } = this.option
    const hasLang = langs && langs.length
    if (hasLang) {
      log.info(`find langs:${langs}`)
      await Promise.all(langs.map((lang: string) => this.renderScreen(lang)))
      return true
    }
    await this.renderScreen()
    return true
  }

  async renderScreen(lang?: string) {
    try {
      const { outputDir, entryPath, outPutPath, host, port } = this.option
      const page = await PUPPETEER.newPage()
      const langPath = lang && lang.length ? `?lang=${lang}` : ''
      const url = `http://${host}:${port}/${entryPath}.html${langPath}`
      await page.goto(url, { waitUntil: 'networkidle0' })
      await this.waitForRender(page)
      const { rawHtml } = await this.getCleanHtmlAndStyle(page, 'true')
      const newHtml = htmlMinify(rawHtml)
      const outputPath = lang && lang.length ? `${outPutPath}.${lang}.html` : `${outPutPath}.html`
      fs.writeFileSync(path.resolve(cwd, outputDir, outputPath), newHtml, 'utf8')
      log.info(`output ${outputPath} success`)
      await PUPPETEER.closePage(page)
    } catch (error) {
      log.error(error)
    }
  }
}

export default Render
