<template>
  <div class="profile-box">
    <!-- 未登录头部 -->
    <div v-if="!user" class="not-login header">
      <img src="@/assets/mobile.png" alt="" @click="$router.push('/login')">
      <span @click="$router.push('/login')">登录 / 注册</span>
    </div>
    <!-- /未登录头部 -->

    <!-- 已登录头部 -->
    <div v-else class="login header">
      <div class="user-info">
        <div class="left">
          <van-image round :src="userInfo.photo ||'https://img01.yzcdn.cn/vant/cat.jpeg'" />
          <span>{{userInfo.name || '喵喵喵'}}</span>
        </div>
        <div class="right">
          <van-button round type="default" to="/user">编辑资料</van-button>
        </div>
      </div>
      <div class="user-data">
        <div class="item">
          <span>{{userInfo.art_count || 0}}</span>
          <span>头条</span>
        </div>
        <div class="item">
          <span>{{userInfo.follow_count || 0}}</span>
          <span>关注</span>
        </div>
        <div class="item">
          <span>{{userInfo.fans_count || 0}}</span>
          <span>粉丝</span>
        </div>
        <div class="item">
          <span>{{userInfo.like_count || 0}}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>

    <!-- 宫格 -->
    <van-grid :column-num="2" class="my-grid" :border="false">
      <van-grid-item class="collect">
        <template>
          <van-icon slot="icon" name="star-o" />
          <span slot="text">收藏</span>
        </template>
      </van-grid-item>
      <van-grid-item class="history">
        <van-icon slot="icon" name="clock-o" />
        <span slot="text">历史</span>
      </van-grid-item>
    </van-grid>

    <!-- 消息通知 -->
    <van-cell-group class="message" :border="false">
      <van-cell center :border="false" title="消息通知" is-link />
      <van-cell center :border="false" title="小智同学" is-link />
    </van-cell-group>
    <!-- 退出登录 -->
    <van-cell v-if="user" center :border="false" value="退出登录" class="logout-btn" @click="onLogout" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'ProfileIndex',
  data () {
    return {
      userInfo: ''
    }
  },

  computed: {
    ...mapState(['user'])
  },

  created () {
    if (this.user) {
      this.getUserInfo()
    }
  },

  methods: {
    // 退出登录
    onLogout () {
      this.$dialog.confirm({
        title: '蛤蟆头条',
        message: '(づ￣ 3￣)づ要走了吗？'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    // 获取当前登录用户信息
    async getUserInfo () {
      try {
        const { data: res } = await getUserInfo()
        this.userInfo = res.data
      } catch (error) {
        this.$toast('系统错误')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.profile-box {
  .header {
    width: 100%;
    height: 401px;
    background: url(~@/assets/banner.png);
    background-size: contain;
  }
  .not-login {
    display: flex;
    flex-direction: column; // 主轴方向
    justify-content: center; // 主轴居中
    align-items: center; // 侧轴居中
    img {
      width: 132px;
      height: 132px;
      border-radius: 50%;
    }
    span {
      margin-top: 15px;
      font-size: 28px;
      color: #fff;
    }
  }
  .login {
    .user-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 90px 32px 0;
      height: 240px;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .van-image {
          width: 132px;
          height: 132px;
          border: 2px solid #fff;
          img {
            width: 100%;
            height: 100%;
          }
        }
        span {
          margin-left: 22px;
          font-size: 30px;
          color: #fff;
        }
      }
      .right {
        display: flex;
        align-items: center;
        .van-button {
          padding: 0 15px;
          height: 35px;
          background: #fff;
          color: rgba(0, 0, 0, 0.6);
          font-size: 20px;
        }
      }
    }
    .user-data {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 161px;
      padding: 0 80px;
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 100px;
        min-width: 30px;
        font-size: 23px;
        color: #fff;
        span {
          &:first-child {
            margin: 8px 0;
            font-size: 36px;
          }
        }
      }
    }
  }
  .my-grid {
    span {
      font-size: 28px;
      color: rgba(0, 0, 0, 0.9);
    }
    .collect {
      i {
        font-size: 45px;
        color: #eb5253;
      }
    }
    .history {
      i {
        font-size: 45px;
        color: #ff9d1d;
      }
    }
  }
  .message {
    margin: 10px 0;
  }
  .logout-btn {
    .van-cell__value {
      font-size: 30px;
      text-align: center;
      color: #d86262;
    }
  }
}
</style>
