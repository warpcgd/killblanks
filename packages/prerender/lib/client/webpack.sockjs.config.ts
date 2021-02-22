import path from 'path'
module.exports = {
  mode: 'production',
  entry: {
    index: './sock_client.ts'
  },
  output: {
    filename: 'sock_client.bundle.js',
    path: path.resolve(__dirname, '../../dist/esm/client')
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}
