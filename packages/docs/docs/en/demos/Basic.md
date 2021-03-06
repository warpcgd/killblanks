---
sidebar: false
---

<common-demoItem></common-demoItem>
::: slot name
Basic
:::

::: slot content
<common-demoCode>
<effect-basic-index></effect-basic-index>

  <div slot="codeText">

```js
// index.vue
<template>
  <div class="container">
    <skeleton :show="!!filterProductList.length">
      <div class="productionList">
        <div v-for="(item, key) in filterProductList" :key="item.goods_id + key" class="production">
          xxx
        </div>
      </div>
    </skeleton>
  </div>
</template>

<script>
import skeleton from './skeleton'
export default {
  components: {
    skeleton
  },
  data: () => {
    return {
      filterProductList: []
    }
  },
  mounted() {
    setTimeout(() => {
      const res = JSON.parse(
        `{"goods_id":"5e7d6d331d41c801b95f594f","name":"skeleton-test","photo":"https://o-static.ihago.net/ikxd/e62403ac0d365c57b4dbc1a0ab7e9cf4/128.png","svga_photo":"","tag":"new","type":1,"type":1805,"real_price":199,"price":299,"discount":8000,"update_time":1594695268}`
      )
      this.filterProductList = Array(10).fill(res)
    }, 3000)
  }
}
</script>
```

```js
// skeleton.vue
  <script>
import Vue from 'vue'
const skeletonLoader = {
  name: 'skeletocnLoader',
  functional: true,
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  render(h, context) {
    const { show } = context.props
    if (!show || window.__PRERENDER_INJECTED__) {
      const html = `<div>xxx</div>`
      const component = Vue.compile(html)
      return h(component)
    } else {
      return context.children[0]
    }
  }
}
export default skeletonLoader
</script>
```

  </div>
</common-demoCode>

### Overview

1. 使用 @killblanks/skeleton-ext 生成 skeleton 文件
2. 在目标文件中引入 skeleton 文件
3. 通过 prop show 控制是否显示 skeleton

完整代码可以查看[DEMO](https://github.com/warpcgd/killblanks/blob/main/packages/docs%26demo/docs/.vuepress/components/effect/basic/index.vue)
:::

```

```
