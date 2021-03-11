<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
import { getCommentList } from '@/api/comment.js'
export default {
  props: {
    type: {
      required: true,
      default: 'a'
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },

  created () {

  },

  methods: {
    onLoad () {
      // 异步更新数据
      try {
        getCommentList()
      } catch (err) {

      }
    }
  }
}
</script>

<style scoped lang='less'>
</style>
