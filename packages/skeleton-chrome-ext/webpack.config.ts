import path from 'path'
import { merge } from 'webpack-merge'
import base from '../../build/webpack.base'

import ExtensionReloader from 'webpack-extension-reloader'
import { VueLoaderPlugin } from 'vue-loader'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

module.exports = merge(base, {
  entry: {
    './contentScript/contentScript': './src/content/index.ts',
    './background/background': './src/background/background.ts',
    './popup/popup': './src/popup/popup.ts',
    './devtools/devtools': './src/devtools/devtools.ts',
    './sidebarPanel/index': './src/sidebarPanel/index.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    // @ts-ignore
    new ExtensionReloader({
      port: 9090, // Which port use to create the server
      reloadPage: true, // Force the reload of the page also
      entries: {
        // The entries used for the content/background scripts or extension pages
        contentScript: 'content-script',
        background: 'background',
        extensionPage: 'popup',
        devtools: 'devtools',
        sidebarPanel: 'sidebarPanel'
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './manifest.json' },
        { from: './src/devtools/devtools.html', to: path.resolve(__dirname, 'dist', 'devtools') },
        { from: './src/popup/index.html', to: path.resolve(__dirname, 'dist', 'popup') },
        {
          from: './src/sidebarPanel/index.html',
          to: path.resolve(__dirname, 'dist', 'sidebarPanel')
        },
        {
          context: 'src/icons',
          from: '*.png',
          to: path.resolve(__dirname, 'dist', 'icons')
        },
        {
          context: 'src/assets',
          from: '*.png',
          to: path.resolve(__dirname, 'dist', 'assets')
        },
        {
          context: 'src/assets',
          from: '*.gif',
          to: path.resolve(__dirname, 'dist', 'assets')
        }
      ]
    })
  ],
  resolve: {
    extensions: ['.ts', '.vue', '.js'],
    alias: {
      '@': path.resolve('src')
    }
  }
})
