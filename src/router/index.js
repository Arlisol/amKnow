import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component:  resolve => require(['@/components/page/Login'], resolve)
    },
    {
      path: '/notFound',
      name: 'NotFound',
      component:  resolve => require(['@/components/page/NotFound'], resolve)
    },
    {
      path: '/',
      redirect:'/login',
      name: 'Home',
      component:  resolve => require(['@/components/common/Home'], resolve),
      children: [
        {
          path: 'automobileInfMng',
          name: 'AutomobileInfMng',
          component:  resolve => require(['@/components/page/AutomobileInfMng'], resolve),
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: 'automobileBrandMng',
          name: 'AutomobileBrandMng',
          component:  resolve => require(['@/components/page/AutomobileBrandMng'], resolve),
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: 'stockManage',
          name: 'StockMng',
          component:  resolve => require(['@/components/page/StockMng'], resolve),
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: 'Dashboard',
          name: 'Dashboard',
          component:  resolve => require(['@/components/page/Dashboard'], resolve),
          meta: {
            keepAlive: true // 需要缓存
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/notFound'
    }
  ]
})
