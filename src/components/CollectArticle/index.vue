<template>
  <van-icon :color="value?'#ffa500':''" :name="value?'star':'star-o'" @click="onCollect" :loading="isLoading" />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article.js'
export default {
  name: 'collectArticle',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      isLoading: false
    }
  },

  created () {

  },

  methods: {
    // 点击收藏图标
    async onCollect () {
      try {
        if (this.value) {
          // 已收藏 取消收藏
          await deleteCollect(this.articleId)
        } else {
          // 未收藏 添加收藏
          await addCollect(this.articleId)
        }
        // 更新视图
        this.$emit('input', !this.value)
        this.$toast.success(this.value ? '取消收藏' : '收藏成功')
      } catch (err) {
        this.$toast('操作失败')
      }
    }
  }
}
</script>

<style scoped lang='less'>
</style>
