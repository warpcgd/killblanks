---
sidebar: auto
sidebarDepth: 3
---
# @killblanks/prerender 配置
## 基本配置

### entryPath

- 类型：`string`
- 默认值：`index`

设置`生产环境`需要`预渲染`的HTML文件名，文件夹地址由[outputDir](#outputDir)指定

### outputDir

- 类型：`string`
- 默认值：`dist`

设置`生产环境`打包的预渲染文件到哪个文件夹,根目录为项目地址

### outPutPath

- 类型：`string`
- 默认值：`index`

设置`生产环境`打包的预渲染文件的文件名

```ts
  // 相关代码
  fs.writeFileSync(path.resolve(cwd, outputDir, outputPath), newHtml, 'utf8')
```

### host

- 类型：`string`

设置预渲染sock服务启动的主机地址，默认会获取本机地址

### port

- 类型：`number`

设置预渲染sock服务启动的主机端口，默认会空闲随机端口

### magicPath

- 类型：`string`
- 默认值：`__webpack_prerender_skeleton__`

设置`开发环境`预渲染写入的内存目录,一般不需要修改

```ts
  // 相关代码
  const { magicPath } = option
  const pathName = path.resolve(__dirname, '../', magicPath)
  myFs.mkdirpSync(pathName)
  myFs.writeFileSync(path.join(pathName, fileName), html, 'utf8')
```

---
## 进阶配置

### debug

- 类型：`boolean`
- 默认值: false

设置debugger模式，在puppeteer执行的时候会抛出错误

### requestHandle

- 类型：`requestHandle(request:Function, option: Options): Promise<void>`

`puppeteer`在加载HTML时，所有请求的`拦截钩子`函数，必须返回`request.continue()`

用于处理生产环境`cdn`资源等问题

````ts
// example
option.requestHandle = function (request, option) {
  const url = request.url()
  const host = option.host
  const { port } = option
  const rs = /\.ihago\.net\/a\/(?!corejslib|ihago-libs).+\/(assets\/.+\/.+\..+)/.exec(url)
  if (rs) {
      return request.continue({ url: `http://${host}:${port}/${rs[1]}` })
  } else {
      return request.continue()
  }
}
````

### langs

- 类型：`Array<string>`
- 默认值: `[]`

设置预渲染的多语言，当你需要对多个国家页面分别进行预渲染时配置，默认不需要配置

- `puppeteer`加载地址的逻辑

```ts
  const langPath = lang && lang.length ? `?lang=${lang}` : ''
  const url = `http://${host}:${port}/${entryPath}.html${langPath}`
```
- 输出预渲染文件的逻辑

```ts
 const outputPath = lang && lang.length ? `${outPutPath}.${lang}.html` : `${outPutPath}.html`
 fs.writeFileSync(path.resolve(cwd, outputDir, outputPath), newHtml, 'utf8')
```

- demo

```ts
  // 当配置了langs时，输出文件为index.zh.html和index.en.html
  config.plugin('prerender').use(prerender.default, [
    {
      langs: ['zh', 'en']
    }
  ])
```

### device

- 类型：`string`
- 默认值: 'iPhone X',

设置`puppeteer`需要模拟的设备，可选值[device](https://github.com/puppeteer/puppeteer/blob/main/src/common/DeviceDescriptors.ts)

### injectProperty

- 类型：`string`
- 默认值: '\__PRERENDER_INJECTED__\'

设置预渲染页面插入`window`中的变量名称，你可以在自己项目的任意地方对`window.__PRERENDER_INJECTED__`做逻辑判断

```ts
if (window.__PRERENDER_INJECTED__) {
  console.log('这个页面是预渲染页面')
}
```

### renderAfterDocumentEvent

- 类型：`string`
- 默认值: 'prerender-skeleton'

设置`puppeteer`可以获取HTML源码时的事件，如果未收到事件会等待[renderAfterTime](#renderAfterTime)后，获取源码

```ts
  // 你可以在mouted事件中，派发事件
  ...
    mounted() {
      document.dispatchevent(new CustomerEvent('prerender-skeleton'))
    }
  ...
```

### renderAfterTime

- 类型：`number`
- 默认值: 3000

设置`puppeteer`读取页面时最长加载时间


### cookies

设置`puppeteer`cookies, 具体参数可查看[pagecookiesurls](https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#pagecookiesurls)

````ts
option.cookies = [{
  'name': 'cookie1',
  'value': 'val1'
  },{
  'name': 'cookie2',
  'value': 'val2'
  },{
  'name': 'cookie3',
  'value': 'val3'
}]
````
