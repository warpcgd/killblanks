import { renderShellHtml, addScriptTag } from '../../lib/utils/index'
import * as jsdom from 'jsdom'

function isHTML(str: string): boolean {
  const doc = new jsdom.JSDOM(str)
  return Array.from(doc.window.document.body.childNodes).some(node => node.nodeType === 1)
}

describe('test util methods', () => {
  test('renderShellHtml should outPut html file', () => {
    const styles = 'test styles'
    const html = '<div>test html</div>'
    const toBeResult = `<html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Page Skeleton</title>
        <!-- 你可以直接修改html里面内容来自定义样式 -->
        ${styles}
      </head>
      <body>
        ${html}
      </body>
      </html>`
    const result = renderShellHtml(styles, html)
    expect(result).toEqual(toBeResult)
    expect(isHTML(result)).toBe(true)
  })

  test('addScriptTag should add script behind the </body>', () => {
    const source = '<body></body>'
    const script = 'test add script'
    const port = 'test add port 8888'
    const result = addScriptTag(source, script, port)
    const reg = new RegExp(`<body>|${script}|${port}|</body>`, 'gi')
    const matches = result.match(reg)
    expect(result).toMatch(new RegExp(script))
    expect(result).toMatch(new RegExp(port))
    expect(matches.length).toBe(4)
    expect(matches[0]).toEqual('<body>')
    expect(matches[3]).toEqual('</body>')
    expect(matches).toContain(script)
    expect(matches).toContain(port)
  })
})
