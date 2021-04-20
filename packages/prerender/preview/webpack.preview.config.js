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
    rules: [
      {
        test: /\.ts|js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
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
