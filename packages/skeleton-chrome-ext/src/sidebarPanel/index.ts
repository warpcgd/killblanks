import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design'
import { store } from '../store/index'

import 'view-design/dist/styles/iview.css'
import { log } from './log/index'
import { getSkeletonClass } from './util';

Vue.config.ignoredElements = [/^ion-/]
Vue.use(ViewUI)

window.$app = new Vue({
  render: h => h(App),
  data: {
    store: store.state
  }
}).$mount('#app')

window.Vue = Vue

window.contentScriptReceiver = (res: any) => {
  if (res && res.name === 'setSkeletonInfo') {
    window.$app.$root.store.skeletonInfo[res.data.rootHashClass] = res.data
  }
  if (res&& res.name === 'setInspectedDom') {
    const className = getSkeletonClass(res.data)
    window.$app.$root.store.inspectedDomName = className
  }
  if (res && res.name === 'log') {
    log('info', res.data)
  }
}
