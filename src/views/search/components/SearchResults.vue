<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :err.sync="error" error-text="请求失败，点击重新加载">
      <van-cell v-for="item in list" :key="item.id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
// 获取搜索结果
import { getSearchList } from '@/api/search'
export default {
  name: 'search-results',
  props: {
    searchText: {
      type: String,
      reuqired: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      error: false
    }
  },

  created () {

  },

  methods: {
    async onLoad () {
      // 异步更新数据
      try {
        const { data: { data } } = await getSearchList({
          page: this.page,
          per_page: 10,
          q: this.searchText
        })
        this.list.push(...data.results)
        this.loading = false
        // 加载完成
        if (!data.results.length) {
          this.finished = true
        } else {
          this.page++
        }
      } catch (err) {
        this.error = true
      }
    }
  }
}
</script>

<style scoped lang='less'>
</style>
