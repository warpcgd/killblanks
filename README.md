<p align="center">
  <img src="./assets/killblanks-logo.png" width="300">
</p>

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> 白屏一直是 spa 应用诞生来困扰用户的一大问题，如何在低成本的情况下，增加用户的等待时间，减少跳出率？ @killblank 作为一种解决方案，将在等待内容加载时显示内容的轮廓。与传统的 loading 相比，它提供了更好的用户体验，并使内容感觉更快。

## 目录

- [Kiilblanks](#kiilblanks)
  - [目录](#目录)
  - [你将会用到](#你将会用到)
  - [安装](#安装)
  - [文档](#文档)
  - [使用](#使用)
  - [API](#api)
  - [Maintainers](#maintainers)
  - [Contributing](#contributing)
  - [License](#license)

## 你将会用到

- [@kiilblank/example]('./packages/example') 骨架屏 demo
- [@kiilblank/prerender]('./packages/prerender') 预渲染工具
- [@kiilblank/skeleton]('./packages/skeleton') 骨架屏核心代码
- [@kiilblank/skeleton-chrome-ext]('./packages/skeleton-chrome-ext') 骨架屏 chrome 插件

## 安装

@kiilblank 使用 lerna 进行包管理，可以运行以下指令构建项目

1. 安装依赖

```
  npm bootstrap
```

2. 启动监听

```
  npm watch
```

3. 启动开发环境

```
  npm dev
```

4. 打包

```
  yarn build
```

## 文档

- [文档](https://warpcgd.github.io/killblanks/guides/)
- [demo](https://warpcgd.github.io/killblanks/demos/)

## 使用

@kiilblank 在项目中主要使用@kiilblank/prerender 和@kiilblank/skeleton-chrome-ext

#### 1. 安装

```sh
  npm i @kiilblank/prerender -D
```

#### 2. 配置webpack

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

- [DEMO](https://github.com/warpcgd/killblanks/blob/main/packages/docs%26demo/docs/.vuepress/components/effect/basic/index.vue)中所做的一样

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
