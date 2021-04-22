<template>
  <div class="skeleton-top-bar">
    <div class="logo">
      <img :src="logoSrc" alt />
    </div>
    <p class="title">
      {{ name }}<span class="verstion">v:{{ version }}</span>
    </p>
    <div class="panel-bar">
      <Menu mode="horizontal" active-name="htmlEdit" @on-select="onSelectPanel">
        <MenuItem name="htmlEdit">
          <ion-icon name="logo-html5"></ion-icon>
        </MenuItem>
        <MenuItem name="vueTemplateEdit">
          <ion-icon name="logo-vue"></ion-icon>
        </MenuItem>
        <MenuItem name="toolEdit">
          <ion-icon name="settings-outline"></ion-icon>
        </MenuItem>
      </Menu>
    </div>
  </div>
</template>
<script>
import logo from '../../icons/128.png'
import manifest from '../../../manifest.json'
export default {
  data() {
    return {
      logoSrc: logo,
      version: manifest.version,
      name: manifest.name
    }
  },
  methods: {
    onSelectPanel(name) {
      this.$emit('change-panel', name)
    }
  }
}
</script>
<style lang="scss">
.skeleton-top-bar {
  display: flex;
  align-items: center;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  padding: 0 10px;
  ion-icon {
    font-size: 22px;
    vertical-align: middle;
  }
  .title {
    margin-left: 5px;
    font-size: 16px;
    color: #435d7b;
    .verstion {
      font-size: 12px;
      padding-left: 10px;
    }
  }
  .logo {
    width: 35px;
    height: 35px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title {
    flex: auto;
  }

  .panel-bar {
    .ivu-menu-horizontal {
      height: 50px;
      line-height: 50px;
    }
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item {
      border-bottom: 2px solid #fff;
      padding: 0 15px;
    }
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active {
      color: #435d7b;
      border-bottom: 2px solid #435d7b;
    }
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active,
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover,
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active,
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover {
      color: #435d7b;
      border-bottom: 2px solid #435d7b;
    }
  }
  .tool-bar {
    display: flex;
    > div {
      padding: 0 10px;
      cursor: pointer;
    }
    > div:hover {
      color: #435d7b;
    }
  }
}
</style>
