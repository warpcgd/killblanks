import * as puppeteer from 'puppeteer';
declare class Render {
    option: Options | null;
    previewPageUrl: string;
    constructor(option: Options);
    renderPreivewScreen(origin: string, sockets: Sockets, open?: boolean): Promise<{
        fileName: any;
        originUrl: string;
        skeletonPageUrl: string;
        qrCode: string;
        html: string;
    }>;
    waitForRender(page: puppeteer.Page): Promise<void>;
    getCleanHtmlAndStyle(page: puppeteer.Page, clean?: string): Promise<{
        rawHtml: string;
    }>;
    openNewWindow(sockets: Sockets): void;
    outputScreen(): Promise<void>;
    renderScreen(lang?: string): Promise<boolean>;
}
export default Render;
