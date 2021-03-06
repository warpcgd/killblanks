---
home: true
heroText: null
tagline: null
---

<common-home></common-home>

::: slot features

<div class="feature">
  <h2>Simple configuration⚙️</h2>
  <p>Pre-rendering and skeleton screen can be added to the page through simple configuration</p>
</div>
<div class="feature">
  <h2>Prerendered + skeleton💀</h2>
  <p>You can use only pre-rendering or a combination of pre-rendering + skeleton screen</p>
</div>
<div class="feature">
  <h2>Improve performance⚡</h2>
  <p>By using pre-rendering and skeleton screens, the page FCP and LCP can be significantly improved</p>
</div>

:::

::: slot startDemo

### 1. Install

```sh
  yarn add @killblanks/prerender -D
```

### 2. Config

```ts
// webpack.config.js
const prerender = require('@killblanks/prerender')

export default {
  ...
  plugins: [new prerender()]
  ...
}
```

- For more information, please check[@killblanks/prerender](./guides/prerender/)

### 3. Use `@killblanks/skeleton-ext`

- For more information, please check[@killblanks/skeleton-ext](./guides/skeleton-ext/)

### 4. Use the generated skeleton screen components in the project

- For example, like what is done in [DEMO](https://github.com/warpcgd/killblanks/blob/main/packages/docs%26demo/docs/.vuepress/components/effect/basic/index.vue)

### 5. Enter `PRERENDER_SKELETON` in the Chrome console to start the skeleton screen preview

:::
