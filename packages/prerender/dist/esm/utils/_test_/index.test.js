"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
describe('test util methods', () => {
    test('addScriptTag should add script behind the </body>', () => {
        const source = '<body></body>';
        const script = 'test add script';
        const port = 'test add port 8888';
        const result = index_1.addScriptTag(source, script, port);
        const reg = new RegExp(`<body>|${script}|${port}|</body>`, 'gi');
        const matches = result.match(reg);
        expect(result).toMatch(new RegExp(script));
        expect(result).toMatch(new RegExp(port));
        expect(matches).not.toBeNull();
        if (Array.isArray(matches)) {
            expect(matches.length).toBe(4);
            expect(matches[0]).toEqual('<body>');
            expect(matches[3]).toEqual('</body>');
            expect(matches).toContain(script);
            expect(matches).toContain(port);
        }
    });
    test('writeMagicHtml work', async () => {
        const { defaultOptions } = require('../../config');
        const md5 = require('md5');
        const testString = 'test';
        const fileName = await index_1.writeMagicHtml(testString, defaultOptions);
        expect(fileName).toBeDefined();
        expect(fileName).toEqual(await md5(testString));
    });
});
