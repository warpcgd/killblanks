import { merge } from 'lodash'
import webpack from 'webpack'
import prerenderPlugin from '../lib/core/prerenderPlugin'

const path = require('path')
const rimraf = require('rimraf')
const fs = require('fs')
const OUTPUT_DIR = path.resolve(__dirname, 'output')
const ENTRY_DIR = path.join(__dirname, 'entry/index.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const WEBPACK_CONFIG_BASE: webpack.Configuration = {
  mode: 'production',
  entry: {
    path: ENTRY_DIR
  },
  output: {
    path: OUTPUT_DIR,
    filename: '[name].bundle.js'
  },
  plugins: [new HtmlWebpackPlugin(), new prerenderPlugin({})]
}

jest.setTimeout(30000)
process.on('unhandledRejection', r => console.log(r))

function runWebpack({
  prerenderPluginConfig = {},
  expectErrors = false,
  expectWarnings = false,
  done
}: {
  prerenderPluginConfig?: Record<string, any>
  expectErrors?: boolean
  expectWarnings?: boolean
  done: jest.DoneCallback
}) {
  const config = merge({}, WEBPACK_CONFIG_BASE, {
    plugins: [new HtmlWebpackPlugin(), new prerenderPlugin(prerenderPluginConfig)]
  })
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

    const outputFileExists = fs.existsSync(path.join(OUTPUT_DIR, 'index.html'))
    expect(outputFileExists).toBe(true)

    const htmlContent = fs.readFileSync(path.join(OUTPUT_DIR, 'index.html')).toString()
    expect(htmlContent).toBeDefined()
    expect(htmlContent.length > 0).not.toBeFalsy()
    expect(htmlContent).toMatch(/prerender="true"/gi)
    done()
  })
}

function checkProductEnvPlugin() {
  test('generates a right prerender index.html file', done => {
    runWebpack({
      done
    })
  })
}

// function checkTestEnvPlugin() {}

describe('test prerenderPlugin', () => {
  beforeEach(done => {
    rimraf(OUTPUT_DIR, done)
  })
  checkProductEnvPlugin()
})
