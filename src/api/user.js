/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
/**
 * 用户登录
 * @param {*} data {mobile:手机号,code:验证码}
 */
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

/**
 * 发送验证码
 * @param {Number} mobile 手机号码
 */
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取当前登录用户信息
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

/**
 * 获取当前用户频道列表
 */
export const getUserChannels = () => {
  return request({
    url: '/v1_0/user/channels',
    method: 'GET'
  })
}

/**
 * 添加关注
 * @param {Number} target 用户id
 */
export const followUser = target => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 取消关注
 * @param {Number} target 用户id
 */
export const unfollowUser = target => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}

/**
 * 获取用户个人信息
 */
export const getProfileInfo = () => {
  return request({
    url: '/v1_0/user/profile',
    method: 'GET'
  })
}
