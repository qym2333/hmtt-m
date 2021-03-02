/**
 * 本地存储操作模块
 */

/**
 * 存储localStorage数据
 * @param {String} key localStorage中的key
 * @param {*} value localStorage中的value
 */
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    // value为对象或数组 需要转换成json字符串
    value = JSON.stringify(value)
  }
  // 普通字符串无需转换
  window.localStorage.setItem(key, value)
}

/**
 * 获取localStorage数据
 * @param {String} key localStorage中的key
 * @returns localStorage数据
 */
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  // JSON.parse 只能转换json字符串
  // 使用trycatch可以判断json字符串或普通字符串
  try {
    return JSON.parse(data)
  } catch (err) {
    // 转换失败即普通字符串
    return data
  }
}

/**
 * 移除指定localStorage数据
 * @param {String} key localStorage中的key
 */
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
