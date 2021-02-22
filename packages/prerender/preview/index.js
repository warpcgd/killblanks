import Vue from 'vue'
import App from './app.vue'
import store from './store'
import initSock from './socket'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icons.js'
import './index.css'

import {
  Button,
  Dialog,
  Message,
  ButtonGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Tooltip
} from 'element-ui'

;[
  Button,
  Dialog,
  ButtonGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Tooltip
].forEach(cpt => {
  Vue.component(cpt.name, cpt)
})

Vue.prototype.$message = Message

initSock(store)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
