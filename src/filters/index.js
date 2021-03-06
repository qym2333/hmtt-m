import Vue from 'vue'
// 全局过滤器
import * as filters from './filters'
// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
