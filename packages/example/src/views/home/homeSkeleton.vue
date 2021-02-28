<script>
import Vue from 'vue'
const skeletonLoader = {
  name: 'skeletocnLoader',
  functional: true,
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  render(h, context) {
    const { show } = context.props
    if (!show || window.__PRERENDER_INJECTED__) {
      const html = `<div data-v-a83bd3b0="" class="index skeleton--animate skeleton-815124810"><div data-v-5954443c="" data-v-a83bd3b0="" class="home router-view"><header data-v-5954443c="" class="home-header"><div data-v-5954443c="" class="header-search"><svg data-v-c8a70580="" data-v-5954443c="" aria-hidden="true" class="search-icon svg-icon sk-circle sk-svg" style="width: 0.5288rem; height: 0.64rem;"></svg><span data-v-5954443c="" class="search-title sk-transparent sk-text-30-0000 sk-text" style="background-size: 61.0985% 1.0667rem;">推荐搜索 关键词</span></div><svg data-v-c8a70580="" data-v-5954443c="" aria-hidden="true" class="customer-service-icon svg-icon sk-circle sk-svg" style="width: 0.64rem; height: 0.64rem;"></svg></header><div data-v-5954443c="" class="swiper-carousel van-swipe"><div class="van-swipe__track" style="transition-duration: 500ms; transform: translateX(-750px); width: 1500px;"><div data-v-5954443c="" class="van-swipe-item" style="width: 375px;"><img data-v-5954443c="" class="lazy_img sk-image--398215845" data-src="img/banner5.fb21a19b.jpg" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" lazy="loaded" width="375" height="250"></div><div data-v-5954443c="" class="van-swipe-item" style="width: 375px;"><img data-v-5954443c="" class="lazy_img sk-image-37408925" data-src="img/banner6.3b281aa3.jpg" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" lazy="loaded" width="375" height="250"></div><div data-v-5954443c="" class="van-swipe-item" style="width: 375px;"><img data-v-5954443c="" class="lazy_img sk-image--995250277" data-src="img/banner7.f187995a.jpg" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" lazy="loaded" width="375" height="250"></div></div></div><div data-v-5954443c="" class="swiper-cls"><div data-v-5954443c="" class="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-autoheight sk-transparent" style="cursor: grab;"> <div class="swiper-wrapper" style="width: 480px; transition-duration: 0ms; transform: translate3d(0px, 0px, 0px); height: 90px;"><div data-v-5954443c="" class="swiper-slide swiper-slide-active" style="width: 240px;"><img data-v-5954443c="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" class="slide_img sk-image-1998817271" width="222" height="90"></div><div data-v-5954443c="" class="swiper-slide swiper-slide-next swiper-slide-prev" style="width: 240px;"><img data-v-5954443c="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" class="slide_img sk-image--87705365" width="222" height="90"></div></div>    <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div></div><section data-v-5954443c="" class="home-tags"><ul data-v-5954443c="" class="tags-content"><li data-v-5954443c="" class="tags-item"><svg data-v-c8a70580="" data-v-5954443c="" aria-hidden="true" class="tags-icon svg-icon sk-circle sk-svg" style="width: 1.1467rem; height: 1.1467rem;"></svg><span data-v-5954443c="" class="item-text sk-transparent sk-text-14-2857 sk-text" style="background-size: 100% 0.4107rem;">链猫精品</span></li><li data-v-5954443c="" class="tags-item"><svg data-v-c8a70580="" data-v-5954443c="" aria-hidden="true" class="tags-icon svg-icon sk-circle sk-svg" style="width: 1.1467rem; height: 1.1467rem;"></svg><span data-v-5954443c="" class="item-text sk-transparent sk-text-14-2857 sk-text" style="background-size: 100% 0.4107rem;">CM专区</span></li><li data-v-5954443c="" class="tags-item"><svg data-v-c8a70580="" data-v-5954443c="" aria-hidden="true" class="tags-icon svg-icon sk-circle sk-svg" style="width: 1.1467rem; height: 1.1467rem;"></svg><span data-v-5954443c="" class="item-text sk-transparent sk-text-14-2857 sk-text" style="background-size: 100% 0.4107rem;">领CM币</span></li><li data-v-5954443c="" class="tags-item"><svg data-v-c8a70580="" data-v-5954443c="" aria-hidden="true" class="tags-icon svg-icon sk-circle sk-svg" style="width: 1.1467rem; height: 1.1467rem;"></svg><span data-v-5954443c="" class="item-text sk-transparent sk-text-14-2857 sk-text" style="background-size: 100% 0.4107rem;">领券</span></li><li data-v-5954443c="" class="tags-item"><svg data-v-c8a70580="" data-v-5954443c="" aria-hidden="true" class="tags-icon svg-icon sk-circle sk-svg" style="width: 1.1467rem; height: 1.1467rem;"></svg><span data-v-5954443c="" class="item-text sk-transparent sk-text-14-2857 sk-text" style="background-size: 100% 0.4107rem;">链猫会员</span></li></ul></section><section data-v-5954443c="" class="spike-area"><ul data-v-5954443c="" class="spike-top"><li data-v-5954443c="" class="top-left"><div data-v-5954443c="" class="item-top"><span data-v-5954443c="" class="item-title sk-transparent sk-text-14-2857 sk-text" style="background-size: 98.3265% 0.5227rem;">链猫秒杀</span><div data-v-5954443c="" class="time-text" style="border: none;"><span data-v-5954443c="" class="eight-time sk-transparent sk-text-19-4444 sk-text" style="background-size: 68.1176% 0.48rem; background-position-x: 50%;">8点场</span><div data-v-5954443c="" class="time-count-down van-count-down"><span data-v-5954443c="" class="time-item sk-transparent sk-opacity">09</span><i data-v-5954443c="" class="tow-point sk-transparent sk-opacity">:</i><span data-v-5954443c="" class="time-item sk-transparent sk-opacity">59</span><i data-v-5954443c="" class="tow-point sk-transparent sk-opacity">:</i><span data-v-5954443c="" class="time-item sk-transparent sk-opacity">49</span></div></div></div><div data-v-5954443c="" class="item-info"><div data-v-5954443c="" class="item-content"><img data-v-5954443c="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="54" height="54" class="sk-image--759494994"><span data-v-5954443c="" class="new-price sk-transparent sk-text-14-2857 sk-text" style="background-size: 100% 0.4107rem;">¥298</span><span data-v-5954443c="" class="old-price sk-transparent sk-text-14-2857 sk-text" style="text-decoration-color: transparent; background-size: 100% 0.336rem;">¥399</span></div><div data-v-5954443c="" class="item-content"><img data-v-5954443c="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="54" height="54" class="sk-image-19262447"><span data-v-5954443c="" class="new-price sk-transparent sk-text-14-2857 sk-text" style="background-size: 100% 0.4107rem;">¥298</span><span data-v-5954443c="" class="old-price sk-transparent sk-text-14-2857 sk-text" style="text-decoration-color: transparent; background-size: 100% 0.336rem;">¥399</span></div><div data-v-5954443c="" class="item-content"><img data-v-5954443c="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="54" height="54" class="sk-image--639008257"><span data-v-5954443c="" class="new-price sk-transparent sk-text-14-2857 sk-text" style="background-size: 100% 0.4107rem;">¥298</span><span data-v-5954443c="" class="old-price sk-transparent sk-text-14-2857 sk-text" style="text-decoration-color: transparent; background-size: 100% 0.336rem;">¥399</span></div></div></li><li data-v-5954443c="" class="top-right"><div data-v-5954443c="" class="right-header"><span data-v-5954443c="" class="cat-spike-text sk-transparent sk-text-14-2857 sk-text" style="background-size: 100% 0.5227rem;">发现好货</span><span data-v-5954443c="" class="tag-text sk-transparent sk-text-14-2857 sk-text" style="border: none; background-size: 68.75% 0.4107rem; background-position-x: 50%;">品质好物</span></div><span data-v-5954443c="" class="good-item sk-transparent sk-text-14-2857 sk-text" style="background-size: 100% 0.4107rem;">好物不贵</span><div data-v-5954443c="" class="item-imgs"><img data-v-5954443c="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="63" height="63" class="sk-image--799958967"><img data-v-5954443c="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="63" height="63" class="sk-image-8848841"></div></li></ul><ul data-v-5954443c="" class="spike-center"><li data-v-5954443c="" class="center-item"><span data-v-5954443c="" class="center-title sk-transparent sk-text-14-2857 sk-text" style="background-size: 100% 0.5227rem;">特价秒杀</span><span data-v-5954443c="" class="center-descr sk-transparent sk-text-14-2857 sk-text" style="background-size: 100% 0.4107rem;">10元抢购</span><img data-v-5954443c="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="70" height="70" class="sk-image--31977632"></li><li data-v-5954443c="" class="center-item"><span data-v-5954443c="" class="center-title sk-transparent sk-text-14-2857 sk-text" style="background-size: 100% 0.5227rem;">品牌秒杀</span><span data-v-5954443c="" class="center-descr sk-transparent sk-text-14-2857 sk-text" style="color: rgb(221, 55, 73); background-size: 100% 0.4107rem;">笔记本秒杀</span><img data-v-5954443c="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="70" height="70" class="sk-image--503435018"></li><li data-v-5954443c="" class="center-item"><span data-v-5954443c="" class="center-title sk-transparent sk-text-14-2857 sk-text" style="background-size: 100% 0.5227rem;">新品首发</span><span data-v-5954443c="" class="center-descr sk-transparent sk-text-14-2857 sk-text" style="background-size: 100% 0.4107rem;">小黑盒新品</span><img data-v-5954443c="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="70" height="70" class="sk-image--364505225"></li><li data-v-5954443c="" class="center-item"><span data-v-5954443c="" class="center-title sk-transparent sk-text-14-2857 sk-text" style="background-size: 100% 0.5227rem;">优品排行</span><span data-v-5954443c="" class="center-descr sk-transparent sk-text-14-2857 sk-text" style="color: rgb(145, 201, 91); background-size: 100% 0.4107rem;">榜上好物购</span><img data-v-5954443c="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="70" height="70" class="sk-image-525684309"></li></ul><ul data-v-5954443c="" class="spike-bottom"><li data-v-5954443c="" class="bottom-left"><div data-v-5954443c="" class="bottom-left-header"><span data-v-5954443c="" class="big-buy sk-transparent sk-text-14-2857 sk-text" style="background-size: 100% 0.5227rem;">大牌购走</span><span data-v-5954443c="" class="goods-name sk-transparent" style="border: none;"> 戴尔 <svg data-v-c8a70580="" data-v-5954443c="" aria-hidden="true" class="svg-icon sk-circle sk-svg" style="width: 0.1067rem; height: 0.1867rem;"></svg></span></div><span data-v-5954443c="" class="belive-big sk-transparent sk-text-14-2857 sk-text" style="background-size: 39.2857% 0.4107rem;">信赖大品牌</span><div data-v-5954443c="" class="bottom-images"><img data-v-5954443c="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="70" height="70" class="sk-image-446856597"><img data-v-5954443c="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="70" height="70" class="sk-image-1045391823"></div></li><li data-v-5954443c="" class="bottom-left"><div data-v-5954443c="" class="bottom-left-header"><span data-v-5954443c="" class="big-buy sk-transparent sk-text-14-2857 sk-text" style="background-size: 100% 0.5227rem;">爱逛好店</span><span data-v-5954443c="" class="goods-name addColor sk-transparent sk-text-14-2857 sk-text" style="border: none; background-size: 66.6667% 0.4107rem; background-position-x: 50%;">懂你所要</span></div><span data-v-5954443c="" class="belive-big sk-transparent sk-text-14-2857 sk-text" style="background-size: 31.4286% 0.4107rem;">来逛个够</span><div data-v-5954443c="" class="bottom-images"><img data-v-5954443c="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="70" height="70" class="sk-image--832445694"><img data-v-5954443c="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="70" height="70" class="sk-image-281921175"></div></li></ul></section></div></div>`
      const component = Vue.compile(html)
      return h(component)
    } else {
      return context.children[0]
    }
  }
}
export default skeletonLoader
</script>
<style id="_skeleton-815124810_" type="text/css">
.skeleton-815124810 .sk-transparent {
  color: transparent !important;
}
.skeleton-815124810 .sk-circle {
  border-radius: 50%;
}
.skeleton-815124810 .sk-svg {
  background: #efefef !important;
}
.skeleton-815124810 .sk-text-30-0000 {
  background-image: linear-gradient(
    transparent 30%,
    #efefef 0%,
    #efefef 70%,
    transparent 0%
  ) !important;
  background-size: 100% 1.0667rem;
  position: relative !important;
}
.skeleton-815124810 .sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.skeleton-815124810 .sk-text-14-2857 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #efefef 0%,
    #efefef 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 0.4107rem;
  position: relative !important;
}
.skeleton-815124810 .sk-text-19-4444 {
  background-image: linear-gradient(
    transparent 19.4444%,
    #efefef 0%,
    #efefef 80.5556%,
    transparent 0%
  ) !important;
  background-size: 100% 0.48rem;
  position: relative !important;
}
.skeleton-815124810 .sk-opacity {
  opacity: 0 !important;
}
.skeleton-815124810 .sk-image--398215845 {
  background: #efefef !important;
}
.skeleton-815124810 .sk-image-37408925 {
  background: #efefef !important;
}
.skeleton-815124810 .sk-image--995250277 {
  background: #efefef !important;
}
.skeleton-815124810 .sk-image-1998817271 {
  background: #efefef !important;
}
.skeleton-815124810 .sk-image--87705365 {
  background: #efefef !important;
}
.skeleton-815124810 .sk-image--759494994 {
  background: #efefef !important;
}
.skeleton-815124810 .sk-image-19262447 {
  background: #efefef !important;
}
.skeleton-815124810 .sk-image--639008257 {
  background: #efefef !important;
}
.skeleton-815124810 .sk-image--799958967 {
  background: #efefef !important;
}
.skeleton-815124810 .sk-image-8848841 {
  background: #efefef !important;
}
.skeleton-815124810 .sk-image--31977632 {
  background: #efefef !important;
}
.skeleton-815124810 .sk-image--503435018 {
  background: #efefef !important;
}
.skeleton-815124810 .sk-image--364505225 {
  background: #efefef !important;
}
.skeleton-815124810 .sk-image-525684309 {
  background: #efefef !important;
}
.skeleton-815124810 .sk-image-446856597 {
  background: #efefef !important;
}
.skeleton-815124810 .sk-image-1045391823 {
  background: #efefef !important;
}
.skeleton-815124810 .sk-image--832445694 {
  background: #efefef !important;
}
.skeleton-815124810 .sk-image-281921175 {
  background: #efefef !important;
}
.skeleton--animate {
  animation: skeleton-blink 1.2s ease-in-out infinite;
}
@keyframes skeleton-blink {
  50% {
    opacity: 0.6;
  }
}
</style>
