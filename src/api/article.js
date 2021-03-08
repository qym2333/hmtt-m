/**
 * 文章相关请求模块
 */
import request from '@/utils/request'

/**
 * 获取频道下文章列表
 * @param {Object} params
 * channel_id:频道id,
 * timestamp:当前时间戳，请求第一页
 * with_top:是否包含置顶文章  1是/0否
 */
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/v1_1/articles',
    params
  })
}
