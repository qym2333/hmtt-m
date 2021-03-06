import dayjs from '@/utils/dayjs'

/**
 * 相对现在日期
 * @param {Date} value 日期
 */
export const relativeTime = value => {
  return dayjs().to(dayjs(value))
}
