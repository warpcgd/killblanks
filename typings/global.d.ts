/**
 * @ignore
 */
interface Window {
  _killblanksSocketPort_: number
  sock: WebSocket
  generate: Function
  sockWrite: Function
  log: Function
  createPopup?: Function
  outputSkeleton: Function
}

interface ModType {
  name: string
  text: {
    /**
     * @type {string | `automatic`}
     * @default '#EFEFEF'
     * @description 设置文本字体颜色
     */
    color: string
  }
  image: {
    /**
     * @type {`rect` | `circle`}
     * @default '#rect'
     * @description 设置图片转换的形状
     */
    shape: string
    /**
     * @type {string | `automatic`}
     * @default '#EFEFEF'
     * @description 设置图片转换颜色
     */
    color: string | 'automatic'
    shapeOpposite: HTMLElement[]
  }
  button: {
    /**
     * @type {string}
     * @default '#EFEFEF'
     * @description 设置按钮转换颜色
     */
    color: string
    excludes: HTMLElement[]
  }
  svg: {
    /**
     * @type {string}
     * @default '#EFEFEF'
     * @description 设置svg转换颜色
     */
    color: string
    /**
     * @type {`rect` | `circle`}
     * @default '#rect'
     * @description 设置svg转换的形状
     */
    shape: string
    shapeOpposite: HTMLElement[]
  }
  pseudo: {
    /**
     * @type {string}
     * @default '#EFEFEF'
     * @description 设置伪类转换颜色
     */
    color: string
    /**
     * @type {`rect` | `circle`}
     * @default '#rect'
     * @description 设置伪类转换的形状
     */
    shape: string
    shapeOpposite: HTMLElement[]
  }
  excludes: HTMLElement[]
  remove: string[]
  hide: string[]
  grayBlock: string[]
  /**
   * @type {boolean}
   * @default false
   * @description 是否跳过Base64
   */
  skipBase64: boolean
  /**
   * @type {boolean}
   * @default true
   * @description 是否开启animation
   */
  animation: boolean
  /**
   * @type {boolean}
   * @default false
   * @description 是否重复LI
   */
  repeatLI: boolean
  /**
   * @type {boolean}
   * @default true
   * @description 是否跳过伪类
   */
  skipPseudo: boolean
  /**
   * @type {string | 'rem' | 'vw' | 'vh' | 'vmin' | 'vmax'}
   * @default 'rem'
   * @description css单位
   */
  cssUnit: 'px' | 'rem' | 'vw' | 'vh' | 'vmin' | 'vmax' | string
  /**
   * @type {number}
   * @default '4'
   * @description 小数位
   */
  decimal: number
}

/**
 * @ignore
 */
interface DefaultObjectType {
  [propName: string]: any
}

/**
 *
 *
 * @interface options
 */
interface Options {
  /**
   * 设置puppeteer模拟的机型
   * @type {string}
   * @default 'iPhone X' 默认机型为iphone x
   * @description 可选值 [DeviceDescriptors](https://github.com/puppeteer/puppeteer/blob/main/src/common/DeviceDescriptors.ts#L30)
   */
  device?: string

  /**
   * 设置注入页面变量
   * @type {string}
   * @default '\__PRERENDER_INJECTED__\'
   * @example 可在页面中进行判断 window.\__PRERENDER_INJECTED\__ === true
   */
  injectProperty?: string

  /**
   * 设置puppeteer读取页面时的事件
   * @type {string}
   * @default 'prerender-skeleton''
   */
  renderAfterDocumentEvent?: string

  /**
   * 设置puppeteer读取页面时最长加载时间
   * @type {number}
   * @default 3000
   */
  renderAfterTime?: number

  /**
   * 设置debugger模式，在puppeteer执行的时候会抛出错误
   * @type {boolean}
   * @default false
   */
  debug?: boolean

  /**
   * 对puppeteer request 请求进行拦截
   * @type {Function}
   * @default null
   * @exampe
   *
   * ```
   *  option.requestHandle = function (request, option) {
   *     const url = request.url()
   *     const host = option.host
   *     const { port } = option
   *     const rs = /\.ihago\.net\/a\/(?!corejslib|ihago-libs).+\/(assets\/.+\/.+\..+)/.exec(url)
   *     if (rs) {
   *        return request.continue({ url: `http://${host}:${port}/${rs[1]}` })
   *     } else {
   *         return request.continue()
   *     }
   *   }
   * ```
   */
  requestHandle?: null | ((req: import('puppeteer').Request, option: Options) => Promise<void>)

