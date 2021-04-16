## 背景

> 预渲染是解决白屏问题的核心，通过`Purpeteer`读取请求内容，能直出有更多内容的`html`,从而干掉白屏

中文 | [English](https://github.com/warpcgd/killblanks/blob/main/packages/prerender/README_EN.md)

## 原理

利用`Purpeteer`能模拟浏览器请求页面的功能，在页面 onload 成功后，读取并输出 html

## 框架

![@killblanks_prerender_framework](./assets/@killblanks_prerender_framework.png)

## 快速开始

### 1. 安装

```sh
  npm i @kiilblank/prerender -D
```

### 2. 配置

- webpack 配置

```ts
// webpack.config.js
const prerender = require('@killblanks/prerender')

export default {
  ...
  plugins: [new prerender()]
  ...
}
```

- vue-cli 配置

```ts
// vue.config.js
module.exports = {
  ...
  chainWebpack: config => {
    const prerender = require('@killblanks/prerender')
    config.plugin('prerender').use(prerender.default, [])
  }
  ...
}
```

详细参数请查看[prerender](https://warpcgd.github.io/killblanks/documents/prerender.html)

### 3. 运行

- 启动开发环境
- 看到`prerender server listen at port:xxxx`即成功运行

```bash
...
  prerederSkeleton: prerender server listen at port:xxxx
...

```

### 4. 预览

- 打开开发环境启动的本地页面
- 开启`dev-tools`,进入 console
- 输入`PRERENDER_PREVIEW`，即可实时预览，需要更新骨架屏页面时，请点击右上角`refresh`按钮
