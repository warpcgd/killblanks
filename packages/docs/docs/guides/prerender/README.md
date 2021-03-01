---
sidebarDepth: 2
---

## 介绍

### 背景

> 预渲染是解决白屏问题的核心，通过`Purpeteer`读取请求内容，能直出有更多内容的`html`,从而干掉白屏

### 原理

利用`Purpeteer`能模拟浏览器请求页面的功能，在页面 onload 成功后，读取并输出 html

### 框架

![@killblanks_prerender_framework](./imgs/@killblanks_prerender_framework.png)

### 快速开始

#### 1. 安装

```sh
  npm i @kiilblank/prerender -D
```

#### 2. 配置

```ts
// webpack.config.js
const prerender = require('@killblanks/prerender')

export default {
  ...
  plugins: [new prerender()]
  ...
}
```

详细配置请查看[prerender](../../documents/prerender)