  /**
   * 设置webpack output输出文件路径
   *
   * @type {string}
   * @default 'dist''
   */
  outputDir?: string

  /**
   * 设置shell输出文件路径
   * @type {string}
   * @default '/''
   */
  shellDir?: string

  /**
   * 设置入口文件名
   * @type {string}
   * @default 'index''
   */
  entryPath?: 'index'

  /**
   * 设置输出文件名
   * @type {'index'}
   * @default 'index''
   */
  outPutPath?: 'index'

  /**
   * 设置输出预渲染文件名
   * @type {string}
   * @default 'index''
   */
  shellName?: 'shell'

  /**
   * 设置多语言
   * @type {Array<string>}
   * @default []
   */
  langs?: Array<string>

  /**
   * 设置内存目录
   * @type {string}
   * @default '/__webpack_prerender_skeleton/__''
   */
  magicPath?: string

  /**
   * 设置主机地址，默认会取本机
   * @type {string}
   */
  host?: string

  /**
   * 设置端口号，默认会取随机可用端口
   * @type {number}
   */
  port?: number
  /**
   * 设置pupperteer cookies
   * @type {array}
   * @example
   * ```js
   *  option.cookies = [{
   *    'name': 'cookie1',
   *    'value': 'val1'
   *  },{
   *    'name': 'cookie2',
   *    'value': 'val2'
   *  },{
   *    'name': 'cookie3',
   *    'value': 'val3'
   *  }]
   * ```
   */
  cookies?: import('puppeteer').SetCookie[] | Function
}

/**
 * @ignore
 */
interface Sockets {
  preview?: import('sockjs').Connection[]
  dev?: import('sockjs').Connection[]
}

declare class MemoryFileSystem {
  data: any

  constructor(data?: any)

  meta(_path: string): any

  existsSync(_path: string): boolean

  statSync(
    _path: string
  ): {
    isFile: () => boolean
    isDirectory: () => boolean
    isBlockDevice: () => boolean
    isCharacterDevice: () => boolean
    isSymbolicLink: () => boolean
    isFIFO: () => boolean
    isSocket: () => boolean
  }

  readFileSync(_path: string, encoding?: string): any

  readdirSync(_path: string): string[]

  mkdirpSync(_path: string): void

  mkdirSync(_path: string): void

  _remove(_path: string, name: string, testFn: (part: string) => boolean): void

  rmdirSync(_path: string): void

  unlinkSync(_path: string): void

  readlinkSync(_path: string): string

  writeFileSync(_path: string, content: string | Buffer, encoding?: string): void

  createReadStream(
    path: string,
    options?: {
      start: number
      end: number
    }
  ): any

  createWriteStream(path: string, options?: any): any

  exists(path: string, callback: (isExist: boolean) => void): void

  writeFile(
    path: string,
    content: string | Buffer,
    callback: (err: Error | undefined) => void
  ): void

  writeFile(
    path: string,
    content: string | Buffer,
    encoding: string,
    callback: (err: Error | undefined) => void
  ): void

  join(path: string, request: string): string

  pathToArray(path: string): string[]

  normalize(path: string): string

  stat(path: string, callback: (err: Error | null, result?: any) => void): void

  readdir(path: string, callback: (err: Error | null, result?: any) => void): void

  mkdirp(path: string, callback: (err: Error | null, result?: any) => void): void

  rmdir(path: string, callback: (err: Error | null, result?: any) => void): void

  unlink(path: string, callback: (err: Error | null, result?: any) => void): void

  readlink(path: string, callback: (err: Error | null, result?: any) => void): void

  mkdir(path: string, callback: (err: Error | null) => void): void
  mkdir(path: string, optArg: {}, callback: (err: Error | null, result?: any) => void): void

  readFile(path: string, callback: (err: Error | null, result?: any) => void): void
  readFile(path: string, optArg: {}, callback: (err: Error | null, result?: any) => void): void
}

declare module 'rgbaster'
