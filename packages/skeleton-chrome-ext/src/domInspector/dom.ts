/* eslint-disable eqeqeq */
/* eslint-disable max-len */
import { mixin } from './utils'

export function isDOM(obj: HTMLElement | string): boolean {
  return (
    typeof obj === 'object' &&
    obj.nodeType === 1 &&
    typeof obj.style === 'object' &&
    typeof obj.ownerDocument === 'object'
  )
}

export function $(selector: string, parent?: HTMLElement): HTMLElement {
  if (!parent) return document.querySelector(selector)
  if (isDOM(parent)) return parent.querySelector(selector)
  return document.querySelector(selector)
}

export function addRule(selector: HTMLElement, cssObj: Record<string, any>): void {
  for (const x in cssObj) {
    if (selector.style[x as any] !== undefined) {
      selector.style[x as any] = cssObj[x]
    }
  }
}

export function findIndex(ele: Element, currentTag: string): number {
  let nth = 0
  while (ele) {
    if (ele.nodeName.toLowerCase() === currentTag) nth += 1
    ele = ele.previousElementSibling
  }
  return nth
}

function findPos(ele: HTMLElement) {
  const computedStyle = getComputedStyle(ele)
  const _x = ele.getBoundingClientRect().left - parseFloat(computedStyle['margin-left' as any])
  const _y = ele.getBoundingClientRect().top - parseFloat(computedStyle['margin-top' as any])
  // let el = ele.parentElement
  // while (el) {
  //   computedStyle = getComputedStyle(el)
  //   _x += el.getBoundingClientRect().left - parseFloat(computedStyle['margin-left' as any])
  //   _y += el.getBoundingClientRect().top - parseFloat(computedStyle['margin-top' as any])
  //   el = el.parentElement
  // }
  return {
    top: _y,
    left: _x
  }
}

/**
 * @param  { Dom Element }
 * @return { Object }
 */
export function getElementInfo(ele: HTMLElement): Record<string, any> {
  const result: Record<string, any> = {}
  const requiredValue = [
    'border-top-width',
    'border-right-width',
    'border-bottom-width',
    'border-left-width',
    'margin-top',
    'margin-right',
    'margin-bottom',
    'margin-left',
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left',
    'z-index'
  ]

  const computedStyle = getComputedStyle(ele)
  requiredValue.forEach(item => {
    result[item] = parseFloat(computedStyle[item as any]) || 0
  })

  mixin(result, {
    width:
      ele.offsetWidth -
      result['border-left-width'] -
      result['border-right-width'] -
      result['padding-left'] -
      result['padding-right'],
    height:
      ele.offsetHeight -
      result['border-top-width'] -
      result['border-bottom-width'] -
      result['padding-top'] -
      result['padding-bottom']
  })
  mixin(result, findPos(ele))
  return result
}

export function getMaxZIndex(): number {
  return [...document.all].reduce((r, e) => Math.max(r, +window.getComputedStyle(e).zIndex || 0), 0)
}

export function isParent(obj: Record<string, any>, parentObj: Record<string, any>): boolean {
  while (obj !== undefined && obj !== null && obj.tagName.toUpperCase() !== 'BODY') {
    if (obj == parentObj) return true
    obj = obj.parentNode
  }
  return false
}

export default $
