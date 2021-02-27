import { MOCK_TEXT_ID, TRANSPARENT, CLASS_NAME_PREFEX } from './config'
import { addStyle } from './handler/styleCache'

export const getComputedStyle = window.getComputedStyle
export const $$ = document.querySelectorAll.bind(document)
export const $ = document.querySelector.bind(document)
export const isBase64Img = (img: HTMLImageElement) => /base64/.test(img.src)

export const setAttributes = (ele: HTMLElement, attrs: DefaultObjectType) => {
  // for (const key in attrs) {
  //   const value = attrs[key]
  //   ele.setAttribute(key, value)
  // }
  Object.keys(attrs).forEach((k: keyof typeof attrs) => ele.setAttribute(k as string, attrs[k]))
}

export const inViewPort = (ele: HTMLElement) => {
  const rect = ele.getBoundingClientRect()
  return rect.top < window.innerHeight && rect.left < window.innerWidth
}

export const checkHasPseudoEle = (ele: HTMLElement) => {
  const hasBefore = getComputedStyle(ele, '::before').getPropertyValue('content') !== 'none'
  const hasAfter = getComputedStyle(ele, '::after').getPropertyValue('content') !== 'none'
  if (hasBefore || hasAfter) {
    return { hasBefore, hasAfter, ele }
  }
  return false
}

export const checkHasBorder = (styles: CSSStyleDeclaration) =>
  styles.getPropertyValue('border-style') !== 'none'

export const canSkeleton = (ele: HTMLElement) => {
  const skeletonList = document.querySelectorAll('[_skeleton_]')
  if (!Array.from(skeletonList).length) {
    return false
  }
  const isChild = Array.from(skeletonList).some(parent => {
    return parent.contains(ele)
  })
  Array.from(skeletonList).forEach(item => {
    const _skeleton_index_ = item.getAttribute('_skeleton_')
    if (_skeleton_index_) {
      item.setAttribute('prerender', _skeleton_index_)
    } else {
      item.setAttribute('prerender', '')
    }
  })
  if (isChild) return true
  return false
}

export const noSkeleton = (ele: HTMLElement) => {
  const skeletonList = document.querySelectorAll('[_noSkeleton_]')
  if (!Array.from(skeletonList).length) {
    return false
  }
  const isChild = Array.from(skeletonList).some(parent => {
    return parent.contains(ele) || parent === ele
  })
  if (isChild) return true
  return false
}

export const getOppositeShape = (shape: string) => (shape === 'circle' ? 'rect' : 'circle')

export const checkHasTextDecoration = (styles: CSSStyleDeclaration) =>
  !/none/.test(styles.textDecorationLine)

export const getViewPort = () => {
  const vh = window.innerHeight
  const vw = window.innerWidth

  return {
    vh,
    vw,
    vmax: Math.max(vw, vh),
    vmin: Math.min(vw, vh)
  }
}

export const hashCode = function(str: string) {
  let hash = 0,
    i,
    chr
  if (str.length === 0) return hash
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i)
    hash = hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

export const injectStyle = (rootHashClass: string, style: string): HTMLStyleElement => {
  const id = `_${rootHashClass}_`
  const query: HTMLStyleElement = document.querySelector(`[id=${id}]`)
  const styleEle: HTMLStyleElement = query || document.createElement('style')
  // if (!window.createPopup) {
  //   // For Safari
  //   styleEle.appendChild(document.createTextNode(''))
  // }
  styleEle.id = id
  styleEle.type = 'text/css'
  styleEle.innerHTML = style

  // styleEle.appendChild(document.createTextNode(style))

  if (query) {
    return styleEle
  }
  if (document.head) {
    document.head.appendChild(styleEle)
  } else {
    document.body.appendChild(styleEle)
  }
  return styleEle
}

export const px2relativeUtil = (
  px: string | number,
  unit: 'px' | 'rem' | 'vw' | 'vh' | 'vmin' | 'vmax' = 'rem',
  decimal = 4
) => {
  const pxValue = typeof px === 'string' ? parseFloat(px) : px
  if (unit === 'rem') {
    const htmlElementFontSize = getComputedStyle(document.documentElement).fontSize
    return `${(pxValue / parseFloat(htmlElementFontSize)).toFixed(decimal)}${unit}`
  } else if (unit === 'px') {
    return px
  } else {
    const dimensions = getViewPort()
    const base = dimensions[unit as keyof typeof dimensions]
    return `${((pxValue / base) * 100).toFixed(decimal)}${unit}`
  }
}

export const getTextWidth = (text: string, style: object) => {
  let offScreenParagraph: HTMLElement = document.querySelector(`#${MOCK_TEXT_ID}`)
  if (!offScreenParagraph) {
    const wrapper = document.createElement('p')
    offScreenParagraph = document.createElement('span')
    Object.assign(wrapper.style, {
      width: '10000px'
    })
    offScreenParagraph.id = MOCK_TEXT_ID
    wrapper.appendChild(offScreenParagraph)
    document.body.appendChild(wrapper)
  }
  Object.assign(offScreenParagraph.style, style)
  offScreenParagraph.textContent = text
  return offScreenParagraph.getBoundingClientRect().width
}

export const addClassName = (ele: HTMLElement, classArray: string[]) => {
  for (const name of classArray) {
    ele.classList.add(name)
  }
}

export const setOpacity = (ele: HTMLElement) => {
  const className = CLASS_NAME_PREFEX + 'opacity'
  const rule = `{
    opacity: 0 !important;
  }`
  addStyle(`.${className}`, rule)
  ele.classList.add(className)
}

export const transparent = (ele: HTMLElement) => {
  const className = CLASS_NAME_PREFEX + 'transparent'
  const rule = `{
    color: ${TRANSPARENT} !important;
  }`
  addStyle(`.${className}`, rule)
  ele.classList.add(className)
}

export const removeElement = (ele: HTMLElement) => {
  const parent = ele.parentNode
  if (parent) {
    parent.removeChild(ele)
  }
}

export const emptyElement = (ele: HTMLElement) => {
  ele.innerHTML = ''
}
