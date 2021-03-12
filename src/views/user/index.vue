<template>
  <div class="user-container">
    <van-nav-bar title="个人中心" left-arrow @click-left="$router.go(-1)" class="page-nav-bar"></van-nav-bar>

    <van-cell title="头像" is-link value="内容">
      <van-image class="avatar" round :src="users.photo" />
    </van-cell>
    <van-cell title="性别" is-link :value="users.gender?'女':'男'"></van-cell>
    <van-cell title="昵称" is-link :value="users.name" @click="isShowEditName=true"></van-cell>
    <van-cell title="生日" is-link :value="users.birthday"></van-cell>
    <!-- 编辑昵称弹出层 -->
    <van-popup v-model="isShowEditName" position="bottom" :style="{ height: '100%' }">
      <update-name v-model="users.name" @left-close="isShowEditName=false"></update-name>
    </van-popup>

  </div>
</template>

<script>
import { getProfileInfo } from '@/api/user.js'
import updateName from './components/UpdateName'
export default {
  data () {
    return {
      users: {},
      isShowEditName: false
    }
  },
  components: {
    updateName
  },
  created () {
    this.loadProfile()
  },

  methods: {
    async loadProfile () {
      try {
        const { data: res } = await getProfileInfo()
        this.users = res.data
      } catch (err) {
        this.$toast('系统异常')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.user-container {
  .avatar {
    width: 50px;
    height: 50px;
  }
}
</style>
