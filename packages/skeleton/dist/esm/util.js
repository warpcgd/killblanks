import { MOCK_TEXT_ID, TRANSPARENT, CLASS_NAME_PREFEX } from './config';
import { addStyle } from './handler/styleCache';
export const getComputedStyle = window.getComputedStyle;
export const $$ = document.querySelectorAll.bind(document);
export const $ = document.querySelector.bind(document);
export const isBase64Img = (img) => /base64/.test(img.src);
export const setAttributes = (ele, attrs) => {
    // for (const key in attrs) {
    //   const value = attrs[key]
    //   ele.setAttribute(key, value)
    // }
    Object.keys(attrs).forEach((k) => ele.setAttribute(k, attrs[k]));
};
export const inViewPort = (ele) => {
    const rect = ele.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.left < window.innerWidth;
};
export const checkHasPseudoEle = (ele) => {
    const hasBefore = getComputedStyle(ele, '::before').getPropertyValue('content') !== 'none';
    const hasAfter = getComputedStyle(ele, '::after').getPropertyValue('content') !== 'none';
    if (hasBefore || hasAfter) {
        return { hasBefore, hasAfter, ele };
    }
    return false;
};
export const checkHasBorder = (styles) => styles.getPropertyValue('border-style') !== 'none';
export const canSkeleton = (ele) => {
    const skeletonList = document.querySelectorAll('[_skeleton_]');
    if (!Array.from(skeletonList).length) {
        return false;
    }
    const isChild = Array.from(skeletonList).some(parent => {
        return parent.contains(ele);
    });
    Array.from(skeletonList).forEach(item => {
        const _skeleton_index_ = item.getAttribute('_skeleton_');
        if (_skeleton_index_) {
            item.setAttribute('prerender', _skeleton_index_);
        }
        else {
            item.setAttribute('prerender', '');
        }
    });
    if (isChild)
        return true;
    return false;
};
export const noSkeleton = (ele) => {
    const skeletonList = document.querySelectorAll('[_noSkeleton_]');
    if (!Array.from(skeletonList).length) {
        return false;
    }
    const isChild = Array.from(skeletonList).some(parent => {
        return parent.contains(ele) || parent === ele;
    });
    if (isChild)
        return true;
    return false;
};
export const getOppositeShape = (shape) => (shape === 'circle' ? 'rect' : 'circle');
export const checkHasTextDecoration = (styles) => !/none/.test(styles.textDecorationLine);
export const getViewPort = () => {
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    return {
        vh,
        vw,
        vmax: Math.max(vw, vh),
        vmin: Math.min(vw, vh)
    };
};
export const hashCode = function (str) {
    let hash = 0, i, chr;
    if (str.length === 0)
        return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
export const injectStyle = (rootHashClass, style) => {
    const id = `_${rootHashClass}_`;
    const query = document.querySelector(`[id=${id}]`);
    const styleEle = query || document.createElement('style');
    // if (!window.createPopup) {
    //   // For Safari
    //   styleEle.appendChild(document.createTextNode(''))
    // }
    styleEle.id = id;
    styleEle.type = 'text/css';
    styleEle.innerHTML = style;
    // styleEle.appendChild(document.createTextNode(style))
    if (query) {
        return styleEle;
    }
    if (document.head) {
        document.head.appendChild(styleEle);
    }
    else {
        document.body.appendChild(styleEle);
    }
    return styleEle;
};
export const px2relativeUtil = (px, unit = 'rem', decimal = 4) => {
    const pxValue = typeof px === 'string' ? parseFloat(px) : px;
    if (unit === 'rem') {
        const htmlElementFontSize = getComputedStyle(document.documentElement).fontSize;
        return `${(pxValue / parseFloat(htmlElementFontSize)).toFixed(decimal)}${unit}`;
    }
    else if (unit === 'px') {
        return px;
    }
    else {
        const dimensions = getViewPort();
        const base = dimensions[unit];
        return `${((pxValue / base) * 100).toFixed(decimal)}${unit}`;
    }
};
export const getTextWidth = (text, style) => {
    let offScreenParagraph = document.querySelector(`#${MOCK_TEXT_ID}`);
    if (!offScreenParagraph) {
        const wrapper = document.createElement('p');
        offScreenParagraph = document.createElement('span');
        Object.assign(wrapper.style, {
            width: '10000px'
        });
        offScreenParagraph.id = MOCK_TEXT_ID;
        wrapper.appendChild(offScreenParagraph);
        document.body.appendChild(wrapper);
    }
    Object.assign(offScreenParagraph.style, style);
    offScreenParagraph.textContent = text;
    return offScreenParagraph.getBoundingClientRect().width;
};
export const addClassName = (ele, classArray) => {
    for (const name of classArray) {
        ele.classList.add(name);
    }
};
export const setOpacity = (ele) => {
    const className = CLASS_NAME_PREFEX + 'opacity';
    const rule = `{
    opacity: 0 !important;
  }`;
    addStyle(`.${className}`, rule);
    ele.classList.add(className);
};
export const transparent = (ele) => {
    const className = CLASS_NAME_PREFEX + 'transparent';
    const rule = `{
    color: ${TRANSPARENT} !important;
  }`;
    addStyle(`.${className}`, rule);
    ele.classList.add(className);
};
export const removeElement = (ele) => {
    const parent = ele.parentNode;
    if (parent) {
        parent.removeChild(ele);
    }
};
export const emptyElement = (ele) => {
    ele.innerHTML = '';
};
export const byteLength = (ele) => {
    //获取字符串的字节数，扩展string类型方法
    let b = 0;
    const innerText = ele.innerText;
    const length = ele.innerText.length; //初始化字节数递加变量并获取字符串参数的字符个数
    if (length) {
        //如果存在字符串，则执行计划
        for (let i = 0; i < length; i++) {
            //遍历字符串，枚举每个字符
            if (innerText.charCodeAt(i) > 255) {
                //字符编码大于255，说明是双字节字符
                b += 2; //则累加2个
            }
            else {
                b++; //否则递加一次
            }
        }
        return b; //返回字节数
    }
    else {
        return 0; //如果参数为空，则返回0个
    }
};
export const cleanText = (ele) => {
    const textContent = ele.textContent;
    if (textContent === ele.innerHTML && (textContent === null || textContent === void 0 ? void 0 : textContent.length)) {
        const length = byteLength(ele);
        ele.innerHTML = Array(length)
            .fill(`&#160;`)
            .join('');
    }
};
