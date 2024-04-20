import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
Vue.use(VueRouter)

let oringinPush = VueRouter.prototype.push
let oringinReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    oringinPush.call(this, location, resolve, reject)
  } else {
    oringinPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    oringinReplace.call(this, location, resolve, reject)
  } else {
    oringinReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { y: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  const name = store.state.user.userInfo.name
  if (token) {
    if (to.path === '/login' || to.path === '/register') {
      next('/home')
    } else {
      if (name) {
        next()
      } else {
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else {
    const toPath = to.path
    if (
      toPath.indexOf('/trade') !== -1 ||
      toPath.indexOf('/pay') !== -1 ||
      toPath.indexOf('/center') !== -1
    ) {
      next('/login?redirect=' + toPath)
    } else {
      next()
    }
  }
})

export default router
