import puppeteer from 'puppeteer'
import log from '../log'

class Puppeteer {
  browser: puppeteer.Browser | null = null

  option: Options | null = null

  pages: Array<puppeteer.Page> = []

  constructor(option: Options) {
    this.option = option
  }

  async init(): Promise<void> {
    const args = []
    if (process.platform === 'linux') {
      args.push('--no-sandbox')
      args.push('--disable-setuid-sandbox')
    }
    this.browser = await puppeteer.launch({
      headless: true,
      args
    })
    log.info('puppeteer has inited')
  }

  async newPage() {
    try {
      const page = await this.browser?.newPage()
      const { cookies } = this?.option ?? {}
      // Request拦截
      if (page) {
        await this.interceptRequest(page)
        // 插入变量
        await this.injectProperty(page)
      }
      const { device } = this.option as Options
      const { devices } = puppeteer
      if (device && devices[device]) {
        await page?.emulate(devices[device])
      }

      if (this?.option?.debug) {
        // @ts-ignore
        page.on('console', (...args) => {
          log.info(...args)
        })
      }
      if ((cookies && cookies.length) || typeof cookies === 'function') {
        let _cookie = cookies
        if (typeof cookies === 'function') {
          _cookie = await cookies()
          // log.info(_cookie)
        }
        // @ts-ignore
        await page.setCookie(..._cookie.filter(cookie => typeof cookie === 'object'))
      }
      return page
    } catch (error) {
      log.error(error)
      return null
    }
  }

  async interceptRequest(page: puppeteer.Page): Promise<void> {
    await page.setRequestInterception(true)
    page.on('request', req => {
      if (this?.option?.requestHandle) {
        return this.option.requestHandle(req, this.option)
      }
      return req.continue()
    })
  }

  async injectProperty(page: puppeteer.Page) {
    if (this?.option?.injectProperty) {
      await page.evaluateOnNewDocument(
        `(function () { window['${this.option.injectProperty}'] = true; })();`
      )
    }
  }

  async closePage(page: puppeteer.Page) {
    await page.close()
  }

  destroy() {
    if (this.browser) {
      this.browser.close()
      this.browser = null
    }
  }

  waitForRender(options: Options) {
    return new Promise((resolve, reject) => {
      try {
        // Render when an event fires on the document.
        if (options.renderAfterDocumentEvent) {
          document.addEventListener(options.renderAfterDocumentEvent, () => resolve(true))
          setTimeout(() => {
            // @ts-ignore
            if (window.sockWrite) {
              window.sockWrite(
                'console',
                `Waited for ${(options?.renderAfterTime ?? 3000) /
                  1000} seconds, renderAfterDocumentEvent event was not found, automatically exited the page`
              )
            }
            return resolve(true)
          }, options.renderAfterTime)
          // Render after a certain number of milliseconds.
        } else if (options.renderAfterTime) {
          setTimeout(() => resolve(true), options.renderAfterTime)
          // Default: Render immediately after page content loads.
        } else {
          resolve(true)
        }
      } catch (error) {
        reject(error)
      }
    })
  }
}
export default Puppeteer
