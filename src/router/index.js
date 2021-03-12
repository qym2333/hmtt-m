import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 将路由动态参数映射到组件的props中
    props: true
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [{
      name: 'home',
      path: '',
      component: () => import('@/views/home')
    }, {
      name: 'video',
      path: '/video',
      component: () => import('@/views/video')
    }, {
      name: 'qa',
      path: '/qa',
      component: () => import('@/views/qa/index')
    }, {
      name: 'profile',
      path: '/profile',
      component: () => import('@/views/profile')
    }]
  }, {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user')
  }
]

const router = new VueRouter({
  routes
})

export default router
