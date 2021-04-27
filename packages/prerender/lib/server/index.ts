import http from 'http'
import express from 'express'
import log from '../log/index'
import path from 'path'
import { getMagicHtml } from '../utils/index'
import { PUPPETEER } from '../core/init'

const cwd = process.cwd()
class Server {
  option: Options | null = null

  listenServer: http.Server | null = null

  app: express.Application | null = null

  constructor(option: Options) {
    this.option = option
    this.init()
  }

  private init(): void {
    this.createServer()
  }

  createServer(): void {
    const app = (this.app = express())
    this.listenServer = http.createServer(app)
    this.initRouters()
    this.listenServer.listen(this?.option?.port, () => {
      log.info(`prerender server listen at port:${this?.option?.port}`)
    })
  }

  async initRouters(): Promise<void> {
    const { app } = this
    if (process.env.NODE_ENV !== 'production') {
      app?.use('/', express.static(path.resolve(__dirname, '../', 'preview')))
    } else {
      const { outputDir } = this.option as Options
      app?.use('/', express.static(path.resolve(cwd, outputDir as string)))
    }

    // app?.get('/preview.html', async (req, res) => {

    // })

    app?.get(
      '/:filename',
      async (req, res): Promise<void> => {
        const { filename } = req.params
        if (!/prerender\.html$/.test(filename)) return
        let html = 'Not Found'
        try {
          html = getMagicHtml(filename, this.option as Options)
        } catch (err) {
          log.warn(`When you request the prerender html, ${err} ${filename}`)
        }
        res.send(html)
      }
    )
  }

  destroy() {
    if (PUPPETEER && PUPPETEER.destroy) {
      PUPPETEER.destroy()
    }
    this?.listenServer?.close(() => {
      log.info('server closed')
    })
  }
}
export default Server
