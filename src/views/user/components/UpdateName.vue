<template>
  <div>
    <!-- @click-right="onClickRight"  -->
    <van-nav-bar title="更新昵称" left-text="取消" right-text="保存" @click-left="$emit('left-close')" />
    <van-field ref="nickRef" v-model="nickName" rows="2" autosize type="textarea" maxlength="10" placeholder="请输入昵称" show-word-limit border />
  </div>
</template>

<script>
export default {
  name: 'update-name',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      nickName: ''
    }
  },

  created () {
    this.nickName = this.value
  },

  mounted () {
    this.$refs.nickRef.focus()
  },
  methods: {

  }
}
</script>

<style scoped lang='less'>
</style>
