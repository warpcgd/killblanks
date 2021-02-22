import * as puppeteer from 'puppeteer';
declare class Render {
    option: Options;
    previewPageUrl: string;
    constructor(option: Options);
    renderPreivewScreen(origin: string, sockets: Sockets, open?: boolean): Promise<{
        fileName: any;
        originUrl: string;
        skeletonPageUrl: string;
        qrCode: string;
        html: any;
    }>;
    waitForRender(page: puppeteer.Page): Promise<void>;
    makeScreen(page: puppeteer.Page): Promise<void>;
    getCleanHtmlAndStyle(page: puppeteer.Page, clean?: string): Promise<{
        rawHtml: string;
        styles: string;
        cleanedHtml: string;
    }>;
    openNewWindow(sockets: Sockets): void;
    outputScreen(): Promise<boolean>;
    renderScreen(lang?: string): Promise<void>;
}
export default Render;
