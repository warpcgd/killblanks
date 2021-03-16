// 作为content script 与 devtool 通信的桥
const connections: Record<string, any> = {}

chrome.runtime.onConnect.addListener(function(port) {
  const extensionListener = function(message: any) {
    if (message.name == 'original') {
      connections[message.tabId] = port
    }
  }
  port.onMessage.addListener(extensionListener)

  port.onDisconnect.addListener(function(port) {
    port.onMessage.removeListener(extensionListener)

    const tabs = Object.keys(connections)
    for (let i = 0, len = tabs.length; i < len; i++) {
      if (connections[tabs[i]] == port) {
        delete connections[tabs[i]]
        break
      }
    }
  })
})

// 接收内容脚本的消息，并发送到devtool的消息
chrome.runtime.onMessage.addListener((message, sender) => {
  if (sender.tab && sender.tab.id) {
    const tabId = sender.tab.id
    if (tabId in connections) {
      connections[tabId].postMessage(message)
    } else {
      console.log('Tab not found in connection list.')
    }
  } else {
    console.log('sender.tab not defined.')
  }
  return true
})
