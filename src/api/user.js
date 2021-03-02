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
