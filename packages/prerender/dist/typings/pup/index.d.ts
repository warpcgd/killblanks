import puppeteer from 'puppeteer';
declare class Puppeteer {
    browser: puppeteer.Browser | null;
    option: Options | null;
    pages: Array<puppeteer.Page>;
    constructor(option: Options);
    init(): Promise<void>;
    newPage(): Promise<puppeteer.Page>;
    interceptRequest(page: puppeteer.Page): Promise<void>;
    injectProperty(page: puppeteer.Page): Promise<void>;
    closePage(page: puppeteer.Page): Promise<void>;
    destroy(): void;
    waitForRender(options: Options): Promise<unknown>;
}
export default Puppeteer;
