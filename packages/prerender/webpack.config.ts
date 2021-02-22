const path = require('path')
const { merge } = require('webpack-merge')
const base = require('../../build/webpack.base.ts')
module.exports = merge(base, {
  entry: path.resolve(__dirname, 'lib', 'index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  }
})
