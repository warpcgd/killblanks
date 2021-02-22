const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const PATH = {
  app: __dirname,
  build: __dirname
}

module.exports = {
  mode: 'production',
  entry: path.resolve(PATH.app, './index.js'),
  output: {
    filename: '[name].bundle.js',
    path: path.join(PATH.build, '../', 'dist/esm/preview')
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
      },
      exclude: /node_modules/
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        extractCSS: false
      }
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        "css-loader"
      ]
    }, {
      test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 5000
          }
        }
      ]
    }]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(PATH.app, './index.html'),
      filename: path.resolve(PATH.build, '../dist/esm/preview/index.html'),
      inject: true
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.mode = 'production'
}
