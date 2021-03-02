<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- /导航栏 -->
    <div class="login-box">
      <!-- 登录表单 -->
      <van-form @submit="onSubmit" ref="loginFormRef">

        <van-field v-model="user.mobile" name="mobile" placeholder="请输入手机号" clearable :rules="userFormRules.mobile" type="number" maxlength="11" error-message-align="center">
        </van-field>

        <van-field v-model="user.code" center clearable placeholder="请输入短信验证码" :rules="userFormRules.code" type="number" maxlength="6" error-message-align="center">
          <template #button>
            <van-count-down v-if="isShowCountDown" :time="1000*60" format="ss s 后重新发送" class="code-btn" @finish="isShowCountDown=false" />
            <van-button v-else size="small" class="code-btn" native-type="button" @click="onSendCode">发送验证码</van-button>
          </template>
        </van-field>

        <div class="protocol-field">
          <label for="autolog"><input v-model="isAutoLog" name="autolog" type="checkbox" value="1"></label>
          <span>我已阅读并同意蛤蟆头条的<a href="#">《用户协议》</a></span>
        </div>

        <div class="login-btn-wrap">
          <van-button class="login-btn" block type="info" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
      <!-- /登录表单 -->
    </div>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      // 用户数据
      user: {
        mobile: 13911111111,
        code: ''
      },
      // 表单校验规则
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|199)[0-9]{8}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      // 倒计时显示
      isShowCountDown: false,
      isAutoLog: 1 // 同意协议
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    // 点击登录按钮
    async onSubmit () {
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })

      try {
        const { data: res } = await login(this.user)
        this.$store.commit('setUser', res.data) // VueX 当前用户
        this.$toast.success('登录成功')
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('登录失败\n手机号或验证码错误')
        } else {
          this.$toast.fail('系统错误，请重试')
        }
      }
    },
    // 点击发送验证码
    async onSendCode () {
      try {
        await this.$refs.loginFormRef.validate('mobile')
      } catch (error) {
        return this.$toast({
          position: top,
          message: error.message
        })
      }
      this.isShowCountDown = true // 显示倒计时
      try {
        await sendSms(this.user.mobile)
        this.$toast.success('发送成功')
      } catch (error) {
        if (error.response.status === 429) {
          this.$toast({ position: top, message: '请勿频繁发送验证码。' })
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
@toast-background-color: white;
.login-container {
  .hmtt {
    font-size: 37px;
    color: #666;
  }
  .login-box {
    padding: 60px 60px 0;
  }

  .code-btn {
    height: 64px;
    padding: 0 16px;
    line-height: 64px;
    background: transparent;
    border: none;
    font-size: 22px;
    color: rgba(0, 0, 0, 0.6);
  }

  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #3296fa;
      border-radius: 10px;
      border: 1px solid transparent;
    }
  }

  .protocol-field {
    display: flex;
    align-items: center;
    color: rgba(40, 40, 40, 0.5);
    font-size: 15px;
    padding: 20px 32px;
    & > label {
      margin-top: 2px;
      margin-right: 10px;
    }
    span {
      a {
        color: rgba(0, 0, 0, 0.65);
        font-size: 15px;
      }
    }
  }
}
</style>
