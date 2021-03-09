/**
 * axios 请求模块
 */

import axios from 'axios'
import store from '@/store'
import jsonBig from 'json-bigint'
const request = axios.create({
  // 基础路径
  // baseURL: 'http://ttapi.research.itcast.cn/'
  baseURL: 'http://toutiao-app.itheima.net/',
  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }]
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
