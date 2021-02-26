<template>
  <div class="html-edit-panel">
    <div class="editor" ref="htmlEditor"></div>
  </div>
</template>

<script>
import codeMirror from '../codeMirror'
import { log } from '../log'
import { renderHtml } from '../util'

export default {
  name: 'htmlEdit',
  data() {
    return {
      editor: null
    }
  },
  watch: {
    '$root.$data.store.skeletonInfo': {
      handler: function (val) {
        if (val) {
          this.setCode()
          log('success', 'render skeleton success')
        }
      },
      deep: true
    },
    '$root.$data.store.inspectedDomName': {
      handler: function (val) {
        this.setCode()
      }
    }
  },
  mounted() {
    this.initCodeMirror()
  },
  methods: {
    setCode() {
      const { editor } = this
      const skeletonInfo = this.$root.$data.store.skeletonInfo
      const inspectedDomName = this.$root.$data.store.inspectedDomName
      const { html, style } = skeletonInfo[inspectedDomName] || { html: '', style: '' }
      const _HTML = renderHtml(style ? style : '', html ? html : '')
      if (editor) {
        editor.setValue(_HTML)
      }
    },
    initCodeMirror() {
      const skeletonInfo = this.$root.$data.store.skeletonInfo
      const inspectedDomName = this.$root.$data.store.inspectedDomName
      const { html, style } = skeletonInfo[inspectedDomName] || { html: '', style: '' }
      const _HTML = renderHtml(style ? style : '', html ? html : '')
      const container = this.$refs.htmlEditor
      const codeMirrorConfig = {
        value: _HTML,
        mode: 'text/html',
        lineNumbers: true,
        autofocus: true,
        lineWrapping: true,
        styleActiveLine: true
      }
      this.editor = codeMirror(container, codeMirrorConfig)
    }
  }
}
</script>

<style lang="scss">
.html-edit-panel {
  height: 100%;
  .editor {
    height: 100%;
  }
  .CodeMirror {
    height: 100%;
  }
}
</style>
