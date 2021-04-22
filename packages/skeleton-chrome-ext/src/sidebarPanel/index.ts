import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design'
import { store } from '../store/index'

import 'view-design/dist/styles/iview.css'
import { log } from './log/index'
import { getSkeletonClass } from './util'

Vue.config.ignoredElements = [/^ion-/]
Vue.use(ViewUI)

window.$app = new Vue({
  el: '#app',
  render: h => h(App),
  data: {
    store: store.state
  }
})

window.Vue = Vue

window.contentScriptReceiver = (res: any) => {
  if (res && res.name === 'setSkeletonInfo') {
    store.setSkeletonInfo(res.data.rootHashClass, res.data)
    store.setInspectedDomName(res.data.rootHashClass)
    // window.$app.$root.store.skeletonInfo[res.data.rootHashClass] = res.data
    // store.state.skeletonInfo[res.data.rootHashClass] = res.data
  }
  if (res && res.name === 'setInspectedDom') {
    const className = getSkeletonClass(res.data)
    // window.$app.$root.store.inspectedDomName = className
    // store.state.inspectedDomName = className
    store.setInspectedDomName(className)
  }
  if (res && res.name === 'log') {
    log('info', res.data)
  }
}
