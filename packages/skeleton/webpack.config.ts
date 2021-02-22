import path from 'path'
import { merge } from 'webpack-merge'
import base from '../../build/webpack.base'

module.exports = merge(base, {
  entry: path.resolve(__dirname, 'lib', 'index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'Skeleton',
    libraryTarget: 'umd',
    globalObject: 'this'
  }
})
