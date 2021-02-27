---
sidebar: auto
---

# options

## device

```ts
/**
   * 设置puppeteer模拟的机型
   * @type {string}
   * @default 'iPhone X' 默认机型为iphone x
   * @description 可选值 [DeviceDescriptors](https://github.com/puppeteer/puppeteer/blob/main/src/common/DeviceDescriptors.ts#L30)
  /**
```

## injectProperty

```ts
/**
 * 设置注入页面变量
 * @type {string}
 * @default '\__PRERENDER_INJECTED__\'
 * @example 可在页面中进行判断 window.\__PRERENDER_INJECTED\__ === true
/**
```

## renderAfterDocumentEvent

```ts
/**
 * 设置puppeteer读取页面时的事件
 * @type {string}
 * @default 'prerender-skeleton''
/**
```

## renderAfterTime

```ts
/**
 * 设置puppeteer读取页面时最长加载时间
 * @type {number}
 * @default 3000
/**
```

## debug

```ts
/**
 * 设置debugger模式，在puppeteer执行的时候会抛出错误
 * @type {boolean}
 * @default false
/**
```

## requestHandle

````ts
/**
 * 对puppeteer request 请求进行拦截
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
   *        return request.continue()
   *     }
   *   }
   * ```
/**
````

## outputDir

```ts
/**
 * 设置webpack output输出文件路径
 *
 * @type {string}
 * @default 'dist''
/**
```

## shellDir

```ts
/**
 * 设置shell输出文件路径
 * @type {string}
 * @default '/''
/**
```

## entryPath

```ts
/**
 * 设置入口文件名
 * @type {string}
 * @default 'index''
/**
```

## outPutPath

```ts
/**
 * 设置输出文件名
 * @type {'index'}
 * @default 'index''
/**
```

## shellName

```ts
/**
 * 设置输出预渲染文件名
 * @type {string}
 * @default 'index''
/**
```

## langs

```ts
/**
 * 设置多语言
 * @type {Array<string>}
 * @default []
/**
```

## magicPath

```ts
/**
 * 设置内存目录
 * @type {string}
 * @default '/__webpack_prerender_skeleton/__''
/**
```

## mod

```ts
/**
 * 设置预渲染模式, 可以传`object`，会和`default`模式做深度合并
 * @type {('default' | 'automatic' |object)}
 * @default 'default''
/**
```

## host

```ts
/**
 * 设置主机地址，默认会取本机
 * @type {string}
/**
```

## port

```ts
/**
 * 设置端口号，默认会取随机可用端口
 * @type {number}
/**
```

## cookies

````ts
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
/**
````
