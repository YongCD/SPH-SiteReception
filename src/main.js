import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination.vue'
// 图片懒加载工具引入
import VueLazyload from 'vue-lazyload'
import '@/mock/mockServer'
import "swiper/css/swiper.css"
import * as API from '@/api'
import { MessageBox } from 'element-ui'
//一张图片
import cxk from '@/assets/images/1.gif'
//表单验证
import '@/plugins/validate'

Vue.component('TypeNav', TypeNav)
Vue.component('Carousel', Carousel)
Vue.component('Pagination', Pagination)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
// 图片懒加载配置
Vue.use(VueLazyload, {
  loading: cxk
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')
