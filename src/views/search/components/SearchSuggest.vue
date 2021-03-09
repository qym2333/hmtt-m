<template>
  <div>
    <van-cell v-for="(item,index) in suggestions" :key="index" icon="search">
      <div slot="title" v-html="keywordFormat(item)" @click="$emit('onSearch',item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
import { debounce } from 'lodash'
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
      suggestions: []
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
    },
    // 关键字高亮
    keywordFormat (val) {
      const reg = new RegExp(`(${this.searchText})`, 'gi') // 全局匹配、忽略大小写
      return val.replace(reg, ('<span style="color:red">$1</span>'))
    }
  },

  watch: {
    searchText: {
      handler: debounce(function () {
        this.getSuggestions()
      }, 700),
      immediate: true // 侦听开始后立即调用
    }
  }
}
</script>

<style scoped lang='less'>
</style>
