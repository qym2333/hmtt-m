/**
 * 搜索相关接口模块
 */

import request from '@/utils/request'

/**
 * 获取搜索联想建议
 * @param {String}} q 关键词
 */
export const getSuggestions = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: { q }
  })
}

/**
 * 获取搜索结果
 * @param {Object} params {page:页，per_page:页大小，q:关键字}
 */
export const getSearchList = params => {
  return request({
    url: '/v1_0/search',
    method: 'GET',
    params
  })
}
