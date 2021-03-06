<p align="center">
  <img src="./assets/killblanks-logo.png" width="300">
</p>

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme) [![GitHub license](https://img.shields.io/github/license/warpcgd/killblanks)](https://github.com/warpcgd/killblanks/blob/main/LICENSE)

> 白屏一直是 CSR 项目诞生来困扰前端的一大问题，如何在低成本的情况下，增加用户的等待时间，减少跳出率，以及提高页面性能，是前端一直在解决的难题，killblanks 作为其中一种的解决方案，将页面节点直接生成骨架屏，通过预渲染让用户能在等待内容加载时显示内容的轮廓，提供了更好的用户体验，并使内容感觉更快。

中文 | [English](https://github.com/warpcgd/killblanks/blob/main/README_EN.md)

## 目录

- [目录](#目录)
- [框架](#框架)
- [效果](#效果)
- [安装](#安装)
- [文档](#文档)
- [使用](#使用)
    - [1. 安装](#1-安装)
    - [2. 配置 webpack](#2-配置-webpack)
    - [3. 使用`@killblanks/skeleton-ext`](#3-使用killblanksskeleton-ext)
    - [4. 将生成的骨架屏组件使用在项目中](#4-将生成的骨架屏组件使用在项目中)
    - [5. 在浏览器的`console`输入`PRERENDER_SKELETON`](#5-在浏览器的console输入prerender_skeleton)
- [API](#api)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## 框架

<p align="center">
  <img src="./assets/@killblanks_framework.png">
</p>

- [@kiilblank/example]('./packages/example') 骨架屏 demo
- [@kiilblank/prerender]('./packages/prerender') 预渲染工具
- [@kiilblank/skeleton]('./packages/skeleton') 骨架屏核心代码
- [@kiilblank/skeleton-chrome-ext]('./packages/skeleton-chrome-ext') 骨架屏 chrome 插件

## 效果

<p align="center">
  <img src="./assets/preview.gif" width="150" />
</p>

## 安装

@kiilblank 使用 lerna 进行包管理，可以运行以下指令构建项目

1. 安装依赖

```
  yarn bootstrap
```

2. 启动监听

```
  yarn watch
```

3. 启动开发环境

```
  yarn dev
```

4. 打包

```
  yarn build
```

## 文档

- [Guides](https://warpcgd.github.io/killblanks/guides/)
- [Demo](https://warpcgd.github.io/killblanks/demos/)

## 使用

@kiilblank 在项目中主要使用@kiilblank/prerender 和@kiilblank/skeleton-chrome-ext

#### 1. 安装

```sh
  yarn add @killblanks/prerender -D
```

#### 2. 配置 webpack

```ts
// webpack.config.js
const prerender = require('@killblanks/prerender')

export default {
  ...
  plugins: [new prerender()]
  ...
}
```

- 详细步骤请查看[@killblanks/prerender](https://warpcgd.github.io/killblanks/guides/prerender/)

#### 3. 使用`@killblanks/skeleton-ext`

- 详细步骤请查看[@killblanks/skeleton-ext](https://warpcgd.github.io/killblanks/guides/skeleton-ext/)

#### 4. 将生成的骨架屏组件使用在项目中

- 像[DEMO](https://github.com/warpcgd/killblanks/blob/main/packages/docs%26demo/docs/.vuepress/components/effect/basic/index.vue)中所做的一样

#### 5. 在浏览器的`console`输入`PRERENDER_SKELETON`

```sh
 在Chrome console中输入`PRERENDER_SKELETON`启动骨架屏预览
```

## API

- [@kiilblank/prerender]('./packages/prerender')

- [@kiilblank/skeleton]('./packages/skeleton')

## Maintainers

[@warpcgd](https://github.com/warpcgd)

## Contributing

- Fork it!
- Create your feature branch: `git checkout -b my-new-feature`
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request to branch `dev`

## License

[Apache-2.0]('./LICENSE') © 2021 lixichen
