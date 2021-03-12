<template>
  <div class="comment-post">
    <van-field class="post-field" v-model="value" rows="2" autosize type="textarea" maxlength="50" placeholder="请输入留言" show-word-limit />
    <van-button class="post-btn" :disabled="value.trim()===''" @click="onPostComment">发布</van-button>
  </div>
</template>

<script>
// 发布评论
import { postComment } from '@/api/comment.js'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    articleId: {
      type: [Object, Number, String],
      required: true
    }
  },
  data () {
    return {
      value: ''
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    // 点击发布评论
    async onPostComment () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data: res } = await postComment({
          target: this.articleId,
          content: this.value
        })
        // 评论成功结果传到父组件
        this.$emit('success-post', res.data.new_obj)
        this.value = ''
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast('评论失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
