/**
 * 频道相关接口模块
 */

import request from '@/utils/request'

/**
 * 获取全部频道列表
 */
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

/**
 * 添加频道
 * @param {Object} channel {id添加的频道id，seq：序号}
 */
export const addUserChannels = channel => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

/**
 * 删除频道
 * @param {Number} target 用户频道id
 */
export const removeUserChannels = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${target}`
  })
}
