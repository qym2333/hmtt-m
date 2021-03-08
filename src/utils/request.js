/**
 * axios 请求模块
 */

import axios from 'axios'
import store from '@/store'

const request = axios.create({
  // 基础路径
  // baseURL: 'http://ttapi.research.itcast.cn/'
  baseURL: 'http://toutiao-app.itheima.net/'
})

// 请求拦截器
request.interceptors.request.use(config => {
  if (store.state.user) {
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  return config
})

// 响应拦截器
request.interceptors.response.use(config => {
  return config
})

export default request
