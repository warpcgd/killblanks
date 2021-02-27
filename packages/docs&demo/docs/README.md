---
home: true
heroText: null
tagline: null
---

<common-home></common-home>

::: slot startDemo

### 1. 安装

```sh
  npm i @kiilblank/prerender -D
```

### 2. 配置

```ts
// webpack.config.js
const prerender = require('@killblanks/prerender')

export default {
  ...
  plugins: [new prerender()]
  ...
}
```

### 3. 使用`@killblanks/skeleton-ext`

### 4. 启用`PRERENDER_SKELETON`

```sh
 1. 在Chrome console中输入`PRERENDER_SKELETON`启动骨架屏预览
```

:::
