<template>
  <div id="skeleton">
    <topBar @change-panel="changePanel"></topBar>
    <div class="skeleton-panel">
      <toolBar @run-tool="runTool"></toolBar>
      <component :is="type"></component>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { sendEventToBackground } from './util'
import { DEFAULTMOD } from '@killblanks/skeleton'
import htmlEdit from './htmlEdit/index.vue'
import vueTemplateEdit from './vueTemplateEdit/index.vue'
import topBar from './topBar/index.vue'
import toolBar from './toolBar/index.vue'
import toolEdit from './toolEdit/index.vue'

@Component({
  components: {
    htmlEdit,
    vueTemplateEdit,
    topBar,
    toolBar,
    toolEdit
  }
})
export default class App extends Vue {
  type = 'htmlEdit'

  runSkeleton() {
    sendEventToBackground('_OUTPUT_SKELETON_', DEFAULTMOD)
  }
  refresh() {
    sendEventToBackground('_REFRESH_SKELETON_', {})
  }
  goBack() {
    sendEventToBackground('_GO_BACK_SKELETON_', {})
  }

  changePanel(type: string) {
    this.type = type
  }

  runTool(type: 'runSkeleton' | 'refresh' | 'goBack') {
    this[type] && this[type]()
  }
}
</script>
<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}
.ivu-tabs-card {
  min-height: 100%;
}
</style>
<style lang="scss" scoped>
#skeleton {
  color: #0d0e1f;
  // height: 100%;
}
.skeleton-panel {
  margin-top: 10px;
}
</style>
