/**
 *插入script标签到html body前
 *
 * @export
 * @param {*} source html源
 * @param {*} src script源
 * @param {*} port 端口
 * @returns
 */
export declare function addScriptTag(source: string, script: string, port: string | number): string;
export declare const removeElement: (ele: Element) => void;
export declare function htmlMinify(html: string, options: boolean): any;
export declare function writeShell(html: string, option: Options): Promise<any>;
export declare function writeMagicHtml(html: string, option: Options): Promise<any>;
export declare function getMagicHtml(fileName: string, option: Options): string;
export declare function getShellHtml(option: Options): Promise<string>;
export declare function arrayToObj<T extends string>(o: Array<T>): {
    [K in T]: K;
};
export declare function sleep(duration: number): Promise<unknown>;
export declare function generateQR(url: string): Promise<string>;
export declare function htmlToJson(html: string): object;
export declare function jsonToHtml(json: object): string;
export declare function getHtmlAndStyleFromJson(jsonForOriginHtml: object): {
    cleanedHtml: string;
    styles: string;
} | {
    cleanedHtml?: undefined;
    styles?: undefined;
};
export declare function deepMergeSkeleton(jsonForOriginHtml: object, jsonForHtml: object): void;
export declare function deepMerge(x: object, y: object): object;
export declare function renderShellHtml(styles: string, cleanedHtml: string): string;
export declare function removeDprAndFontSize(html: string): string;
export declare function resolveMod(option: Options): Options;
