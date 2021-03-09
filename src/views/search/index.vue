<template>
  <div class="search-container">
    <!-- 搜索头部 -->
    <van-sticky>
      <form action="/" class="search-hearder">
        <van-search v-model="value" show-action placeholder="请输入搜索关键词" @cancel="$router.go(-1)" @search="onSearch" background="#3296fa" @focus="isShowResult=false"></van-search>
      </form>
    </van-sticky>
    <!-- 搜索结果 -->
    <search-results v-if="isShowResult" :searchText="value" />
    <!-- 搜索建议 -->
    <search-suggest v-else-if="value" :searchText="value" @onSearch="onSearch" />
    <!-- 搜索历史 -->
    <search-history :search-history="searchHistory" @clear-all="searchHistory=[]" v-else @on-search="onSearch" />

  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory'
import SearchSuggest from './components/SearchSuggest'
import SearchResults from './components/SearchResults'
export default {
  name: 'search',
  components: {
    SearchHistory,
    SearchSuggest,
    SearchResults
  },
  data () {
    return {
      value: '',
      isShowResult: false,
      // 搜索历史
      searchHistory: []
    }
  },

  created () {

  },

  methods: {
    onSearch (val) {
      // 关键字为空
      if (!val.trim()) return
      // 判断重复
      const index = this.searchHistory.indexOf(val)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      // 保存本次搜索到搜索历史
      this.searchHistory.unshift(val)
      // 显示搜索结果
      this.isShowResult = true
      this.value = val
    }
  }
}
</script>

<style scoped lang='less'>
.search-container {
  /deep/ .van-search {
    .van-search__action {
      color: #fff;
    }
  }
}
</style>
