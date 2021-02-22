<template>
  <div class="bar-top">
    <div class="logo">
      <img :src="require('../assets/128.png')" alt="">
    </div>
    <div class="logo-text">@killblank/preview</div>
    <div class="tools">
        <el-tooltip effect="dark" content="preview" placement="bottom">
          <el-button type="primary" icon="el-icon-mobile-phone" circle
            @click="preview"
          ></el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="update" placement="bottom">
          <el-button type="success" :loading="updateLoading" icon="el-icon-refresh-right" circle
            @click="update"
          ></el-button>
        </el-tooltip>
    </div>
  </div>
</template>

<script>
import Bus from '../bus'
  export default {
    data () {
      return {
        updateLoading: false
      }
    },
    props: {
      dropDownRoutes: {
        type: Array,
        required: true
      },
      currentRoute: {
        type: String,
        required: true
      }
    },
    mounted() {
      Bus.$on('updateDone', () => {
        this.updateLoading = false
      })
    },
    methods: {
      preview () {
        this.$emit('preview')
      },
      update () {
        this.updateLoading = true
        this.$emit('update')
      }
    }
  }
</script>

<style scoped>
  .bar-top {
    width: 100%;
    height: 66px;
    padding: 13px 20px;
    box-sizing: border-box;
    position: fixed;
    background: #fff;
    top: 0;
    display: flex;
    border-bottom: 1px solid #e8e8e8;
  }
  .logo {
    width: 40px;
    height: 40px;
  }
  .logo > img {
    width: 100%;
    height: 100%;
  }
  .logo-text {
    height: 40px;
    font-size: 25px;
    line-height: 40px;
    margin-left: 10px;
    color: #606266;
  }
  .documents {
    display: flex;
    height: 40px;
    margin-left: 100px;
  }
  .documents li {
    height: 40px;
    font-size: 18px;
    line-height: 40px;
    margin-right: 30px;
  }
  .documents li a {
    text-decoration: none;
    color: #909399;
  }
  .tools {
    flex: 1;
    text-align: right;
  }
  .routes-dropdown {
    display: inline-block;
    margin-top: 6px;
    margin-right: 20px;
  }
</style>
