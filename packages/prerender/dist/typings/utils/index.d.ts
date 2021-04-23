export declare function addScriptTag(source: string, script: string, port: string | number): string;
export declare function htmlMinify(html: string): string;
export declare function writeMagicHtml(html: string, option: Options): Promise<any>;
export declare function getMagicHtml(fileName: string, option: Options): string;
export declare function arrayToObj<T extends string>(o: Array<T>): {
    [K in T]: K;
};
export declare function sleep(duration: number): Promise<unknown>;
export declare function generateQR(url: string): Promise<string>;
