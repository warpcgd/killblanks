declare const getFreePort: () => Promise<number>;
declare const getLocalIpAddress: () => Promise<string | void>;
declare const defaultOptions: Options;
declare const htmlBeautifyConfig: {
    indent_size: number;
    html: {
        end_with_newline: boolean;
        js: {
            indent_size: number;
        };
        css: {
            indent_size: number;
        };
    };
    css: {
        indent_size: number;
    };
    js: {
        'preserve-newlines': boolean;
    };
};
declare const SOCK_NODE_EVENTS: Array<'generate' | 'connect' | 'getUrl' | 'console' | 'saveShellFile' | 'writeShellFile' | 'update'>;
declare const minifyOptions: {
    collapseWhitespace: boolean;
    minifyCSS: boolean;
    minifyJS: boolean;
    removeComments: boolean;
    removeAttributeQuotes: boolean;
    removeEmptyAttributes: boolean;
};
export { htmlBeautifyConfig, defaultOptions, minifyOptions, SOCK_NODE_EVENTS, getFreePort, getLocalIpAddress };
