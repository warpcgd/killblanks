"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
module.exports = {
    mode: 'production',
    entry: {
        index: './sock_client.ts'
    },
    output: {
        filename: 'sock_client.bundle.js',
        path: path_1.default.resolve(__dirname, '')
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
};
