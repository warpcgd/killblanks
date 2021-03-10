import os from 'os'
import getPort from 'get-port'

const getFreePort = async function(): Promise<number> {
  return await getPort()
}

const getLocalIpAddress = async (): Promise<string | void> => {
  const interfaces = os?.networkInterfaces() || null
  if (interfaces) {
    for (const devName in interfaces) {
      // eslint-disable-line guard-for-in
      const iface = interfaces?.[devName] || null
      if (iface) {
        for (const alias of iface) {
          if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
            return alias.address
          }
        }
      }
    }
  } else {
    throw 'Error obtaining free address'
  }
}

const defaultOptions: Options = {
  device: 'iPhone X',
  injectProperty: '__PRERENDER_INJECTED__',
  renderAfterDocumentEvent: 'prerender-skeleton',
  renderAfterTime: 3000,
  debug: false,
  requestHandle: null,
  outputDir: 'dist',
  shellDir: '/',
  entryPath: 'index',
  outPutPath: 'index',
  shellName: 'shell',
  langs: [],
  magicPath: '__webpack_prerender_skeleton__'
}

const htmlBeautifyConfig = {
  indent_size: 2,
  html: {
    end_with_newline: true,
    js: {
      indent_size: 2
    },
    css: {
      indent_size: 2
    }
  },
  css: {
    indent_size: 1
  },
  js: {
    'preserve-newlines': true
  }
}

const SOCK_NODE_EVENTS: Array<
  'generate' | 'connect' | 'getUrl' | 'console' | 'saveShellFile' | 'writeShellFile' | 'update'
> = ['generate', 'connect', 'getUrl', 'console', 'saveShellFile', 'writeShellFile', 'update']

const minifyOptions = {
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
  removeComments: false,
  removeAttributeQuotes: true,
  removeEmptyAttributes: false
}

export {
  htmlBeautifyConfig,
  defaultOptions,
  minifyOptions,
  SOCK_NODE_EVENTS,
  getFreePort,
  getLocalIpAddress
}
