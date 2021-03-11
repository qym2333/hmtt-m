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
    onCollect () {
      if (this.value) {
        // 已收藏 取消收藏
        this.$toast('取消收藏')
      } else {
        // 未收藏 添加收藏
        this.$toast('已收藏')
      }
    }
  }
}
</script>

<style scoped lang='less'>
</style>
