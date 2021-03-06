<p align="center">
  <img src="./assets/killblanks-logo.png" width="300">
</p>

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme) [![GitHub license](https://img.shields.io/github/license/warpcgd/killblanks)](https://github.com/warpcgd/killblanks/blob/main/LICENSE)

> White screens have always been a major problem that has plagued the front-end when the CSR project was born. How to increase the waiting time of users, reduce the bounce rate, and improve the page performance at low cost is the front-end has been solving problems, killblanks is one This kind of solution directly generates a skeleton screen from the page node, and pre-renders the user to display the outline of the content while waiting for the content to load, providing a better user experience and making the content feel faster.

English | [中文](https://github.com/warpcgd/killblanks)

## TOC

- [TOC](#toc)
- [Frame](#frame)
- [Effect](#effect)
- [Install](#install)
- [Documentation](#documentation)
- [Use](#use)
    - [1. Installation](#1-installation)
    - [2. webpack Config](#2-webpack-config)
    - [3. Use `@killblanks/skeleton-ext`](#3-use-killblanksskeleton-ext)
    - [4. Use the generated skeleton screen components in the project](#4-use-the-generated-skeleton-screen-components-in-the-project)
    - [5. Enter `PRERENDER_SKELETON` in the browser's `console`](#5-enter-prerender_skeleton-in-the-browsers-console)
- [API](#api)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Frame

<p align="center">
  <img src="./assets/@killblanks_framework.png">
</p>

- [@kiilblank/example]('./packages/example') Skeleton screen demo
- [@kiilblank/prerender]('./packages/prerender')Pre-rendering tools
- [@kiilblank/skeleton]('./packages/skeleton') Skeleton screen core code
- [@kiilblank/skeleton-chrome-ext]('./packages/skeleton-chrome-ext') Skeleton screen chrome plug-in

## Effect

<p align="center">
  <img src="./assets/preview.gif" width="150" />
</p>

## Install

`@kiilblank` uses lerna for package management, you can run the following commands to build the project

1. Installation dependencies

```
  yarn bootstrap
```

2. Start listening

```
  yarn watch
```

3. Start the development environment

```
  yarn dev
```

4. Build

```
  yarn build
```

## Documentation

- [Guides](https://warpcgd.github.io/killblanks/guides/)
- [Demo](https://warpcgd.github.io/killblanks/demos/)

## Use

@kiilblank mainly uses @kiilblank/prerender and @kiilblank/skeleton-chrome-ext in the project

#### 1. Installation

```sh
  yarn add @killblanks/prerender -D
```

#### 2. webpack Config

```ts
// webpack.config.js
const prerender = require('@killblanks/prerender')

export default {
  ...
  plugins: [new prerender()]
  ...
}
```

- For detailed configuration, please see [@killblanks/prerender](https://warpcgd.github.io/killblanks/en/guides/prerender/)

#### 3. Use `@killblanks/skeleton-ext`

- For detailed configuration, please see [@killblanks/skeleton-ext](https://warpcgd.github.io/en/killblanks/guides/skeleton-ext/)

#### 4. Use the generated skeleton screen components in the project

- Like what is done in [DEMO](https://github.com/warpcgd/killblanks/blob/main/packages/docs%26demo/docs/.vuepress/components/effect/basic/index.vue)

#### 5. Enter `PRERENDER_SKELETON` in the browser's `console`

```sh
 Enter `PRERENDER_SKELETON` in the Chrome console to start the skeleton screen preview
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
