import { $$, $, getComputedStyle, checkHasPseudoEle, inViewPort, checkHasBorder, isBase64Img, transparent, checkHasTextDecoration, removeElement, setOpacity, noSkeleton, injectStyle } from './util';
import { DISPLAY_NONE, Node, EXT_REG, TRANSPARENT, GRADIENT_REG, MOCK_TEXT_ID, CONSOLE_SELECTOR, BASE64, AUTOMATICMOD, DEFAULTMOD } from './config';
import * as handler from './handler/index';
import { styleCache, clearCache } from './handler/styleCache';
import { addBlick } from './animation/index';
import { addRootHashClass } from './handler/root';
import { merge } from 'lodash';
let rootHashClass = '';
async function traverse(options, element = document.documentElement) {
    const { remove, excludes, text, image, button, svg, grayBlock, pseudo, cssUnit, decimal, skipBase64, animation } = options;
    const excludesEle = excludes.length ? Array.from($$(excludes.join(','))) : [];
    const grayEle = grayBlock.length ? Array.from($$(grayBlock.join(','))) : [];
    const rootElement = element;
    const texts = [];
    const buttons = [];
    const hasImageBackEles = [];
    const toRemove = [];
    const imgs = [];
    const svgs = [];
    const pseudos = [];
    const gradientBackEles = [];
    const grayBlocks = [];
    if (Array.isArray(remove)) {
        remove.push(CONSOLE_SELECTOR);
        // @ts-ignore
        toRemove.push(...$$(remove.join(',')));
    }
    if (button && button.excludes.length) {
        // translate selector to element
        button.excludes = Array.from($$(button.excludes.join(',')));
    }
    ;
    [svg, pseudo, image].forEach(type => {
        if (type.shapeOpposite.length) {
            type.shapeOpposite = Array.from($$(type.shapeOpposite.join(',')));
        }
    });
    (function preTraverse(ele) {
        if (noSkeleton(ele))
            return false;
        const styles = getComputedStyle(ele);
        const hasPseudoEle = checkHasPseudoEle(ele);
        if (!inViewPort(ele) || DISPLAY_NONE.test(ele.getAttribute('style'))) {
            return toRemove.push(ele);
        }
        if (~grayEle.indexOf(ele)) {
            return grayBlocks.push(ele);
        }
        if (~excludesEle.indexOf(ele))
            return false; // eslint-disable-line no-bitwise
        if (hasPseudoEle && !options.skipPseudo) {
            pseudos.push(hasPseudoEle);
        }
        if (checkHasBorder(styles)) {
            ele.style.border = 'none';
        }
        if (ele.children.length > 0 && /UL|OL/.test(ele.tagName) && options.repeatLI) {
            handler.list(ele);
        }
        // 将所有拥有 textChildNode 子元素的元素的文字颜色设置成背景色，这样就不会在显示文字了。
        if (ele.childNodes && Array.from(ele.childNodes).some(n => n.nodeType === Node.TEXT_NODE)) {
            transparent(ele);
        }
        if (checkHasTextDecoration(styles)) {
            ele.style.textDecorationColor = TRANSPARENT;
        }
        // 隐藏所有 svg 元素
        if (ele.tagName === 'svg') {
            return svgs.push(ele);
        }
        // skip base64
        if ((BASE64.test(styles.backgroundImage) || isBase64Img(ele)) &&
            skipBase64) {
            return true;
        }
        if (EXT_REG.test(styles.background) ||
            EXT_REG.test(styles.backgroundImage) ||
            BASE64.test(styles.backgroundImage)) {
            return hasImageBackEles.push(ele);
        }
        if (GRADIENT_REG.test(styles.background) || GRADIENT_REG.test(styles.backgroundImage)) {
            return gradientBackEles.push(ele);
        }
        if (ele.tagName === 'IMG' || isBase64Img(ele)) {
            return imgs.push(ele);
        }
        if (ele.nodeType === Node.ELEMENT_NODE &&
            (ele.tagName === 'BUTTON' || (ele.tagName === 'A' && ele.getAttribute('role') === 'button'))) {
            return buttons.push(ele);
        }
        if (ele.childNodes &&
            ele.childNodes.length === 1 &&
            ele.childNodes[0].nodeType === Node.TEXT_NODE &&
            /\S/.test(ele.childNodes[0].textContent)) {
            return texts.push(ele);
        }
        if (ele.children && ele.children.length > 0) {
            Array.from(ele.children).forEach(child => preTraverse(child));
        }
        return false;
    })(rootElement);
    svgs.forEach(e => handler.svg(e, svg, cssUnit, decimal));
    texts.forEach(e => handler.text(e, text, cssUnit, decimal));
    buttons.forEach(e => handler.button(e, button));
    await Promise.all(hasImageBackEles.map(e => {
        return handler.background(e, image);
    }));
    await Promise.all(imgs.map(e => {
        return handler.image(e, image);
    }));
    pseudos.forEach(e => handler.pseudos(e, pseudo));
    await Promise.all(gradientBackEles.map(e => {
        return handler.background(e, image);
    }));
    grayBlocks.forEach(e => handler.grayBlock(e, button));
    // remove mock text wrapper
    const offScreenParagraph = $(`#${MOCK_TEXT_ID}`);
    if (offScreenParagraph && offScreenParagraph.parentNode) {
        toRemove.push(offScreenParagraph.parentNode);
    }
    toRemove.forEach(e => removeElement(e));
    // animation
    if (animation) {
        addBlick(rootElement);
    }
    // root add hash class
    rootHashClass = addRootHashClass(rootElement);
    return rootElement;
}
async function genSkeleton(options = AUTOMATICMOD) {
    const { hide } = options;
    // 将 `hide` 队列中的元素通过调节透明度为 0 来进行隐藏
    if (hide.length) {
        const hideEle = $$(hide.join(','));
        Array.from(hideEle).forEach(ele => setOpacity(ele));
    }
    /**
     * walk in process
     */
    await traverse(options);
    /**
     * add `<style>`
     */
    let rules = '';
    for (const selector in styleCache) {
        if (selector !== '@keyframes skeleton-blink' && selector !== '.skeleton--animate') {
            rules += `.${rootHashClass} ${selector} ${styleCache[selector]}\n`;
        }
        else {
            rules += ` ${selector} ${styleCache[selector]}\n`;
        }
    }
    injectStyle(rootHashClass, rules);
}
async function outputSkeleton(element, options = DEFAULTMOD) {
    if (options === undefined || options === null) {
        options = AUTOMATICMOD;
    }
    if (typeof options === 'object') {
        options = merge(DEFAULTMOD, options);
    }
    clearCache();
    const { hide } = options;
    // 将 `hide` 队列中的元素通过调节透明度为 0 来进行隐藏
    if (hide.length) {
        const hideEle = $$(hide.join(','));
        Array.from(hideEle).forEach(ele => setOpacity(ele));
    }
    /**
     * walk in process
     */
    const html = await traverse(options, element);
    /**
     * add `<style>`
     */
    let rules = '';
    for (const selector in styleCache) {
        if (selector !== '@keyframes skeleton-blink' && selector !== '.skeleton--animate') {
            rules += `.${rootHashClass} ${selector} ${styleCache[selector]}\n`;
        }
        else {
            rules += ` ${selector} ${styleCache[selector]}\n`;
        }
    }
    const style = injectStyle(rootHashClass, rules);
    return { html, style, rootHashClass };
}
export { genSkeleton, outputSkeleton, DEFAULTMOD };
