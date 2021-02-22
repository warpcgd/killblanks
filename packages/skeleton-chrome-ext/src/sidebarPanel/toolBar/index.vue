<template>
  <div class="skeleton-tool-bar">
    <Alert>Select an element in the page && click render</Alert>
    <div class="tool-bar">
      <div @click="onClickTool('runSkeleton')">
        <Button size="small" shape="circle">
          <ion-icon name="bulb-outline"></ion-icon>render
        </Button>
      </div>
      <div @click="onClickTool('goBack')">
        <Button size="small" shape="circle">
          <ion-icon name="arrow-back-outline"></ion-icon>back
        </Button>
      </div>
      <div @click="onClickTool('refresh')">
        <Button size="small" shape="circle">
          <ion-icon name="sync-outline"></ion-icon>refresh
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    onClickTool(type) {
      this.$emit('run-tool', type)
    }
  }
}
</script>
<style lang="scss">
.skeleton-tool-bar {
  padding: 10px;
  .tool-bar {
    display: flex;
    font-size: 14px;
    > div {
      padding: 0 5px;
      cursor: pointer;
      ion-icon {
        font-size: 12px;
        vertical-align: middle;
        margin-right: 1px;
      }
      .ivu-btn {
        line-height: 12px;
        color: #435d7b;
      }
      .ivu-btn:hover {
        color: #435d7b;
        background-color: #fff;
        border-color: #435d7b;
      }
    }
  }
}
</style>
