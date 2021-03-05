/**
 * dayjs 时间处理插件
 */
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn') // 全局使用

dayjs.extend(relativeTime)

export default dayjs
