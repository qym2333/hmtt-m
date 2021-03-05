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
// import './utils/dayjs'
// 全局过滤器
import * as filters from './filters'
// Use Vant
Vue.use(Vant)
// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
