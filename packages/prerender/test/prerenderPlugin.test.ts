import { merge } from 'lodash'
import webpack from 'webpack'
import prerenderPlugin from '../lib/core/prerenderPlugin'
import WebpackDevServer from 'webpack-dev-server'
import 'expect-puppeteer'
import { getFreePort } from '../lib/config'

const path = require('path')
const rimraf = require('rimraf')
const fs = require('fs')
const OUTPUT_DIR = path.resolve(__dirname, 'output')
const ENTRY_DIR = path.join(__dirname, 'entry/index.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const WEBPACK_CONFIG_BASE: webpack.Configuration = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    path: ENTRY_DIR
  },
  watch: false,
  output: {
    path: OUTPUT_DIR,
    filename: '[name].bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()]
}

jest.setTimeout(30000)
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
  devlopHandle?: Function
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
    }
    buildedHandle()
    done()
  })
}

async function runTestWebpack({
  prerenderPluginConfig = {},
  webpackConfig = {},
  devlopHandle = () => true,
  done
}: {
  prerenderPluginConfig?: Record<string, any>
  webpackConfig?: Record<string, any>
  expectErrors?: boolean
  expectWarnings?: boolean
  buildedHandle?: Function
  devlopHandle?: Function
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
  const compiler: webpack.Compiler = webpack(config)
  const devServerOptions = Object.assign({}, config?.devServer || {}, {})
  // @ts-ignore
  const server = new WebpackDevServer(compiler, devServerOptions)
  const host = 'http://localhost'
  const port = await getFreePort()
  const url = host + ':' + port
  server.listen(port, '127.0.0.1', async () => {
    console.log(`Starting test server on ${url}`)
    await page.goto(url)
    await expect(page).toMatch(/body/gi)
    devlopHandle()
    done()
  })
}

// function checkProductEnvPlugin() {
//   process.env.NODE_ENV = 'production'
//   test('Test whether the pre-rendered output file in the production environment is normal', done => {
//     runProductWebpack({
//       done
//     })
//   })
// }

function checkTestEnvPlugin() {
  process.env.NODE_ENV = 'development'
  test('Test whether the pre-rendering of the development environment is normally turned on', async done => {
    await runTestWebpack({
      done
    })
  })
}

// function checkTestEnvPlugin() {}

describe('test prerenderPlugin', () => {
  beforeEach(done => {
    rimraf(OUTPUT_DIR, done)
  })
  // checkProductEnvPlugin()
  checkTestEnvPlugin()
})
