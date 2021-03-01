# @kiilblank

![logo](./assets/killblanks-logo.png.png)

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> 白屏一直是 spa 应用诞生来困扰用户的一大问题，如何在低成本的情况下，增加用户的等待时间，减少跳出率？ @killblank 作为一种解决方案，将在等待内容加载时显示内容的轮廓。与传统的 loading 相比，它提供了更好的用户体验，并使内容感觉更快。

## 你将会用到

- [@kiilblank/example]('./packages/example') 骨架屏 demo
- [@kiilblank/prerender]('./packages/prerender') 预渲染工具
- [@kiilblank/skeleton]('./packages/skeleton') 骨架屏核心代码
- [@kiilblank/skeleton-chrome-ext]('./packages/skeleton-chrome-ext') 骨架屏 chrome 插件

## 目录

- [@kiilblank](#kiilblank)
  - [你将会用到](#你将会用到)
  - [目录](#目录)
  - [Install](#install)
  - [Usage](#usage)
  - [API](#api)
  - [Maintainers](#maintainers)
  - [Contributing](#contributing)
  - [License](#license)

## Install

@kiilblank 使用 lerna 进行包管理，可以运行以下指令构建项目

1. 安装依赖

```
  npm run bootstrap
```

2. 启动监听

```
  npm run watch
```

3. 启动开发环境

```
  npm run dev
```

## Usage

1. @kiilblank 在项目中主要使用@kiilblank/prerender 和@kiilblank/skeleton-chrome-ext

首先，安装@kiilblank/prerender

```
npm i @kiilblank/prerender -D
```

2. webpack.config.js

```
<!-- webpack.config.js -->

const prerender = require('@killblanks/prerender')

export default {
  mode: 'xxx',
  entry: {},
  output: {},
  plugins: [new prerender()]
}


```

2. Chrome 上搜索并安装@kiilblank

3. 在页面中打开`检查`

4. 使用@kiilblank/skeleton

5. 在项目中使用@kiilblank/skeleton 生成的模版

6. 运行项目

7. 在 Console 中`输入PRENDER_SKELETON`打开预览

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
- Submit a pull request

## License

[Apache-2.0]('./LICENSE') © 2021 lixichen
