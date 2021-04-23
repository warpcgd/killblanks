<template>
  <div class="vue-edit-panel">
    <div class="editor" ref="vueEditor"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import codeMirror from '../codeMirror'
import { log } from '../log'
import { renderVueTemplate } from '../util'

@Component
export default class vueTemplateEdit extends Vue {
  editor: CodeMirror.Editor | null = null

  @Watch('$root.$data.store.skeletonInfo')
  changeHandle(val: Object) {
    if (val) {
      this.setCode()
      log('success', 'render skeleton success')
    }
  }

  @Watch('$root.$data.store.inspectedDomName')
  change() {
    this.setCode()
  }

  mounted() {
    this.initCodeMirror()
  }

  setCode() {
    const { editor } = this
    const skeletonInfo = this.$root.$data.store.skeletonInfo
    const inspectedDomName = this.$root.$data.store.inspectedDomName
    const { html, style } = skeletonInfo[inspectedDomName] || { html: '', style: '' }
    const _HTML = renderVueTemplate(style ? style : '', html ? html : '')
    if (editor) {
      editor.setValue(_HTML)
    }
  }
  initCodeMirror() {
    const skeletonInfo = this.$root.$data.store.skeletonInfo
    const inspectedDomName = this.$root.$data.store.inspectedDomName
    const { html, style } = skeletonInfo[inspectedDomName] || { html: '', style: '' }
    const _HTML = renderVueTemplate(style ? style : '', html ? html : '')
    const container = this.$refs.vueEditor
    const codeMirrorConfig = {
      value: _HTML,
      mode: 'text/javascript',
      lineNumbers: true,
      autofocus: true,
      lineWrapping: true,
      styleActiveLine: true
    }
    this.editor = codeMirror(container as HTMLElement, codeMirrorConfig)
  }
}
</script>

<style lang="scss">
.vue-edit-panel {
  height: 100%;
  .editor {
    height: 100%;
  }
  .CodeMirror {
    height: 100%;
  }
}
</style>
