// eslint-disable-next-line
const { VueLoaderPlugin } = require('vue-loader')
// eslint-disable-next-line
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// eslint-disable-next-line
const CopyWebpackPlugin = require('copy-webpack-plugin')
// eslint-disable-next-line
const path = require('path')

module.exports = {
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
    new CopyWebpackPlugin([
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
    ])
  ],
  resolve: {
    extensions: ['.ts', '.vue', '.js'],
    alias: {
      '@': path.resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        }
      },
      {
        test: /\.vue$/,
        loaders: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.sass$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader?indentedSyntax']
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
  }
}
