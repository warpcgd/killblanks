import { addClassName, hashCode } from '../util'
export const addRootHashClass = (ele: HTMLElement) => {
  const outerHTML = ele.outerHTML
  const hash = hashCode(outerHTML)
  const className = `skeleton--${hash}`
  addClassName(ele, [className])
  return className
}
