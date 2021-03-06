import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 全局样式
import './styles/index.less'
// rem适配 动态设置html根节点大小
import 'amfe-flexible'
// 全局过滤器
import '@/filters'

// Use Vant
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
