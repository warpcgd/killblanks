<template>
  <div id="popup">
    <div class="header">
      <h1>skeleton-chrome-ext</h1>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator"

@Component({
  components: {}
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
#popup {
  width: 560px;
  height: auto;
  margin: 5px;
}
</style>
