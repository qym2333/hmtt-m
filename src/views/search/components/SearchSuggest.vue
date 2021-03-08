<template>
  <div>

    <van-cell v-for="(item,index) in suggestions" :key="index" :title="item" icon="search" />
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  name: 'search-suggest',

  data () {
    return {
      suggestions: [],
      timer: null
    }
  },

  created () {

  },

  methods: {
    // 获取联想建议列表
    async getSuggestions () {
      try {
        const { data: { data } } = await getSuggestions(this.searchText)
        this.suggestions = data.options
      } catch (err) {
        this.$toast('请求失败')
      }
    }
  },

  watch: {
    searchText: {
      handler (value) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.getSuggestions()
        }, 800)
      },
      immediate: true // 侦听开始后立即调用
    }
  }
}
</script>

<style scoped lang='less'>
</style>
