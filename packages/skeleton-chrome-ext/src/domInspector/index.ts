import './style.css'
import { $, getElementInfo, isDOM, addRule, findIndex, getMaxZIndex, isParent } from './dom'
import { throttle, isNull } from './utils'
import logger from './logger'

class DomInspector {
  _doc: Document
  root: HTMLElement
  theme: domInspectorOptions['theme']
  exclude: domInspectorOptions['exclude']
  overlay: Record<string, any>
  overlayId: string
  target: HTMLElement | string
  destroyed: boolean
  maxZIndex: number
  _cachedTarget: HTMLElement | string
  _throttleOnMove: (...args: any[]) => any
  constructor(options: domInspectorOptions = {}) {
    this._doc = window.document

    this.root = options.root
      ? isDOM(options.root)
        ? (options.root as HTMLElement)
        : $(options.root as string)
      : $('body')

    if (isNull(this.root)) {
      logger.warn('Root element is null. Auto select body as root')
      this.root = $('body')
    }

    this.theme = options.theme || 'dom-inspector-theme-default'
    this.exclude = this._formatExcludeOption(options.exclude || [])

    this.overlay = {}
    this.overlayId = ''
    this.target = ''
    this.destroyed = false
    this.maxZIndex = options.maxZIndex || getMaxZIndex() + 1

    this._cachedTarget = ''
    this._throttleOnMove = throttle(this._onMove.bind(this), 100)

    this._init()
  }
  enable(): void {
    if (this.destroyed)
      return logger.warn('Inspector instance has been destroyed! Please redeclare it.')
    this.overlay.parent.style.display = 'block'
    this.root.addEventListener('mousemove', this._throttleOnMove)
    this.root.addEventListener('click', this._onClick)
  }
  pause(): void {
    this.root.removeEventListener('mousemove', this._throttleOnMove)
    this.root.removeEventListener('click', this._onClick)
  }
  disable(): void {
    this.overlay.parent.style.display = 'none'
    this.overlay.parent.style.width = 0
    this.overlay.parent.style.height = 0
    this.target = null
    this.root.removeEventListener('mousemove', this._throttleOnMove)
    this.root.removeEventListener('click', this._onClick)
  }
  destroy(): void {
    this.destroyed = true
    this.disable()
    this.overlay = {}
  }
  getXPath(ele: HTMLElement): void | string {
    if (!isDOM(ele) && !this.target)
      return logger.warn(
        'Target element is not found. Warning function name:%c getXPath',
        'color: #ff5151'
      )
    if (!ele) ele = this.target as HTMLElement

    if (ele.hasAttribute('id')) {
      return `//${ele.tagName.toLowerCase()}[@id="${ele.id}"]`
    }

    if (ele.hasAttribute('class')) {
      return `//${ele.tagName.toLowerCase()}[@class="${ele.getAttribute('class')}"]`
    }

    const path = []
    while (ele.nodeType === Node.ELEMENT_NODE) {
      const currentTag = ele.nodeName.toLowerCase()
      const nth = findIndex(ele, currentTag)
      path.push(`${ele.tagName.toLowerCase()}${nth === 1 ? '' : `[${nth}]`}`)
      ele = ele.parentNode as HTMLElement
    }
    return `/${path.reverse().join('/')}`
  }
  getSelector(ele: HTMLElement): string {
    if (!isDOM(ele) && !this.target)
      return logger.warn(
        'Target element is not found. Warning function name:%c getCssPath',
        'color: #ff5151'
      )
    if (!ele) ele = this.target as HTMLElement
    const path = []
    while (ele.nodeType === Node.ELEMENT_NODE) {
      let currentSelector = ele.nodeName.toLowerCase()
      if (ele.hasAttribute('id')) {
        currentSelector += `#${ele.id}`
      } else if (ele.hasAttribute('class')) {
        currentSelector += `.${ele.className
          .replace(/\s+/g, ' ')
          .split(' ')
          .join('.')}`
      } else {
        const nth = findIndex(ele, currentSelector)
        if (nth !== 1) currentSelector += `:nth-of-type(${nth})`
      }
      path.unshift(currentSelector)
      ele = ele.parentNode as HTMLElement
    }
    return path.join('>')
  }
  getElementInfo(ele: HTMLElement): Record<string, any> {
    if (!isDOM(ele) && !this.target)
      return logger.warn(
        'Target element is not found. Warning function name:%c getElementInfo',
        'color: #ff5151'
      )
    return getElementInfo(ele || (this.target as HTMLElement))
  }
  _init(): void {
    this.overlayId = `dom-inspector-${Date.now()}`

    const parent = this._createElement('div', {
      id: this.overlayId,
      class: `dom-inspector ${this.theme}`,
      style: `z-index: ${this.maxZIndex}`
    })

    this.overlay = {
      parent,
      content: this._createSurroundEle(parent, 'content'),
      paddingTop: this._createSurroundEle(parent, 'padding padding-top'),
      paddingRight: this._createSurroundEle(parent, 'padding padding-right'),
      paddingBottom: this._createSurroundEle(parent, 'padding padding-bottom'),
      paddingLeft: this._createSurroundEle(parent, 'padding padding-left'),
      borderTop: this._createSurroundEle(parent, 'border border-top'),
      borderRight: this._createSurroundEle(parent, 'border border-right'),
      borderBottom: this._createSurroundEle(parent, 'border border-bottom'),
      borderLeft: this._createSurroundEle(parent, 'border border-left'),
      marginTop: this._createSurroundEle(parent, 'margin margin-top'),
      marginRight: this._createSurroundEle(parent, 'margin margin-right'),
      marginBottom: this._createSurroundEle(parent, 'margin margin-bottom'),
      marginLeft: this._createSurroundEle(parent, 'margin margin-left'),
      tips: this._createSurroundEle(
        parent,
        'tips',
        '<div class="tag"></div><div class="id"></div><div class="class"></div><div class="line">&nbsp;|&nbsp;</div><div class="size"></div><div class="triangle"></div>'
      )
    }

    this.root.appendChild(parent)
  }
  _createElement(tag: string, attr: Record<string, any>, content?: string): HTMLElement {
    const ele = this._doc.createElement(tag)
    Object.keys(attr).forEach(item => {
      ele.setAttribute(item, attr[item])
    })
    if (content) ele.innerHTML = content
    return ele
  }
  _createSurroundEle(parent: HTMLElement, className: string, content?: string): HTMLElement {
    const ele = this._createElement(
      'div',
      {
        class: className
      },
      content
    )
    parent.appendChild(ele)
    return ele
  }
  _onClick(e: MouseEvent): boolean {
    e.preventDefault()
    const _e = e
    document.dispatchEvent(new CustomEvent('domInspectorClick', { detail: _e }))
    return false
  }
  _onMove(e: MouseEvent): void {
    for (let i = 0; i < this.exclude.length; i += 1) {
      const cur: HTMLElement = this.exclude[i] as HTMLElement
      if (cur.isEqualNode(e.target as HTMLElement) || isParent(e.target, cur)) return
    }

    this.target = e.target as HTMLElement

    if (this.target === this._cachedTarget) return null

    this._cachedTarget = this.target
    const elementInfo = getElementInfo(e.target as HTMLElement)
    const contentLevel = {
      width: elementInfo.width,
      height: elementInfo.height
    }
    const paddingLevel = {
      width: elementInfo['padding-left'] + contentLevel.width + elementInfo['padding-right'],
      height: elementInfo['padding-top'] + contentLevel.height + elementInfo['padding-bottom']
    }
    const borderLevel = {
      width:
        elementInfo['border-left-width'] + paddingLevel.width + elementInfo['border-right-width'],
      height:
        elementInfo['border-top-width'] + paddingLevel.height + elementInfo['border-bottom-width']
    }
    const marginLevel = {
      width: elementInfo['margin-left'] + borderLevel.width + elementInfo['margin-right'],
      height: elementInfo['margin-top'] + borderLevel.height + elementInfo['margin-bottom']
    }

    // so crazy
    addRule(this.overlay.parent, {
      width: `${marginLevel.width}px`,
      height: `${marginLevel.height}px`,
      top: `${elementInfo.top}px`,
      left: `${elementInfo.left}px`
    })
    addRule(this.overlay.content, {
      width: `${contentLevel.width}px`,
      height: `${contentLevel.height}px`,
      top: `${elementInfo['margin-top'] +
        elementInfo['border-top-width'] +
        elementInfo['padding-top']}px`,
      left: `${elementInfo['margin-left'] +
        elementInfo['border-left-width'] +
        elementInfo['padding-left']}px`
    })
    addRule(this.overlay.paddingTop, {
      width: `${paddingLevel.width}px`,
      height: `${elementInfo['padding-top']}px`,
      top: `${elementInfo['margin-top'] + elementInfo['border-top-width']}px`,
      left: `${elementInfo['margin-left'] + elementInfo['border-left-width']}px`
    })
    addRule(this.overlay.paddingRight, {
      width: `${elementInfo['padding-right']}px`,
      height: `${paddingLevel.height - elementInfo['padding-top']}px`,
      top: `${elementInfo['padding-top'] +
        elementInfo['margin-top'] +
        elementInfo['border-top-width']}px`,
      right: `${elementInfo['margin-right'] + elementInfo['border-right-width']}px`
    })
    addRule(this.overlay.paddingBottom, {
      width: `${paddingLevel.width - elementInfo['padding-right']}px`,
      height: `${elementInfo['padding-bottom']}px`,
      bottom: `${elementInfo['margin-bottom'] + elementInfo['border-bottom-width']}px`,
      right: `${elementInfo['padding-right'] +
        elementInfo['margin-right'] +
        elementInfo['border-right-width']}px`
    })
    addRule(this.overlay.paddingLeft, {
      width: `${elementInfo['padding-left']}px`,
      height: `${paddingLevel.height -
        elementInfo['padding-top'] -
        elementInfo['padding-bottom']}px`,
      top: `${elementInfo['padding-top'] +
        elementInfo['margin-top'] +
        elementInfo['border-top-width']}px`,
      left: `${elementInfo['margin-left'] + elementInfo['border-left-width']}px`
    })
    addRule(this.overlay.borderTop, {
      width: `${borderLevel.width}px`,
      height: `${elementInfo['border-top-width']}px`,
      top: `${elementInfo['margin-top']}px`,
      left: `${elementInfo['margin-left']}px`
    })
    addRule(this.overlay.borderRight, {
      width: `${elementInfo['border-right-width']}px`,
      height: `${borderLevel.height - elementInfo['border-top-width']}px`,
      top: `${elementInfo['margin-top'] + elementInfo['border-top-width']}px`,
      right: `${elementInfo['margin-right']}px`
    })
    addRule(this.overlay.borderBottom, {
      width: `${borderLevel.width - elementInfo['border-right-width']}px`,
      height: `${elementInfo['border-bottom-width']}px`,
      bottom: `${elementInfo['margin-bottom']}px`,
      right: `${elementInfo['margin-right'] + elementInfo['border-right-width']}px`
    })
    addRule(this.overlay.borderLeft, {
      width: `${elementInfo['border-left-width']}px`,
      height: `${borderLevel.height -
        elementInfo['border-top-width'] -
        elementInfo['border-bottom-width']}px`,
      top: `${elementInfo['margin-top'] + elementInfo['border-top-width']}px`,
      left: `${elementInfo['margin-left']}px`
    })
    addRule(this.overlay.marginTop, {
      width: `${marginLevel.width}px`,
      height: `${elementInfo['margin-top']}px`,
      top: 0,
      left: 0
    })
    addRule(this.overlay.marginRight, {
      width: `${elementInfo['margin-right']}px`,
      height: `${marginLevel.height - elementInfo['margin-top']}px`,
      top: `${elementInfo['margin-top']}px`,
      right: 0
    })
    addRule(this.overlay.marginBottom, {
      width: `${marginLevel.width - elementInfo['margin-right']}px`,
      height: `${elementInfo['margin-bottom']}px`,
      bottom: 0,
      right: `${elementInfo['margin-right']}px`
    })
    addRule(this.overlay.marginLeft, {
      width: `${elementInfo['margin-left']}px`,
      height: `${marginLevel.height - elementInfo['margin-top'] - elementInfo['margin-bottom']}px`,
      top: `${elementInfo['margin-top']}px`,
      left: 0
    })

    $('.tag', this.overlay.tips).innerHTML = this.target.tagName.toLowerCase()
    $('.id', this.overlay.tips).innerHTML = this.target.id ? `#${this.target.id}` : ''
    $('.class', this.overlay.tips).innerHTML = [...this.target.classList]
      .map(item => `.${item}`)
      .join('')
    $('.size', this.overlay.tips).innerHTML = `${marginLevel.width}x${marginLevel.height}`

    let tipsTop = 0
    if (elementInfo.top >= 24 + 8) {
      this.overlay.tips.classList.remove('reverse')
      tipsTop = elementInfo.top - 24 - 8
    } else {
      this.overlay.tips.classList.add('reverse')
      tipsTop = marginLevel.height + elementInfo.top + 8
    }
    addRule(this.overlay.tips, {
      top: `${tipsTop}px`,
      left: `${elementInfo.left}px`,
      display: 'block'
    })
  }
  _formatExcludeOption(excludeArray: domInspectorOptions['exclude']): any[] {
    const result: HTMLElement[] = []

    excludeArray.forEach((item: any) => {
      if (typeof item === 'string') return result.push($(item as string))

      if (isDOM(item)) return result.push(item)
      return null
    })

    return result
  }
}

export default DomInspector
