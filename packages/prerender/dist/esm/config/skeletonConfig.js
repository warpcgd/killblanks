"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.automaticMod = exports.defaultMod = void 0;
const tslib_1 = require("tslib");
const merge_1 = tslib_1.__importDefault(require("lodash/merge"));
exports.defaultMod = {
    name: 'default',
    text: {
        color: '#EFEFEF'
    },
    loading: 'spin',
    image: {
        // `rect` | `circle`
        shape: 'rect',
        color: '#FFFFFF',
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
    skipBase64: true,
    // or 'vw|vh|vmin|vmax'
    cssUnit: 'rem',
    decimal: 4
};
exports.automaticMod = merge_1.default({}, exports.defaultMod, {
    name: 'automatic',
    image: {
        color: 'automatic'
    }
});
exports.default = {
    default: exports.defaultMod,
    automatic: exports.automaticMod
};
