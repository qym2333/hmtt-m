import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局样式
import './styles/index.less'
// import Vant
import Vant from 'vant'
import 'vant/lib/index.css'
// rem适配 动态设置html根节点大小
import 'amfe-flexible'

// Use Vant
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
