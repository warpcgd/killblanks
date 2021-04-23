---
sidebar: auto
sidebarDepth: 3
---

# @killblanks/prerender Configuration

## Basic configuration

### entryPath

- Types：`string`
- Default：`index`

Set the name of the HTML file that `production environment` requires `pre-rendering`, the folder address is specified by [outputDir](#outputDir)

### outputDir

- Types：`string`
- Default：`dist`

Set the folder where the pre-rendered files packaged in the `production environment`, and the root directory is the project address

### outPutPath

- Types：`string`
- Default：`index`

Set the file name of the pre-rendered file packaged in the `production environment`

```ts
// Related code
fs.writeFileSync(path.resolve(cwd, outputDir, outputPath), newHtml, 'utf8')
```

### host

- Types：`string`

Set the host address where the pre-rendering sock service is started, the local address will be obtained by default

### port

- Types：`number`

Set the host port for the pre-rendering sock service to start, the random port will be free by default

### magicPath

- Types：`string`
- Default：`__webpack_prerender_skeleton__`

Set the memory directory written by the `development environment` pre-rendering, generally do not need to be modified

```ts
// Related code
const { magicPath } = option
const pathName = path.resolve(__dirname, '../', magicPath)
myFs.mkdirpSync(pathName)
myFs.writeFileSync(path.join(pathName, fileName), html, 'utf8')
```

---

## Advanced Configuration

### debug

- Types：`boolean`
- Default: false

Set the debugger mode, an error will be thrown when puppeteer is executed

### requestHandle

- Types：`requestHandle(request:Function, option: Options): Promise<void>`

When `puppeteer` loads HTML, all requested `intercept hook` functions must return `request.continue()`

Used to deal with issues such as `cdn` resources in the production environment

```ts
// example
option.requestHandle = function(request, option) {
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
```

### langs

- Types：`Array<string>`
- Default: `[]`

Set pre-rendered multi-language, configure when you need to pre-render multiple country pages separately, no configuration is required by default

- `puppeteer` load address logic

```ts
const langPath = lang && lang.length ? `?lang=${lang}` : ''
const url = `http://${host}:${port}/${entryPath}.html${langPath}`
```

- Logic for outputting pre-rendered files

```ts
const outputPath = lang && lang.length ? `${outPutPath}.${lang}.html` : `${outPutPath}.html`
fs.writeFileSync(path.resolve(cwd, outputDir, outputPath), newHtml, 'utf8')
```

- demo

```ts
// When langs is configured, the output files are index.zh.html and index.en.html
config.plugin('prerender').use(prerender.default, [
  {
    langs: ['zh', 'en']
  }
])
```

### device

- Types：`string`
- Default: 'iPhone X',

Set the device to be simulated by `puppeteer`, optional value [device](https://github.com/puppeteer/puppeteer/blob/main/src/common/DeviceDescriptors.ts)

### injectProperty

- Types：`string`
- Default: '\_\_PRERENDER_INJECTED\_\_\'

Set the variable name of the pre-rendered page inserted into `window`, you can make logical judgments on `window.__PRERENDER_INJECTED__` anywhere in your project

```ts
if (window.__PRERENDER_INJECTED__) {
  console.log('This page is a pre-rendered page')
}
```

### renderAfterDocumentEvent

- Types：`string`
- Default: 'prerender-skeleton'

Set `puppeteer` to get the event when the HTML source code is available. If the event is not received, it will wait for [renderAfterTime](#renderAfterTime) to get the `HTML`

```ts
  // You can dispatch the event in the mouted event
  ...
    mounted() {
      document.dispatchevent(new CustomerEvent('prerender-skeleton'))
    }
  ...
```

### renderAfterTime

- Types：`number`
- Default: 3000

Set the maximum load time when `puppeteer` reads the page

### cookies

Set `puppeteer` cookies, see [pagecookiesurls](https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#pagecookiesurls) for specific parameters

```ts
option.cookies = [
  {
    name: 'cookie1',
    value: 'val1'
  },
  {
    name: 'cookie2',
    value: 'val2'
  },
  {
    name: 'cookie3',
    value: 'val3'
  }
]
```
