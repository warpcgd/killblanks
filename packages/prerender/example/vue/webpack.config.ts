const path = require('path')
const prerenderPlugin = require('../../dist/esm/index')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, './index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    open: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.css|sass|scss$/,
        use: [
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env', {}]]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
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
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]?[hash]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'), // 引入模版
      filename: 'index.html'
    }),
    new prerenderPlugin({
      outputDir: path.resolve(__dirname, 'dist'),
      langs: ['en', 'zh']
    }),
    new CleanWebpackPlugin()
  ]
}
