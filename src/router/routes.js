export default [
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/pages/Home'),
    meta: { show: true}
  },
  {
    name: 'search',
    path: '/search/:keyword?',
    component: () => import('@/pages/Search'),
    meta: { show: true }
  },
  {
    path: '/login',
    component: () => import('@/pages/Login'),
    meta: { show: false }
  },
  {
    path: '/register',
    component: () => import('@/pages/Register'),
    meta: { show: false }
  },
  {
    path: '/detail/:skuId',
    component: () => import('@/pages/Detail'),
    meta: { show: true }
  },
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: () => import('@/pages/AddCartSuccess'),
    meta: { show: true }
  },
  {
    path: '/shopcart',
    name: 'shopcart',
    component: () => import('@/pages/ShopCart'),
    meta: { show: true }
  },
  {
    path: '/trade',
    name: 'trade',
    component: () => import('@/pages/Trade'),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path === '/shopcart') next()
      else next(false)
    }
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/pages/Pay'),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path === '/trade') next()
      else next(false)
    }
  },
  {
    path: '/paysuccess',
    name: 'paysuccess',
    component: () => import('@/pages/PaySuccess'),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path === '/pay') next()
      else next(false)
    }
  },
  {
    path: '/center',
    name: 'center',
    redirect: '/center/myorder',
    component: () => import('@/pages/Center'),
    meta: { show: true },
    children: [
      {
        path: 'myorder',
        name: 'myorder',
        component: () => import('@/pages/Center/MyOrder.vue')
      },
      {
        path: 'grouporder',
        name: 'grouporder',
        component: () => import('@/pages/Center/GroupOrder.vue')
      }
    ]
  }
]
