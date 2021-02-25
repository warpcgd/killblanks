import { outputSkeleton } from '@killblanks/skeleton'

function isInBody(node: HTMLElement) {
  return node === document.body ? false : document.body.contains(node)
}

let chromeRuntimePort = chrome.runtime.connect()
chromeRuntimePort.onDisconnect.addListener(() => {
  console.error('Disconnected')
  chromeRuntimePort = undefined;
});

// when using the port, always check if valid/connected
function postToPort(msg: any) {
  if (chromeRuntimePort) {
    chromeRuntimePort.postMessage(msg);
  }
}


const isDOM =
  typeof HTMLElement === 'object'
    ? function(obj: HTMLElement) {
      return obj instanceof HTMLElement
    }
    : function(obj: HTMLElement) {
      return (
        obj &&
          typeof obj === 'object' &&
          obj.nodeType === 1 &&
          typeof obj.nodeName === 'string' &&
          obj.nodeName !== 'SCRIPT' &&
          obj.nodeName !== 'STYLE'
      )
    }

const SKELETON_CACHE: { html: any; style: any; lastSelectedNode: any; currentSkeletonNode: any } = {
  html: '',
  style: '',
  lastSelectedNode: '',
  currentSkeletonNode: ''
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
document.addEventListener('_OUTPUT_SKELETON_', async ({ detail }) => {
  try {
    if (!isDOM(window.$0)) {
      chrome.runtime.sendMessage({
        name: 'log',
        data: 'Page elements has not selected'
      })
      return
    }

    if (!isInBody(window.$0)) {
      postToPort({
        name: 'log',
        data: 'The page element is not in the body element'
      })
      return
    }

    SKELETON_CACHE['lastSelectedNode'] = window.$0.cloneNode(true)
    const option = detail || {}
    const { html, style, rootHashClass } = await outputSkeleton(window.$0, option)
    SKELETON_CACHE.html = html
    SKELETON_CACHE.style = style
    SKELETON_CACHE['currentSkeletonNode'] = html
    chrome.runtime.sendMessage({
      name: 'setSkeletonInfo',
      data: { html: html.outerHTML, style: style.outerHTML, rootHashClass }
    })
    chrome.runtime.sendMessage({
      name: 'setInspectedDom',
      data: window.$0 ? Array.from(window.$0.classList) : []
    })
  } catch (error) {
    console.error(error)
    chrome.runtime.sendMessage({
      name: 'log',
      data: error.message
    })
  }
})

document.addEventListener('_GO_BACK_SKELETON_', async () => {
  try {
    if (SKELETON_CACHE['lastSelectedNode']) {
      SKELETON_CACHE['currentSkeletonNode'].parentNode.replaceChild(
        SKELETON_CACHE['lastSelectedNode'],
        SKELETON_CACHE['currentSkeletonNode']
      )
      const inspect = window.inspect
      setTimeout(() => {
        inspect(SKELETON_CACHE['lastSelectedNode'])
      }, 100)
    } else {
      chrome.runtime.sendMessage({
        name: 'log',
        data: 'There is currently no node cache'
      })
    }
  } catch (error) {
    console.error(error)
    chrome.runtime.sendMessage({
      name: 'log',
      data: error.message
    })
  }
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
document.addEventListener('_REFRESH_SKELETON_', () => {
  try {
    const { html, style } = SKELETON_CACHE
    if (html && style) {
      chrome.runtime.sendMessage({
        name: 'setSkeletonInfo',
        data: { html: html.outerHTML, style: style.outerHTML }
      })
      chrome.runtime.sendMessage({
        name: 'setInspectedDom',
        data: window.$0 ? Array.from(window.$0.classList) : []
      })
    } else {
      chrome.runtime.sendMessage({
        name: 'log',
        data: 'SKELETON_CACHE has no data'
      })
    }
  } catch (error) {
    console.error(error)
    chrome.runtime.sendMessage({
      name: 'log',
      data: error.message
    })
  }
})
