<template>
  <div class="fullpage">
    <section class="cover">
      <div class="cover-main">
        <div class="skeleton-demo" :class="isActive ? 'fadeInUp' : ''">
          <img src="./imgs/preview.gif" alt="" />
        </div>
        <div class="skeleton-intro" :class="isActive ? 'fadeInUp' : ''">
          <div class="skeleton-container">
            <h2>Killblanks</h2>
            <ul :class="isActive ? 'fadeIn' : ''">
              <li>帮助你解决页面白屏问题</li>
              <li>更好的用户体验</li>
              <li>内容加载更快</li>
            </ul>
            <div class="badge" :class="isActive ? 'fadeIn' : ''">
              <a href="https://github.com/warpcgd/killblanks/network"
                ><img
                  alt="GitHub forks"
                  src="https://img.shields.io/github/forks/warpcgd/killblanks?color=%234abf8a"
              /></a>
              <a href="https://github.com/warpcgd/killblanks/stargazers"
                ><img
                  alt="GitHub stars"
                  src="https://img.shields.io/github/stars/warpcgd/killblanks?color=4abf8a"
              /></a>
              <a href="https://www.npmjs.com/package/@killblanks/prerender"
                ><img
                  alt="npm downloads"
                  src="https://img.shields.io/npm/dw/@killblanks/prerender?color=4abf8a"
              /></a>
              <a href="https://github.com/warpcgd/killblanks/blob/main/LICENSE"
                ><img
                  alt="GitHub license"
                  src="https://img.shields.io/github/license/warpcgd/killblanks?color=3eaf7c"
              /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="row">
        <!-- <h3>Features</h3> -->
        <div class="features">
          <div class="feature">
            <h2>简单配置⚙️</h2>
            <p>通过简单的配置即可为页面添加预渲染和骨架屏</p>
          </div>
          <div class="feature">
            <h2>预渲染+骨架屏💀</h2>
            <p>你可以只使用预渲染，也可以预渲染+骨架屏组合使用</p>
          </div>
          <div class="feature">
            <h2>提升页面性能⚡</h2>
            <p>通过使用预渲染和骨架屏可以明显提升页面FCP和LCP</p>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="row">
        <h3>快速开始🦴</h3>
        <Content slot-key="startDemo" />
      </div>
    </section>
    <div class="footer">
      <div class="footer-bottom">Apache-2.0 Licensed | Copyright © 2021-present</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isActive: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.isActive = true
    }, 0)
  }
}
</script>
<style scoped lang="scss">
body {
  -webkit-font-smoothing: antialiased;
  color: #415c7a;
  font-size: 16px;
  letter-spacing: 0;
  margin: 0;
  overflow-x: hidden;
}
.fullpage {
  position: relative;
  min-height: 100%;
  margin-top: 4rem;
}
.content:not(.custom) {
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
}

.custom-layout {
  padding-top: 0;
}
.img {
  width: 300px;
}
section.cover {
  -ms-flex-align: center;
  align-items: center;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  height: 50vh;
  display: flex;
  background-image: linear-gradient(60deg, #29323c 0%, #435d7b 100%);
  color: #fff;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.cover-main {
  flex: 0 0 auto;
  width: 60rem;
  display: flex;
  height: 100%;
  overflow: hidden;
}

.skeleton-demo {
  width: 50%;
  flex: 0 0 auto;
  padding-top: 20px;
  transform: translate3d(0, 100%, 0);
  img {
    width: 300px;
    display: block;
    margin: 0 auto;
  }
}

.skeleton-intro {
  width: 50%;
  flex: 0 0 auto;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translate3d(0, 100%, 0);
  h2 {
    font-size: 4rem;
    font-weight: bolder;
    color: #fff;
  }
}

section .row {
  margin: 0 auto;
  max-width: 60rem;
  width: 100%;
}
section h3 {
  font-size: 1.5rem;
  text-align: center;
  margin: 2rem;
  margin-top: 3.5rem;
  font-weight: bold;
}
section .features {
  padding: 1.2rem 0;
  margin-top: 3.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: stretch;
  justify-content: space-between;
}
.features {
  .feature {
    flex-grow: 1;
    flex-basis: 25%;
    max-width: 25%;
    h2 {
      font-size: 1.5rem;
      font-weight: bold;
      border-bottom: none;
      padding-bottom: 0;
      color: #333;
      text-align: center;
    }
    p {
      margin-top: 1rem;
      font-size: 1rem;
      color: #333;
    }
  }
}

.footer {
    clear: both;
    font-size: 0.875rem;
    background-color: #000;
    position: relative;
    color: rgba(255, 255, 255, 0.4);
  .footer-bottom {
    max-width: 1200px;
    text-align: center;
    padding: 16px 0;
    margin: 0 auto;
    line-height: 32px;
    overflow: hidden;
    font-size: 16px;
    font-variant: tabular-nums;
  }
}



.fadeInUp {
  animation-name: fadeInUp;
  animation-duration: 1s;
  animation-fill-mode: both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}


.fadeIn {
  animation-delay: 500ms;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: fadeIn;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@media (max-width: 767px) {
  .home .feature {
    max-width: 80%;
  }
}

</style>

