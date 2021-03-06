---
sidebar: auto
---

# @killblanks/skeleton Configuration

## text

Elements of type `Node.TEXT_NODE` will undergo skeleton conversion

### color

- Type：`string` | `'automatic'`
- Default: `#EFEFEF`

```ts
options = {
  text: {
    color: '#EFEFEF'
  }
}
```

Set the color of the `text` text element

---

## image

Images with `tagName` as `IMG` or with content of `Base64` will undergo skeleton conversion

### shape

- Type：`rect` | `circle`
- Default: `rect`

Set the shape of the picture after conversion

### color

- Type：`string` | `'automatic'`
- Default: `#EFEFEF`

Set the color of the picture after conversion

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

Elements with `tagName` as `BUTTON` will undergo skeleton transformation

### color

- Type：`string`
- Default: `#EFEFEF`

Set button conversion color

---

## svg

Elements with `tagName` as `svg` will undergo skeleton transformation

### color

- Type：`string`
- Default: `#EFEFEF`

Set the color of `svg` element conversion

### shape

- Type：`rect` | `circle`
- Default: `rect`

Set the shape of `svg` element transformation

---

## pseudo

Pseudo-class ('::before'|'::after') elements will undergo skeleton transformation

### color

- Type：`string`
- Default: `#EFEFEF`

Set the color of pseudo element conversion

### shape

- Type：`rect` | `circle`
- Default: `rect`

Set the shape of pseudo element transformation

---

## skipBase64

- Type：`boolean`
- Default: `false`

Set whether to perform pseudo-class element conversion

## skipPseudo

Set whether to skip pseudo-classes

- Type：`boolean`
- Default: `true`

## animation

Set whether to show animation

- Type：`boolean`
- Default: `true`

## repeatLI

Set whether to repeat `<li></li>` element

- Type：`boolean`
- Default: `false`

## cssUnit

Set the unit of css after conversion

- Type：`'px' | 'rem' | 'vw' | 'vh' | 'vmin' | 'vmax'`
- Default: `px`
