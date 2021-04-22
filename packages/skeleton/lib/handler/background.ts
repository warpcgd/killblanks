/**
 * use the same config options as image block.
 */
import { addStyle, shapeStyle } from './styleCache'
import { CLASS_NAME_PREFEX, EXT_REG, BASE64, GRADIENT_REG } from '../config'
import { addClassName, hashCode, cleanText } from '../util'
import * as analyze from 'rgbaster'
async function backgroundHandler(ele: HTMLElement, { color, shape }: ModType['image']) {
  let imageClass = CLASS_NAME_PREFEX + 'image'
  const shapeClass = CLASS_NAME_PREFEX + shape
  const bgImg = getComputedStyle(ele).backgroundImage
  const url = bgImg
    .replace('url(', '')
    .replace(')', '')
    .replace(/"/gi, '')
  let hash = hashCode(url)
  if (color === 'automatic' && bgImg !== 'none' && (EXT_REG.test(bgImg) || BASE64.test(bgImg))) {
    const result = await analyze(url, {
      scale: 0.6
    })
    color = result[0].color || '#EFEFEF'
  }
  if (color === 'automatic' && bgImg !== 'none' && GRADIENT_REG.test(bgImg)) {
    color = bgImg.replace(/"/gi, '')
    hash = hashCode(bgImg)
  }
  imageClass += '-' + hash
  color = color === 'automatic' ? '#EFEFEF' : color
  const rule = `{
    background: ${color} !important;
  }`
  addStyle(`.${imageClass}`, rule)
  shapeStyle(shape)
  cleanText(ele)
  addClassName(ele, [imageClass, shapeClass])
}

export default backgroundHandler
