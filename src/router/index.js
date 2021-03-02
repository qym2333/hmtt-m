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
  }
]

const router = new VueRouter({
  routes
})

export default router
