<template>
  <div class="container">
    <skeleton :show="!!filterProductList.length">
      <div class="productionList">
            <div
              v-for="(item, key) in filterProductList"
              :key="item.goods_id + key"
              class="production"
            >
              <div class="logoWrap">
                <div class="tag">{{ item.tag }}</div>
                <div
                    v-if="item.svga_photo"
                    class="play"
                ></div>
                <img class="logo" :src="item.photo" />
                <div class="tip">
                  recharge
                </div>
              </div>
              <div class="detailWrap">
                <div class="name">{{ item.name }}</div>
                <div class="prizeWrap">
                  <div class="prizeDetail">
                    <div class="dia"></div>
                    <div class="prize">{{ item.real_price }}</div>
                    <div
                      class="originPrize"
                    >
                      {{ item.price }}
                    </div>
                  </div>
                  <div
                    class="off"
                  >
                    {{ `${item.discount / 100}%OFF` }}
                  </div>
                </div>
              </div>
            </div>
      </div>
    </skeleton>
  </div>
</template>
<script>
import skeleton from './skeleton'
export default {
  components: {
    skeleton
  },
  data: () => {
    return {
      filterProductList: []
    }
  },
  mounted() {
    setTimeout(() => {
      const res = JSON.parse(
            `{"goods_id":"5e7d6d331d41c801b95f594f","name":"skeletontest","photo":"https://o-static.ihago.net/ikxd/e545a3470091c784794ac21f3de80183/lanshuijin.png","svga_photo":"","tag":"new","type":1,"type":1805,"real_price":199,"price":299,"discount":8000,"update_time":1594695268}`
          )
      this.filterProductList = Array(10).fill(res)
    }, 3000)
  }
}
</script>
<style lang="scss">
.container {
  width: 100%;
  background: #f4f4f4;
  padding-top: 20px;
  padding-bottom: 10px;
}
.productionList {
  margin: 0 10px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.production {
  background: #ffffff;
  border-radius: 5px;
  width: 160px;
  min-height: 208px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.logoWrap {
  height: 136px;
  background-image: linear-gradient(180deg, #ffe6a7 0%, #fff7e2 100%);
  border-radius: 5px 5px 0 0;
  position: relative;
  padding-top: 24px;
}

.logo {
  display: block;
  width: 84px;
  height: 84px;
  margin: 0 auto;
}

.tip {
  font-family: Roboto-Regular;
  font-size: 10px;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 18px;
  opacity: 0.6;
  background: #ffc102;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
}

.tag {
  background-image: linear-gradient(90deg, #ff7dad 0%, #ff0000 100%);
  border-radius: 0 100px 100px 0;
  width: 50px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Roboto-Bold;
  font-size: 9px;
  color: #ffffff;
  letter-spacing: 0;
  position: absolute;
  left: 0;
  top: 10px;
  text-align: center;
  font-weight: bold;
}

.detailWrap {
  padding: 10px;

  .name {
    font-family: Roboto-Medium;
    font-size: 12px;
    color: #1d1d1d;
    letter-spacing: 0;
    line-height: 16px;
    margin-bottom: 12px;
    font-weight: bold;
  }
}

.prizeWrap {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .prizeDetail {
    display: flex;
    align-items: center;
    height: 24px;
  }

  .dia {
     width: 20px;
     height: 20px;
     background: url('./imgs/dia.png') no-repeat;
     background-size: 100%;
  }

  .prize {
    font-family: DINSchrift;
    font-size: 20px;
    color: #f5a623;
    letter-spacing: 0;
    margin: 0 2px;
  }

  .originPrize {
    text-decoration: line-through;
    font-family: DINSchrift;
    font-size: 12px;
    color: #bfbfbf;
    letter-spacing: 0;
    margin-top: 6px;
  }

  .off {
    border: 1px solid #fe4a6d;
    font-size: 10px;
    color: #fe4a6d;
    border-radius: 3px;
    height: 15px;
    display: flex;
    align-items: center;
    padding: 0 2px;
  }
}
</style>
