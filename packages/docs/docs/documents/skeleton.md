---
sidebar: auto
---

# @killblanks/skeleton 配置

## text

类型为`Node.TEXT_NODE`的元素会进行骨架转换


### color

- 类型：`string` | `'automatic'`
- 默认值: `#EFEFEF`

```ts
  options = {
    text: {
      color: '#EFEFEF'
    }
  }
```

设置`text`文本元素的颜色

---
## image

`tagName`为`IMG`,或者内容为`Base64`的图片会进行骨架转换

### shape

- 类型：`rect` | `circle`
- 默认值: `rect`

设置图片转换后的形状

### color

- 类型：`string` | `'automatic'`
- 默认值: `#EFEFEF`

设置图片转换后的颜色

```ts
  options = {
    image: {
      shape: 'rect',
      color: '#EFEFEF'
    }
  }
```

---

## button

`tagName`为`BUTTON`的元素会进行骨架转换

### color

- 类型：`string`
- 默认值: `#EFEFEF`

设置按钮转换颜色

---

## svg

`tagName`为`svg`的元素会进行骨架转换

### color

- 类型：`string`
- 默认值: `#EFEFEF`

设置svg元素转换的颜色

### shape

- 类型：`rect` | `circle`
- 默认值: `rect`

设置svg元素转换的形状

---

## pseudo

伪类('::before'| '::after')元素会进行骨架转换

### color

- 类型：`string`
- 默认值: `#EFEFEF`

设置伪类元素转换的颜色

### shape

- 类型：`rect` | `circle`
- 默认值: `rect`

设置伪类元素转换的形状

---

## skipBase64

- 类型：`boolean`
- 默认值: `false`

设置是否进行伪类元素转换

## skipPseudo

设置是否跳过伪类

- 类型：`boolean`
- 默认值: `true`

## animation

设置是否显示动画

- 类型：`boolean`
- 默认值: `true`
## repeatLI

设置是否重复`<li></li>`元素

- 类型：`boolean`
- 默认值: `false`

## cssUnit

设置转换后css的单位

- 类型：`'px' | 'rem' | 'vw' | 'vh' | 'vmin' | 'vmax'`
- 默认值: `px`

