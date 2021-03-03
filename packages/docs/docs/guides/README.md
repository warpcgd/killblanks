---
sidebarDepth: 3
---

## 背景

> 白屏一直是 spa 应用诞生来困扰用户的一大问题，如何在低成本的情况下，增加用户的等待时间，减少跳出率？ @killblank 作为一种解决方案，将在等待内容加载时显示内容的轮廓。与传统的 loading 相比，它提供了更好的用户体验，并使内容感觉更快。

## 原理

利用`Purpeteer`能模拟浏览器请求页面的功能，加载`@killblanks/skeleton-ext`生成骨架屏组件的页面，直出 `html` 文件

## 框架

<p align="center">
  <img src="./imgs/@killblanks_framework.png" />
</p>

## 效果

<p align="center">
  <img src="./imgs/preview.gif" width="300" />
</p>

## 快速开始

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
- 详细步骤请查看[@killblanks/prerender](./prerender/)

#### 3. 使用`@killblanks/skeleton-ext`

- 详细步骤请查看[@killblanks/skeleton-ext](./skeleton-ext/)

## 性能

#### 数据来源:

利用公司在印度尼西亚上线的活动，进行 abtest 得出相关数据

#### 数据:

| type        | total | fcp | lcp |
| ----------- | :---: | --: | --: |
| @killblanks | 1532  | 536 | 661 |
| Normal      | 1730  | 990 | 993 |

#### [First-contentful-paint(fcp)](https://github.com/w3c/paint-timing)

<p align="center">
  <img src="./imgs/fcp.png" />
</p>

- FCP 平均值对比：536 : 990 @killblanks 能提升`454ms`, 平均提高`45%`

#### [Largest-contentful-paint(lcp)](https://github.com/WICG/largest-contentful-paint)

<p align="center">
  <img src="./imgs/lcp.png" />
</p>


- LCP 平均值对比：661 : 993 @killblanks 能提升`332ms`, 平均提高`33.4%`
