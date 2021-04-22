// <reference types="chrome"/>

const devtools = '../sidebarPanel/index.html'
const browser = chrome

browser.devtools.panels.elements.createSidebarPane('SKELETON', sidebar => {
  let _window: _window
  const contentScriptData: any[] = []
  sidebar.setPage(devtools)
  // 与后台网页消息通信-长连接
  const port = chrome.runtime.connect({ name: 'devtools' })
  // 监听来自页面中的事件，content-sctipt background devtool
  port.onMessage.addListener(message => {
    if (_window && _window.contentScriptReceiver) {
      _window.contentScriptReceiver(message)
    } else {
      contentScriptData.push(message)
    }
  })
  port.postMessage({
    name: 'original',
    tabId: chrome.devtools.inspectedWindow.tabId
  })
  sidebar.onShown.addListener(panelWindow => {
    _window = panelWindow as _window
    _window.inspectedWindow = chrome.devtools.inspectedWindow
    while (contentScriptData.length !== 0) {
      _window.contentScriptReceiver(contentScriptData.shift())
    }
  })
  // 监听inspect
  browser.devtools.panels.elements.onSelectionChanged.addListener(() => {
    chrome.devtools.inspectedWindow.eval(`(${setInspectedDom.toString()})()`,
      { useContentScriptContext: true })
  })

  function setInspectedDom () {
    chrome.runtime.sendMessage({
      name: 'setInspectedDom',
      data: window.$0 ? Array.from(window.$0.classList) : []
    })
  }
})
