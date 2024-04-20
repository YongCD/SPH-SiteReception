<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                :class="{ cur: currentIndex === index }">
                <h3 @mouseenter="changeIndex(index)">
                  <a :data-category-name="c1.categoryName" :data-category1-id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <!-- <div class="item-list clearfix" :style="{ display: currentIndex === index ? 'block' : 'none' }"> -->
                <div class="item-list clearfix" v-show="currentIndex === index">
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-category-name="c2.categoryName" :data-category2-id="c2.categoryId">{{ c2.categoryName
                          }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-category-name="c3.categoryName" :data-category3-id="c3.categoryId">{{ c3.categoryName
                            }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>

      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { throttle } from 'lodash'
export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: -1,
      show: false
    }
  },
  mounted() {
    if (this.$route.path === '/home') this.show = true
  },
  computed: {
    ...mapState({
      categoryList: state => state.home.categoryList.slice(0, 16)
    })
  },
  methods: {
    changeIndex: throttle(function (index) {
      this.currentIndex = index
    }, 10),
    enterShow() {
      this.show = true
    },
    leaveShow() {
      if (this.$route.path !== '/home') this.show = false
      this.currentIndex = -1
    },
    goSearch(e) {
      const element = e.target
      const { categoryName, category1Id, category2Id, category3Id } = element.dataset
      if (categoryName) { 
        const location = { name: 'search' }
        const query = { categoryName }
        if (category1Id) {
          query.category1Id = category1Id
        } else if (category2Id) {
          query.category2Id = category2Id
        } else {
          query.category3Id = category3Id
        }
        location.query = query
        if(this.$route.params) location.params = this.$route.params
        this.$router.push(location)
      }
    }
  }
}
</script>

<style scoped lang="less">
.sort-enter,
.sort-leave-to {
  opacity: 0;
  transform: scale(0.99);
}

.sort-enter-active,
.sort-leave-active {
  transition: all 0.3s;
}

.sort-enter-to,
.sort-leave {
  opacity: 1;
  transform: scale(1);
}

.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            cursor: pointer;
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            position: absolute;
            width: 734px;
            min-height: 461px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;


                &.fore {
                  border-top: 0;
                }

                dt {
                  cursor: pointer;
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    cursor: pointer;
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }

        .cur {
          background-color: skyblue;
        }
      }
    }
  }
}
</style>