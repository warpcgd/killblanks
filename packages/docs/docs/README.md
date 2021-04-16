---
home: true
heroText: null
tagline: null
---

<common-home></common-home>

::: slot features

<div class="feature">
  <h2>简单配置⚙️</h2>
  <p>通过简单的配置即可为页面添加预渲染和骨架屏</p>
</div>
<div class="feature">
  <h2>预渲染+骨架屏💀</h2>
  <p>你可以只使用预渲染，也可以预渲染+骨架屏组合使用</p>
</div>
<div class="feature">
  <h2>提升页面性能⚡</h2>
  <p>通过使用预渲染和骨架屏可以明显提升页面FCP和LCP</p>
</div>

:::

::: slot startDemo

### 1. 安装

```sh
  yarn add @killblanks/prerender -D
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

- 更多配置请查看[@killblanks/prerender](./guides/prerender/)

### 3. 使用`@killblanks/skeleton-ext`

- 更多配置请查看[@killblanks/skeleton-ext](./guides/skeleton-ext/)

### 4. 将生成的骨架屏组件使用在项目中

- 比如像[DEMO](https://github.com/warpcgd/killblanks/blob/main/packages/docs%26demo/docs/.vuepress/components/effect/basic/index.vue)中所做的一样

### 5. 在浏览器的`console`启用`PRERENDER_PREVIEW`

```sh
 在Chrome console中输入`PRERENDER_PREVIEW`启动骨架屏预览
```

:::
