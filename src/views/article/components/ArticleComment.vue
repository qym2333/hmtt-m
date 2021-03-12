<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <commentItem :comment="item" v-for="(item,index) in list" :key="index"></commentItem>
    </van-list>
  </div>
</template>

<script>
import { getCommentList } from '@/api/comment.js'
import commentItem from '@/components/CommentItem'
export default {
  props: {
    type: {
      default: 'a'
    },
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    commentItem
  },
  data () {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },

  created () {

  },

  methods: {
    async onLoad () {
      // 异步更新数据
      try {
        const { data: res } = await getCommentList({
          type: this.type,
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        this.$emit('update-count', res.data.total_count)
        this.list.push(...res.data.results)
        this.loading = false
        if (res.data.results.length) {
          this.offset = res.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {

      }
    }
  }
}
</script>

<style scoped lang='less'>
</style>
