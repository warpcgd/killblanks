<template>
  <div class="edit-panel">
    <div ref="editor"></div>
  </div>
</template>

<script>
import codeMirror from '../codeMirror'
import bus from '../bus'
// 防抖函数
function debounce(func, wait, immediate) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      timeout = null
      if (!immediate) func.apply(this, args)
    }, wait)
    if (immediate && !timeout) func.apply(this, [...args])
  }
}
export default {
  data() {
    return {
      editor: null
    }
  },
  props: {
    html: {
      type: String,
      required: true
    },
    currentRoute: {
      type: String,
      required: true
    }
  },
  created() {
    this.$nextTick(() => {
      const { html } = this
      const container = this.$refs.editor
      const codeMirrorConfig = {
        value: html,
        lineNumbers: true,
        autofocus: true,
        lineWrapping: true,
        styleActiveLine: true
      }
      const editor = (this.editor = codeMirror(container, codeMirrorConfig))
      editor.on(
        'change',
        debounce(cm => {
          const html = cm.getValue()
          console.log(html)
          this.$store.dispatch('SAVE_CODE', { route: this.currentRoute, html })
        }, 500)
      )
      bus.$on('set-code', this.setCode)
    })
  },
  beforeDestroy() {
    bus.$off('set-code', this.setCode)
  },
  methods: {
    setCode(routesData) {
      const { editor } = this
      if (editor) editor.setValue(routesData[this.currentRoute].html)
    }
  }
}
</script>

<style scoped>
</style>