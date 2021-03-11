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

/**
 * 根据id获取指定文章
 * @param {String,Number} articleId 文章编号
 */
export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: '/v1_0/articles/' + articleId
  })
}

/**
 * 收藏文章
 */
export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

/**
 * 取消收藏文章
 */
export const deleteCollect = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}
