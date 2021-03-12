/**
 * 评论相关接口模块
 */
import request from '@/utils/request.js'

/**
 * 获取评论列表
 * @param {Object} params {type:a （文章评论）||c（评论的评论）,source:文章id||评论id,offset:页码，limit:每页条数}
 */
export const getCommentList = params => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params
  })
}
