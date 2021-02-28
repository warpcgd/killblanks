---
sidebarDepth: 2
---

## 介绍

### 背景

> 预渲染提供的功能仅仅只能解决白屏问题，但是这个内容实际上仅仅是 css 和 html 生成的框架，存在页面的结构和实际不符合，空白过多等问题

### 原理

基于[一种自动化生成骨架屏的方案](https://github.com/Jocs/jocs.github.io/issues/22)，我魔改了[skeleton](https://github.com/ElemeFE/page-skeleton-webpack-plugin/tree/master/src/script)代码，当谷歌插件加载后，注入进页面中，运行`outputSkeleton`，即可拿到骨架屏的 html&css

### 框架

![@killblanks_skeleleton_ext_framework](./imgs/@killblanks_skeleleton_ext_framework.png)

### 快速开始

#### 1. 安装

```sh
  npm i @kiilblank/prerender -D
```

#### 2. 使用

```ts
// webpack.config.js
const prerender = require('@killblanks/prerender')

export default {
  ...
  plugins: [new prerender()]
  ...
}
```
