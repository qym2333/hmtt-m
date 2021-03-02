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
    url: '/app/v1_0/authorizations',
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
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
