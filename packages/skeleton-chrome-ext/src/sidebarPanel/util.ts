export const sendMessageToBackground = (message: string, callback: (val: any) => any): void => {
  chrome.devtools.inspectedWindow.eval(message, { useContentScriptContext: true }, value => {
    callback && callback(value)
  })
}

export const sendEventToBackground = (
  eventName?: string,
  detail: Record<string, unknown> = {},
  callback?: (val: any) => any
): void => {
  const str = `document.dispatchEvent(new CustomEvent('${eventName}', { 'detail': ${JSON.stringify(
    detail
  )} }))`
  chrome.devtools.inspectedWindow.eval(str, { useContentScriptContext: true }, value => {
    callback && callback(value)
  })
}

export const getSkeletonClass =  (classList: Array<string>): string => {
  const skeletonClass = classList.filter((e) => {
    return /skeleton-\d+/gi.test(e)
  })
  if (skeletonClass && skeletonClass.length) {
    return skeletonClass[0]
  } else {
    return ''
  }
}

export function renderHtml(styles: string, cleanedHtml: string): string {
  let shellHtml = `
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Page Skeleton</title>
    $$css$$
  </head>
  <body>
    $$html$$
  </body>
</html>`
  shellHtml = shellHtml.replace('$$css$$', styles).replace('$$html$$', cleanedHtml)
  return shellHtml
}

export function renderVueTemplate(styles: string, cleanedHtml: string): string {
  if (cleanedHtml && styles) {
    const vueTemplate = `
  <script>
  import Vue from 'vue'
  const skeletonLoader = {
    name: 'skeletocnLoader',
    functional: true,
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    render(h, context) {
      const { show } = context.props
      if (!show || window.__PRERENDER_INJECTED__) {
        const html = \`${cleanedHtml}\`
        const component = Vue.compile(html)
        return h(component)
      } else {
        return context.children[0]
      }
    }
  }
  export default skeletonLoader
  </script>
  ${styles}
  `
    return vueTemplate
  } else {
    return `
<script>
  import Vue from 'vue'
  const skeletonLoader = {
    name: 'skeletocnLoader',
    functional: true,
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    render(h, context) {
        return context.children[0]
    }
  }
  export default skeletonLoader
</script>
<style scoped>
</style>
`
  }
}
