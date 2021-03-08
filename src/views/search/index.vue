<template>
  <div class="search-container">
    <!-- 搜索头部 -->
    <form action="/">
      <van-search v-model="value" show-action placeholder="请输入搜索关键词" @cancel="$router.go(-1)" @search="onSearch" background="#3296fa" @focus="isShowResult=false"></van-search>
    </form>
    <!-- 搜索结果 -->
    <search-results v-if="isShowResult" />
    <!-- 搜索建议 -->
    <search-suggest v-else-if="value" :searchText="value" />
    <!-- 搜索历史 -->
    <search-history v-else />

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
      isShowResult: false
    }
  },

  created () {

  },

  methods: {
    onSearch () {
      this.isShowResult = true
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
