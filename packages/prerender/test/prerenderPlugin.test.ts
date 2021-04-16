import { merge } from 'lodash'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import 'expect-puppeteer'
import { getFreePort } from '../lib/config'

const path = require('path')
const rimraf = require('rimraf')
const fs = require('fs')
const OUTPUT_DIR = path.resolve(__dirname, 'output')
const ENTRY_DIR = path.join(__dirname, 'entry/index.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const prerenderPlugin = require('../dist/esm/index')

const WEBPACK_CONFIG_BASE: webpack.Configuration = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  devtool: 'inline-source-map',
  entry: {
    path: ENTRY_DIR
  },
  output: {
    path: OUTPUT_DIR
  },
  plugins: [new HtmlWebpackPlugin()],
  performance: {
    hints: false
  }
}
jest.setTimeout(60000000)
process.on('unhandledRejection', r => console.log(r))

function runProductWebpack({
  prerenderPluginConfig = {},
  webpackConfig = {},
  expectErrors = false,
  expectWarnings = false,
  buildedHandle = () => true,
  done
}: {
  prerenderPluginConfig?: Record<string, any>
  webpackConfig?: Record<string, any>
  expectErrors?: boolean
  expectWarnings?: boolean
  buildedHandle?: Function
  done: jest.DoneCallback
}) {
  const config = merge({}, WEBPACK_CONFIG_BASE, webpackConfig)
  config?.plugins?.push(
    new prerenderPlugin(
      merge(
        {},
        {
          outputDir: OUTPUT_DIR
        },
        prerenderPluginConfig
      )
    )
  )
  webpack(config, (err: any, stats: any) => {
    expect(err).toBeFalsy()
    const compilationErrors = (stats.compilation.errors || []).join('\n')
    // Check whether there is an error
    if (expectErrors) {
      expect(compilationErrors).not.toBe('')
    } else {
      expect(compilationErrors).toBe('')
    }
    // Check whether there is an warnning
    const compilationWarnings = (stats.compilation.warnings || []).join('\n')
    if (expectWarnings) {
      expect(compilationWarnings).not.toBe('')
    } else {
      expect(compilationWarnings).toBe('')
    }

    if (process.env.NODE_ENV === 'production') {
      const outputFileExists = fs.existsSync(path.join(OUTPUT_DIR, 'index.html'))
      expect(outputFileExists).toBe(true)

      const htmlContent = fs.readFileSync(path.join(OUTPUT_DIR, 'index.html')).toString()
      // Test whether to output the file
      expect(htmlContent).toBeDefined()
      expect(htmlContent.length > 0).not.toBeFalsy()
      // Test whether the pre-rendering is successful
      expect(htmlContent).toMatch(/prerender=true/gi)

      buildedHandle()
    }
    done()
  })
}

async function runTestWebpack({
  prerenderPluginConfig = {},
  webpackConfig = {},
  devlopeHandle = () => true,
  expectErrors = false,
  expectWarnings = false,
  done
}: {
  prerenderPluginConfig?: Record<string, any>
  webpackConfig?: Record<string, any>
  expectErrors?: boolean
  expectWarnings?: boolean
  buildedHandle?: Function
  devlopeHandle?: Function
  done: jest.DoneCallback
}) {
  const config = merge({}, WEBPACK_CONFIG_BASE, webpackConfig)
  config?.plugins?.push(
    new prerenderPlugin(
      merge(
        {},
        {
          outputDir: OUTPUT_DIR
        },
        prerenderPluginConfig
      )
    )
  )
  const host = 'http://localhost'
  const port = await getFreePort()
  const url = host + ':' + port
  const compiler: webpack.Compiler = webpack(config, (err: any, stats: any) => {
    expect(err).toBeFalsy()
    const compilationErrors = (stats.compilation.errors || []).join('\n')
    // Check whether there is an error
    if (expectErrors) {
      expect(compilationErrors).not.toBe('')
    } else {
      expect(compilationErrors).toBe('')
    }
    // Check whether there is an warnning
    const compilationWarnings = (stats.compilation.warnings || []).join('\n')
    if (expectWarnings) {
      expect(compilationWarnings).not.toBe('')
    } else {
      expect(compilationWarnings).toBe('')
    }
  })

  const devServerOptions = Object.assign(
    {},
    {
      hot: true
    },
    config?.devServer || {}
  )
  // @ts-ignore
  const server = new WebpackDevServer(compiler, devServerOptions)
  server.listen(port, 'localhost', async () => {
    console.log(`Starting test server on ${url}`)
  })
  compiler.hooks.done.tapAsync('done', async state => {
    await page.goto(url)
    await expect(page).toMatchElement('[id="_puppeteer_"]', { timeout: 1000 })
    // @ts-ignore
    devlopeHandle.call(this, {
      page,
      compiler,
      state
    })
    // done()
  })
}

function checkProductEnvPlugin() {
  process.env.NODE_ENV = 'production'
  test('Test whether 1the pre-rendered output file in the production environment is normal', done => {
    runProductWebpack({
      done
    })
  })
}

function checkTestEnvPlugin() {
  process.env.NODE_ENV = 'development'
  test('Test whether the pre-rendering of the development environment is normally turned on', async done => {
    await runTestWebpack({
      done
    })
  })
}

describe('test prerenderPlugin', () => {
  beforeEach(done => {
    rimraf(OUTPUT_DIR, done)
  })
  checkProductEnvPlugin()
  checkTestEnvPlugin()
})
