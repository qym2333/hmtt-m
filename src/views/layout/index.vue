<template>
  <div class="layout-container">
    <router-view></router-view>
    <!-- 底部标签栏 -->
    <van-tabbar v-model="active" class="my-tabbar" route>
      <van-tabbar-item icon="wap-home-o" to="/" replace>首页</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video" replace>视频</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/qa" replace>问答</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/profile" replace>{{$store.state.user?'我的':'未登录'}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  },

  created () {

  },

  methods: {

  }
}
</script>

<style scoped lang='less'>
</style>
