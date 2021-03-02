<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  }
};
</script>
<style lang="scss">
@import "./styles/base.scss";
html,
body,
#app {
  max-width: 750px;
  max-height: 1624px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: #fff;
  -webkit-overflow-scrolling: touch;
}
</style>
