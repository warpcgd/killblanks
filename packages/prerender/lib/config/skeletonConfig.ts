import Merge from 'lodash/merge'

export const defaultMod = {
  name: 'default',
  text: {
    color: '#EFEFEF'
  },
  loading: 'spin',
  image: {
    // `rect` | `circle`
    shape: 'rect',
    color: '#FFFFFF',
    shapeOpposite: [] as HTMLElement[]
  },
  button: {
    color: '#EFEFEF',
    excludes: [] as HTMLElement[]
  },
  svg: {
    // or transparent
    color: '#EFEFEF',
    // circle | rect
    shape: 'circle',
    shapeOpposite: [] as HTMLElement[]
  },
  pseudo: {
    // or transparent
    color: '#EFEFEF',
    // circle | rect
    shape: 'circle',
    shapeOpposite: [] as HTMLElement[]
  },
  excludes: [] as HTMLElement[],
  remove: [] as string[],
  hide: [] as string[],
  grayBlock: [] as string[],
  skipBase64: true,
  // or 'vw|vh|vmin|vmax'
  cssUnit: 'rem',
  decimal: 4
}

export const automaticMod = Merge({}, defaultMod, {
  name: 'automatic',
  image: {
    color: 'automatic'
  }
})

export default {
  default: defaultMod,
  automatic: automaticMod
}
