<template>
  <div>
    <van-button :loading="isfollowLoading" loading-type="spinner" class="follow-btn" type="info" color="#3296fa" round size="small" icon="plus" v-if="!isFollowed" @click="onFollow">关注</van-button>
    <van-button :loading="isfollowLoading" loading-type="spinner" v-else class="follow-btn" round size="small" @click="onFollow">已关注</van-button>
  </div>
</template>

<script>
import { followUser, unfollowUser } from '@/api/user.js'

export default {
  name: 'FollowUser',
  model: {
    prop: 'isFollowed',
    event: 'update-isFollowed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    autId: {
      type: [Number, String, Object],
      required: true
    }
  },

  data () {
    return {
      isfollowLoading: false
    }
  },

  created () {

  },

  methods: {
    // 关注/取消关注用户
    async onFollow () {
      this.isfollowLoading = true
      try {
        if (this.isFollowed) {
          // 已关注，点击取消关注
          await unfollowUser(this.autId)
          this.$toast('取消关注')
        } else {
          // 未关注，点击关注
          await followUser(this.autId)
          this.$toast('已关注')
        }
        // 更新视图
        this.$emit('update-isFollowed', !this.isFollowed)
      } catch (err) {
        if (err.response?.status === 400) return this.$toast('我们时刻都在关注着自己')
        this.$toast('操作失败')
      }
      this.isfollowLoading = false
    }
  }
}
</script>

<style scoped lang='less'>
.follow-btn {
  width: 170px;
  height: 58px;
}
</style>
