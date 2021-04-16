---
sidebarDepth: 2
---

## Background

> Pre-rendering is the core of solving the white screen problem. Reading the request content through `Purpeteer` can directly output the `html` with more content, thereby eliminating the white screen.

## Principle

Use `Purpeteer` to simulate the function of the browser requesting the page. After the page onload is successful, read and output html

## Frame

![@killblanks_prerender_framework](./imgs/@killblanks_prerender_framework.png)

## Quick start

### 1. Install

```sh
  yarn add @killblanks/prerender -D
```

### 2. Configuration

- Webpack configuration

```ts
// webpack.config.js
const prerender = require('@killblanks/prerender')

export default {
  ...
  plugins: [new prerender()]
  ...
}
```

- vue-cli configuration

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

For detailed parameters, please see [prerender](../../documents/prerender)

### 3. Run

- Start the development environment
- Seeing `prerender server listen at port:xxxx`, it runs successfully

```bash
...
  prerederSkeleton: prerender server listen at port:xxxx
...

```

### 4. Preview

- Open the local page launched by the development environment
- Open `dev-tools` and enter the console
- Enter `PRERENDER_PREVIEW` to preview in real time. When you need to update the skeleton screen page, please click the `refresh` button in the upper right corner
