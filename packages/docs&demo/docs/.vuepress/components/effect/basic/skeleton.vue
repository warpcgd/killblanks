
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
        const html = `<div class="container skeleton--animate skeleton-1402857468"><div class="productionList"><div class="production sk-transparent"><div class="logoWrap sk-transparent sk-image--1113650907 sk-rect"><div class="tag">new</div> <!----> <img src="https://o-static.ihago.net/ikxd/e545a3470091c784794ac21f3de80183/lanshuijin.png" class="logo"> <div class="tip">
                recharge
              </div></div> <div class="detailWrap sk-transparent"><div class="name sk-transparent sk-text-12-5000 sk-text" style="background-size: 49.5089% 1rem;">skeletontest</div> <div class="prizeWrap sk-transparent"><div class="prizeDetail sk-transparent"><div class="dia sk-image--1229617119 sk-rect"></div> <div class="prize sk-transparent sk-text-16-6667 sk-text" style="background-size: 100% 1.875rem;">199</div> <div class="originPrize sk-transparent sk-text-16-6667 sk-text" style="text-decoration-color: transparent; background-size: 100% 1.125rem;">
                    299
                  </div></div> <div class="off sk-transparent sk-text-16-6667 sk-text" style="border: none; background-size: 100% 0.9375rem;">
                  80%OFF
                </div></div></div></div><div class="production sk-transparent"><div class="logoWrap sk-transparent sk-image--1113650907 sk-rect"><div class="tag">new</div> <!----> <img src="https://o-static.ihago.net/ikxd/e545a3470091c784794ac21f3de80183/lanshuijin.png" class="logo"> <div class="tip">
                recharge
              </div></div> <div class="detailWrap sk-transparent"><div class="name sk-transparent sk-text-12-5000 sk-text" style="background-size: 49.5089% 1rem;">skeletontest</div> <div class="prizeWrap sk-transparent"><div class="prizeDetail sk-transparent"><div class="dia sk-image--1229617119 sk-rect"></div> <div class="prize sk-transparent sk-text-16-6667 sk-text" style="background-size: 100% 1.875rem;">199</div> <div class="originPrize sk-transparent sk-text-16-6667 sk-text" style="text-decoration-color: transparent; background-size: 100% 1.125rem;">
                    299
                  </div></div> <div class="off sk-transparent sk-text-16-6667 sk-text" style="border: none; background-size: 100% 0.9375rem;">
                  80%OFF
                </div></div></div></div><div class="production sk-transparent"><div class="logoWrap sk-transparent sk-image--1113650907 sk-rect"><div class="tag">new</div> <!----> <img src="https://o-static.ihago.net/ikxd/e545a3470091c784794ac21f3de80183/lanshuijin.png" class="logo"> <div class="tip">
                recharge
              </div></div> <div class="detailWrap sk-transparent"><div class="name sk-transparent sk-text-12-5000 sk-text" style="background-size: 49.5089% 1rem;">skeletontest</div> <div class="prizeWrap sk-transparent"><div class="prizeDetail sk-transparent"><div class="dia sk-image--1229617119 sk-rect"></div> <div class="prize sk-transparent sk-text-16-6667 sk-text" style="background-size: 100% 1.875rem;">199</div> <div class="originPrize sk-transparent sk-text-16-6667 sk-text" style="text-decoration-color: transparent; background-size: 100% 1.125rem;">
                    299
                  </div></div> <div class="off sk-transparent sk-text-16-6667 sk-text" style="border: none; background-size: 100% 0.9375rem;">
                  80%OFF
                </div></div></div></div><div class="production sk-transparent"><div class="logoWrap sk-transparent sk-image--1113650907 sk-rect"><div class="tag">new</div> <!----> <img src="https://o-static.ihago.net/ikxd/e545a3470091c784794ac21f3de80183/lanshuijin.png" class="logo"> <div class="tip">
                recharge
              </div></div> <div class="detailWrap sk-transparent"><div class="name sk-transparent sk-text-12-5000 sk-text" style="background-size: 49.5089% 1rem;">skeletontest</div> <div class="prizeWrap sk-transparent"><div class="prizeDetail sk-transparent"><div class="dia sk-image--1229617119 sk-rect"></div> <div class="prize sk-transparent sk-text-16-6667 sk-text" style="background-size: 100% 1.875rem;">199</div> <div class="originPrize sk-transparent sk-text-16-6667 sk-text" style="text-decoration-color: transparent; background-size: 100% 1.125rem;">
                    299
                  </div></div> <div class="off sk-transparent sk-text-16-6667 sk-text" style="border: none; background-size: 100% 0.9375rem;">
                  80%OFF
                </div></div></div></div><div class="production sk-transparent"><div class="logoWrap sk-transparent sk-image--1113650907 sk-rect"><div class="tag">new</div> <!----> <img src="https://o-static.ihago.net/ikxd/e545a3470091c784794ac21f3de80183/lanshuijin.png" class="logo"> <div class="tip">
                recharge
              </div></div> <div class="detailWrap sk-transparent"><div class="name sk-transparent sk-text-12-5000 sk-text" style="background-size: 49.5089% 1rem;">skeletontest</div> <div class="prizeWrap sk-transparent"><div class="prizeDetail sk-transparent"><div class="dia sk-image--1229617119 sk-rect"></div> <div class="prize sk-transparent sk-text-16-6667 sk-text" style="background-size: 100% 1.875rem;">199</div> <div class="originPrize sk-transparent sk-text-16-6667 sk-text" style="text-decoration-color: transparent; background-size: 100% 1.125rem;">
                    299
                  </div></div> <div class="off sk-transparent sk-text-16-6667 sk-text" style="border: none; background-size: 100% 0.9375rem;">
                  80%OFF
                </div></div></div></div><div class="production sk-transparent"><div class="logoWrap sk-transparent sk-image--1113650907 sk-rect"><div class="tag">new</div> <!----> <img src="https://o-static.ihago.net/ikxd/e545a3470091c784794ac21f3de80183/lanshuijin.png" class="logo"> <div class="tip">
                recharge
              </div></div> <div class="detailWrap sk-transparent"><div class="name sk-transparent sk-text-12-5000 sk-text" style="background-size: 49.5089% 1rem;">skeletontest</div> <div class="prizeWrap sk-transparent"><div class="prizeDetail sk-transparent"><div class="dia sk-image--1229617119 sk-rect"></div> <div class="prize sk-transparent sk-text-16-6667 sk-text" style="background-size: 100% 1.875rem;">199</div> <div class="originPrize sk-transparent sk-text-16-6667 sk-text" style="text-decoration-color: transparent; background-size: 100% 1.125rem;">
                    299
                  </div></div> <div class="off sk-transparent sk-text-16-6667 sk-text" style="border: none; background-size: 100% 0.9375rem;">
                  80%OFF
                </div></div></div></div><div class="production sk-transparent"><div class="logoWrap sk-transparent sk-image--1113650907 sk-rect"><div class="tag">new</div> <!----> <img src="https://o-static.ihago.net/ikxd/e545a3470091c784794ac21f3de80183/lanshuijin.png" class="logo"> <div class="tip">
                recharge
              </div></div> <div class="detailWrap sk-transparent"><div class="name sk-transparent sk-text-12-5000 sk-text" style="background-size: 49.5089% 1rem;">skeletontest</div> <div class="prizeWrap sk-transparent"><div class="prizeDetail sk-transparent"><div class="dia sk-image--1229617119 sk-rect"></div> <div class="prize sk-transparent sk-text-16-6667 sk-text" style="background-size: 100% 1.875rem;">199</div> <div class="originPrize sk-transparent sk-text-16-6667 sk-text" style="text-decoration-color: transparent; background-size: 100% 1.125rem;">
                    299
                  </div></div> <div class="off sk-transparent sk-text-16-6667 sk-text" style="border: none; background-size: 100% 0.9375rem;">
                  80%OFF
                </div></div></div></div><div class="production sk-transparent"><div class="logoWrap sk-transparent sk-image--1113650907 sk-rect"><div class="tag">new</div> <!----> <img src="https://o-static.ihago.net/ikxd/e545a3470091c784794ac21f3de80183/lanshuijin.png" class="logo"> <div class="tip">
                recharge
              </div></div> <div class="detailWrap sk-transparent"><div class="name sk-transparent sk-text-12-5000 sk-text" style="background-size: 49.5089% 1rem;">skeletontest</div> <div class="prizeWrap sk-transparent"><div class="prizeDetail sk-transparent"><div class="dia sk-image--1229617119 sk-rect"></div> <div class="prize sk-transparent sk-text-16-6667 sk-text" style="background-size: 100% 1.875rem;">199</div> <div class="originPrize sk-transparent sk-text-16-6667 sk-text" style="text-decoration-color: transparent; background-size: 100% 1.125rem;">
                    299
                  </div></div> <div class="off sk-transparent sk-text-16-6667 sk-text" style="border: none; background-size: 100% 0.9375rem;">
                  80%OFF
                </div></div></div></div></div></div>`
        const component = Vue.compile(html)
        return h(component)
      } else {
        return context.children[0]
      }
    }
  }
  export default skeletonLoader
  </script>
  <style id="_skeleton-1402857468_" type="text/css">.skeleton-1402857468 .sk-transparent {
    color: transparent !important;
  }
.skeleton-1402857468 .sk-text-12-5000 {
    background-image: linear-gradient(transparent 12.5000%, #EFEFEF 0%, #EFEFEF 87.5000%, transparent 0%) !important;
    background-size: 100% 1.0000rem;
    position: relative !important;
  }
.skeleton-1402857468 .sk-text {
    background-origin: content-box !important;
    background-clip: content-box !important;
    background-color: transparent !important;
    color: transparent !important;
    background-repeat: repeat-y !important;
  }
.skeleton-1402857468 .sk-text-16-6667 {
    background-image: linear-gradient(transparent 16.6667%, #EFEFEF 0%, #EFEFEF 83.3333%, transparent 0%) !important;
    background-size: 100% 1.8750rem;
    position: relative !important;
  }
.skeleton-1402857468 .sk-image--1229617119 {
    background: #EFEFEF !important;
  }
.skeleton-1402857468 .sk-rect {
    border-radius: 0;
  }
.skeleton-1402857468 .sk-image--1113650907 {
    background: #EFEFEF !important;
  }
 .skeleton--animate {
    animation: skeleton-blink 1.2s ease-in-out infinite
  }
 @keyframes skeleton-blink {
    50% {
      opacity: 0.6;
    }
  }
</style>
