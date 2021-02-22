

interface domInspectorOptions {
  root?: HTMLElement | string
  exclude?: HTMLElement[] | string[]
  theme?: 'dom-inspector-theme-default' | string
  maxZIndex?: number
}

interface Window {
  $0?: HTMLElement
  inspect?: any
  contentScriptReceiver: any
  inspectedWindow: any
  Vue: any
  $app: any
}

interface _window extends chrome.windows.Window {
  contentScriptReceiver: any
  inspectedWindow: any
}
