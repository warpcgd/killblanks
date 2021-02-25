/**
 * constants
 */
export const TRANSPARENT = 'transparent';
export const EXT_REG = /\.(jpeg|jpg|png|gif|svg|webp)/;
export const BASE64 = /base64/;
export const GRADIENT_REG = /gradient/;
export const DISPLAY_NONE = /display:\s*none/;
export const PRE_REMOVE_TAGS = ['script'];
export const AFTER_REMOVE_TAGS = ['title', 'meta', 'style'];
export const SKELETON_STYLE = 'sk-style';
export const CLASS_NAME_PREFEX = 'sk-';
export const CONSOLE_SELECTOR = '.sk-console';
// 最小 1 * 1 像素的透明 gif 图片
export const SMALLEST_BASE64 = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
export const MOCK_TEXT_ID = 'sk-text-id';
export const Node = window.Node;
import Merge from 'lodash/merge';
export const DEFAULTMOD = {
    name: 'default',
    text: {
        color: '#EFEFEF'
    },
    loading: 'spin',
    image: {
        // `rect` | `circle`
        shape: 'rect',
        color: '#EFEFEF',
        shapeOpposite: []
    },
    button: {
        color: '#EFEFEF',
        excludes: []
    },
    svg: {
        // or transparent
        color: '#EFEFEF',
        // circle | rect
        shape: 'circle',
        shapeOpposite: []
    },
    pseudo: {
        // or transparent
        color: '#EFEFEF',
        // circle | rect
        shape: 'circle',
        shapeOpposite: []
    },
    excludes: [],
    remove: [],
    hide: [],
    grayBlock: [],
    skipBase64: false,
    repeatLI: false,
    skipPseudo: true,
    cssUnit: 'rem',
    decimal: 4,
    animation: true
};
export const AUTOMATICMOD = Merge({}, DEFAULTMOD, {
    name: 'automatic',
    image: {
        color: 'automatic'
    }
});
