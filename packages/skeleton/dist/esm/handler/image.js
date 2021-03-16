import { SMALLEST_BASE64 as src, CLASS_NAME_PREFEX, EXT_REG, BASE64 } from '../config';
import { setAttributes, hashCode, addClassName } from '../util';
import { addStyle } from './styleCache';
import * as analyze from 'rgbaster';
async function imgHandler(ele, { color }) {
    const { width, height } = ele.getBoundingClientRect();
    const attrs = {
        width,
        height,
        src
    };
    // const finalShape = shapeOpposite.indexOf(ele) > -1 ? getOppositeShape(shape) : shape
    let className = CLASS_NAME_PREFEX + 'image';
    // const shapeName = CLASS_NAME_PREFEX + finalShape
    // @ts-ignore
    const imgSrc = getComputedStyle(ele).src || ele.src;
    const hash = hashCode(imgSrc);
    if (color === 'automatic' && imgSrc !== '' && (EXT_REG.test(imgSrc) || BASE64.test(imgSrc))) {
        const url = imgSrc;
        const result = await analyze(url, {
            scale: 0.6
        });
        color = result[0].color || '#EFEFEF';
    }
    else {
        color = color === 'automatic' ? '#EFEFEF' : color;
    }
    className += '-' + hash;
    setAttributes(ele, attrs);
    const rule = `{
    background: ${color} !important;
  }`;
    addStyle(`.${className}`, rule);
    // shapeStyle(finalShape)
    addClassName(ele, [className]);
    if (ele.hasAttribute('alt')) {
        ele.removeAttribute('alt');
    }
}
export default imgHandler;
