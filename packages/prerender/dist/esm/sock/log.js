"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const tslib_1 = require("tslib");
const tiza_1 = tslib_1.__importDefault(require("tiza"));
const log = (msg, type = 'success') => {
    const color = type === 'success' ? '#006633' : 'red';
    return (tiza_1.default
        .color(color)
        // .italic()
        .size(12)
        .text(`[PRERENDER] ${msg}`)
        .log());
};
exports.log = log;
