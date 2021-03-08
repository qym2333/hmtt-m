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
