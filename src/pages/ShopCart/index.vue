<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="good in cartInfoList" :key="good.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="good.isChecked"
              @change="updateChecked(good.skuId, $event.target.checked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="good.imgUrl" />
            <div class="item-msg">{{ good.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ good.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, good)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              class="itxt"
              minnum="1"
              :value="good.skuNum"
              @change="handler('change', $event.target.value * 1, good)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('plus', 1, good)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ good.skuNum * good.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCart(good.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          ref="isAllChecked"
          :checked="isAllChecked"
          @change="changeAllChecked($event.target.checked)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ summoney }}.00</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import { mapState } from 'vuex'
export default {
  name: 'ShopCart',
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$store.dispatch('getCartList')
    },
    handler: throttle(async function (type, disNum, good) {
      switch (type) {
        case 'plus':
          disNum = 1
          break
        case 'minus':
          disNum = good.skuNum > 1 ? -1 : 0
          break
        case 'change':
          if (disNum < 1 || isNaN(disNum)) {
            disNum = 0
          } else {
            disNum = parseInt(disNum) - good.skuNum
          }
      }
      try {
        await this.$store.dispatch('addOrUpdateCart', {
          skuId: good.skuId,
          skuNum: disNum
        })
        this.getData()
      } catch (error) {
        console.log(error.message)
      }
    }, 2500),
    async deleteCart(skuId) {
      try {
        await this.$store.dispatch('deleteCart', skuId)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    async updateChecked(skuId, isChecked) {
      isChecked = isChecked ? '1' : '0'
      try {
        await this.$store.dispatch('updateChecked', { skuId, isChecked })
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    async deleteAllCheckedCart() {
      try {
        await this.$store.dispatch('deleteAllCheckedCart', this.cartInfoList)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    async changeAllChecked(isChecked) {
      // 在发送请求前把当前页面的静态数据修改了，因为响应返回得太慢
      isChecked = isChecked ? '1' : '0'
      this.cartInfoList.forEach((item) => {
        item.isChecked = Number(isChecked)
      })
      try {
        await this.$store.dispatch('changeAllChecked', isChecked)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    ...mapState({
      cartInfoList: (state) => state.shopcart.cartInfoList
    }),
    // 购买产品的总价
    summoney() {
      if (this.cartInfoList.length) {
        let sum = 0
        this.cartInfoList.forEach(
          (item) => (sum += item.skuNum * item.skuPrice)
        )
        return sum
      }
    },
    // 一进入页面判断是否全选
    isAllChecked() {
      if (!this.cartInfoList.length) return false
      return this.cartInfoList.every((item) => item.isChecked === 1)
    }
  },
  watch: {
    // 当数组为空，也就是购物车里没商品时，禁用复选框
    cartInfoList() {
      if (!this.cartInfoList.length) this.$refs.isAllChecked.disabled = true
    }
  }
}
</script>

<style lang="less" scoped>
a {
  cursor: pointer;
}
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>