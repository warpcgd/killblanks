
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
      const html = `<div class="productionList skeleton--animate skeleton--843045"><div class="production sk-transparent"><div class="logoWrap sk-transparent sk-image-4005 sk-rect"><div class="tag">new</div> <!----> <img src="https://o-static.ihago.net/ikxd/e62403ac0d365c57b4dbc1a0ab7e9cf4/128.png" class="logo"> <div class="tip">recharge</div></div> <div class="detailWrap sk-transparent"><div class="name sk-transparent sk-text-12-5000 sk-text" style="background-size: 49.0804% 16px;">skeleton-test</div> <div class="prizeWrap sk-transparent"><div class="prizeDetail sk-transparent"><div class="dia sk-image-615243 sk-rect"></div> <div class="prize sk-transparent sk-text-16-6667 sk-text" style="background-size: 91.9361% 30px;">199</div> <div class="originPrize sk-transparent sk-text-16-6667 sk-text" style="text-decoration-color: transparent; background-size: 91.9479% 18px;">
                299
              </div></div> <div class="off sk-transparent sk-text-16-6667 sk-text" style="border: none; background-size: 100% 15px;">
              80%OFF
            </div></div></div></div><div class="production sk-transparent"><div class="logoWrap sk-transparent sk-image-4005 sk-rect"><div class="tag">new</div> <!----> <img src="https://o-static.ihago.net/ikxd/e62403ac0d365c57b4dbc1a0ab7e9cf4/128.png" class="logo"> <div class="tip">recharge</div></div> <div class="detailWrap sk-transparent"><div class="name sk-transparent sk-text-12-5000 sk-text" style="background-size: 49.0804% 16px;">skeleton-test</div> <div class="prizeWrap sk-transparent"><div class="prizeDetail sk-transparent"><div class="dia sk-image-615243 sk-rect"></div> <div class="prize sk-transparent sk-text-16-6667 sk-text" style="background-size: 91.9361% 30px;">199</div> <div class="originPrize sk-transparent sk-text-16-6667 sk-text" style="text-decoration-color: transparent; background-size: 91.9479% 18px;">
                299
              </div></div> <div class="off sk-transparent sk-text-16-6667 sk-text" style="border: none; background-size: 100% 15px;">
              80%OFF
            </div></div></div></div><div class="production sk-transparent"><div class="logoWrap sk-transparent sk-image-4005 sk-rect"><div class="tag">new</div> <!----> <img src="https://o-static.ihago.net/ikxd/e62403ac0d365c57b4dbc1a0ab7e9cf4/128.png" class="logo"> <div class="tip">recharge</div></div> <div class="detailWrap sk-transparent"><div class="name sk-transparent sk-text-12-5000 sk-text" style="background-size: 49.0804% 16px;">skeleton-test</div> <div class="prizeWrap sk-transparent"><div class="prizeDetail sk-transparent"><div class="dia sk-image-615243 sk-rect"></div> <div class="prize sk-transparent sk-text-16-6667 sk-text" style="background-size: 91.9361% 30px;">199</div> <div class="originPrize sk-transparent sk-text-16-6667 sk-text" style="text-decoration-color: transparent; background-size: 91.9479% 18px;">
                299
              </div></div> <div class="off sk-transparent sk-text-16-6667 sk-text" style="border: none; background-size: 100% 15px;">
              80%OFF
            </div></div></div></div><div class="production sk-transparent"><div class="logoWrap sk-transparent sk-image-4005 sk-rect"><div class="tag">new</div> <!----> <img src="https://o-static.ihago.net/ikxd/e62403ac0d365c57b4dbc1a0ab7e9cf4/128.png" class="logo"> <div class="tip">recharge</div></div> <div class="detailWrap sk-transparent"><div class="name sk-transparent sk-text-12-5000 sk-text" style="background-size: 49.0804% 16px;">skeleton-test</div> <div class="prizeWrap sk-transparent"><div class="prizeDetail sk-transparent"><div class="dia sk-image-615243 sk-rect"></div> <div class="prize sk-transparent sk-text-16-6667 sk-text" style="background-size: 91.9361% 30px;">199</div> <div class="originPrize sk-transparent sk-text-16-6667 sk-text" style="text-decoration-color: transparent; background-size: 91.9479% 18px;">
                299
              </div></div> <div class="off sk-transparent sk-text-16-6667 sk-text" style="border: none; background-size: 100% 15px;">
              80%OFF
            </div></div></div></div><div class="production sk-transparent"><div class="logoWrap sk-transparent sk-image-4005 sk-rect"><div class="tag">new</div> <!----> <img src="https://o-static.ihago.net/ikxd/e62403ac0d365c57b4dbc1a0ab7e9cf4/128.png" class="logo"> <div class="tip">recharge</div></div> <div class="detailWrap sk-transparent"><div class="name sk-transparent sk-text-12-5000 sk-text" style="background-size: 49.0804% 16px;">skeleton-test</div> <div class="prizeWrap sk-transparent"><div class="prizeDetail sk-transparent"><div class="dia sk-image-615243 sk-rect"></div> <div class="prize sk-transparent sk-text-16-6667 sk-text" style="background-size: 91.9361% 30px;">199</div> <div class="originPrize sk-transparent sk-text-16-6667 sk-text" style="text-decoration-color: transparent; background-size: 91.9479% 18px;">
                299
              </div></div> <div class="off sk-transparent sk-text-16-6667 sk-text" style="border: none; background-size: 100% 15px;">
              80%OFF
            </div></div></div></div><div class="production sk-transparent"><div class="logoWrap sk-transparent sk-image-4005 sk-rect"><div class="tag">new</div> <!----> <img src="https://o-static.ihago.net/ikxd/e62403ac0d365c57b4dbc1a0ab7e9cf4/128.png" class="logo"> <div class="tip">recharge</div></div> <div class="detailWrap sk-transparent"><div class="name sk-transparent sk-text-12-5000 sk-text" style="background-size: 49.0804% 16px;">skeleton-test</div> <div class="prizeWrap sk-transparent"><div class="prizeDetail sk-transparent"><div class="dia sk-image-615243 sk-rect"></div> <div class="prize sk-transparent sk-text-16-6667 sk-text" style="background-size: 91.9361% 30px;">199</div> <div class="originPrize sk-transparent sk-text-16-6667 sk-text" style="text-decoration-color: transparent; background-size: 91.9479% 18px;">
                299
              </div></div> <div class="off sk-transparent sk-text-16-6667 sk-text" style="border: none; background-size: 100% 15px;">
              80%OFF
            </div></div></div></div><div class="production sk-transparent"><div class="logoWrap sk-transparent sk-image-4005 sk-rect"><div class="tag">new</div> <!----> <img src="https://o-static.ihago.net/ikxd/e62403ac0d365c57b4dbc1a0ab7e9cf4/128.png" class="logo"> <div class="tip">recharge</div></div> <div class="detailWrap sk-transparent"><div class="name sk-transparent sk-text-12-5000 sk-text" style="background-size: 49.0804% 16px;">skeleton-test</div> <div class="prizeWrap sk-transparent"><div class="prizeDetail sk-transparent"><div class="dia sk-image-615243 sk-rect"></div> <div class="prize sk-transparent sk-text-16-6667 sk-text" style="background-size: 91.9361% 30px;">199</div> <div class="originPrize sk-transparent sk-text-16-6667 sk-text" style="text-decoration-color: transparent; background-size: 91.9479% 18px;">
                299
              </div></div> <div class="off sk-transparent sk-text-16-6667 sk-text" style="border: none; background-size: 100% 15px;">
              80%OFF
            </div></div></div></div><div class="production sk-transparent"><div class="logoWrap sk-transparent sk-image-4005 sk-rect"><div class="tag">new</div> <!----> <img src="https://o-static.ihago.net/ikxd/e62403ac0d365c57b4dbc1a0ab7e9cf4/128.png" class="logo"> <div class="tip">recharge</div></div> <div class="detailWrap sk-transparent"><div class="name sk-transparent sk-text-12-5000 sk-text" style="background-size: 49.0804% 16px;">skeleton-test</div> <div class="prizeWrap sk-transparent"><div class="prizeDetail sk-transparent"><div class="dia sk-image-615243 sk-rect"></div> <div class="prize sk-transparent sk-text-16-6667 sk-text" style="background-size: 91.9361% 30px;">199</div> <div class="originPrize sk-transparent sk-text-16-6667 sk-text" style="text-decoration-color: transparent; background-size: 91.9479% 18px;">
                299
              </div></div> <div class="off sk-transparent sk-text-16-6667 sk-text" style="border: none; background-size: 100% 15px;">
              80%OFF
            </div></div></div></div><div class="production sk-transparent"><div class="logoWrap sk-transparent sk-image-4005 sk-rect"><div class="tag">new</div> <!----> <img src="https://o-static.ihago.net/ikxd/e62403ac0d365c57b4dbc1a0ab7e9cf4/128.png" class="logo"> <div class="tip">recharge</div></div> <div class="detailWrap sk-transparent"><div class="name sk-transparent sk-text-12-5000 sk-text" style="background-size: 49.0804% 16px;">skeleton-test</div> <div class="prizeWrap sk-transparent"><div class="prizeDetail sk-transparent"><div class="dia sk-image-615243 sk-rect"></div> <div class="prize sk-transparent sk-text-16-6667 sk-text" style="background-size: 91.9361% 30px;">199</div> <div class="originPrize sk-transparent sk-text-16-6667 sk-text" style="text-decoration-color: transparent; background-size: 91.9479% 18px;">
                299
              </div></div> <div class="off sk-transparent sk-text-16-6667 sk-text" style="border: none; background-size: 100% 15px;">
              80%OFF
            </div></div></div></div><div class="production sk-transparent"><div class="logoWrap sk-transparent sk-image-4005 sk-rect"><div class="tag">new</div> <!----> <img src="https://o-static.ihago.net/ikxd/e62403ac0d365c57b4dbc1a0ab7e9cf4/128.png" class="logo"> <div class="tip">recharge</div></div> <div class="detailWrap sk-transparent"><div class="name sk-transparent sk-text-12-5000 sk-text" style="background-size: 49.0804% 16px;">skeleton-test</div> <div class="prizeWrap sk-transparent"><div class="prizeDetail sk-transparent"><div class="dia sk-image-615243 sk-rect"></div> <div class="prize sk-transparent sk-text-16-6667 sk-text" style="background-size: 91.9361% 30px;">199</div> <div class="originPrize sk-transparent sk-text-16-6667 sk-text" style="text-decoration-color: transparent; background-size: 91.9479% 18px;">
                299
              </div></div> <div class="off sk-transparent sk-text-16-6667 sk-text" style="border: none; background-size: 100% 15px;">
              80%OFF
            </div></div></div></div></div>`
      const component = Vue.compile(html)
      return h(component)
    } else {
      return context.children[0]
    }
  }
}
export default skeletonLoader
</script>
  <style id="_skeleton--843045_" type="text/css">
.skeleton--843045 .sk-transparent {
  color: transparent !important;
}
.skeleton--843045 .sk-text-12-5000 {
  background-image: linear-gradient(
    transparent 12.5%,
    #efefef 0%,
    #efefef 87.5%,
    transparent 0%
  ) !important;
  background-size: 100% 16px;
  position: relative !important;
}
.skeleton--843045 .sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.skeleton--843045 .sk-text-16-6667 {
  background-image: linear-gradient(
    transparent 16.6667%,
    #efefef 0%,
    #efefef 83.3333%,
    transparent 0%
  ) !important;
  background-size: 100% 30px;
  position: relative !important;
}
.skeleton--843045 .sk-image-615243 {
  background: #efefef !important;
}
.skeleton--843045 .sk-rect {
  border-radius: 0;
}
.skeleton--843045 .sk-image-4005 {
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
