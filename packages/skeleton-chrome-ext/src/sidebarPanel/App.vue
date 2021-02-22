<template>
  <div id="skeleton">
    <topBar @change-panel="changePanel"></topBar>
    <div class="skeleton-panel">
      <toolBar @run-tool="runTool"></toolBar>
      <component :is="type"></component>
    </div>
  </div>
</template>

<script>
import { sendEventToBackground } from './util'
import { DEFAULTMOD } from '@killblanks/skeleton'
import htmlEdit from './htmlEdit/index'
import vueTemplateEdit from './vueTemplateEdit/index'
import topBar from './topBar/index'
import toolBar from './toolBar/index'
import toolEdit from './toolEdit/index'
export default {
  data() {
    return {
      type: 'htmlEdit'
    }
  },
  components: {
    htmlEdit,
    vueTemplateEdit,
    topBar,
    toolBar,
    toolEdit
  },
  methods: {
    runSkeleton() {
      sendEventToBackground('_OUTPUT_SKELETON_', DEFAULTMOD)
    },
    refresh() {
      sendEventToBackground('_REFRESH_SKELETON_', {})
    },
    goBack() {
      sendEventToBackground('_GO_BACK_SKELETON_', {})
    },
    changePanel(type) {
      this.type = type
    },
    runTool(type) {
      this[type] && this[type]()
    }
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
