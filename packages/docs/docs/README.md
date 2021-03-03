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

### 4. 将生成的骨架屏组件使用在项目中

比如像[DEMO](https://github.com/warpcgd/killblanks/blob/main/packages/docs%26demo/docs/.vuepress/components/effect/basic/index.vue)中所做的一样

### 5. 在浏览器的`console`启用`PRERENDER_SKELETON`

```sh
 1. 在Chrome console中输入`PRERENDER_SKELETON`启动骨架屏预览
```

:::
