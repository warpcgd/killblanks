/**
 * a Map instance to cache the styles which will be inserted into the skeleton page.
 * key is the selector and value is the css rules.
 */
import { CLASS_NAME_PREFEX } from '../config'

export let styleCache: DefaultObjectType = {}

// some common styles
export const shapeStyle = (shape: string) => {
  const selector = `.${CLASS_NAME_PREFEX + shape}`
  const rule = `{
    border-radius: ${shape === 'rect' ? '0' : '50%'};
  }`
  if (!styleCache[selector]) {
    styleCache[selector] = rule
  }
}

export const clearCache = () => {
  styleCache = {}
}

export const addStyle = (selector: string, rule: string) => {
  if (!styleCache[selector]) {
    styleCache[selector] = rule
  }
}
