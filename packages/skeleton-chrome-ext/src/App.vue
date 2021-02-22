<template>
  <div id="app">
    <p>skeleton-chrome-ext</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 50px;
  background-color: yellow;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

p {
  font-size: 20px;
  color: black;
}
</style>
