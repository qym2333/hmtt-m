<template>
  <div class="article-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :success-text="tipText" :success-duration="1500">
      <van-list class="my-list" v-model="loading" :finished="finished" finished-text="莫得了" @load="onLoad" :error.sync="error" error-text="外星人入侵，点击快逃">
        <article-item v-for="(item,index) in list" :key="index" :article="item"></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 文章接口
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/ArticleItem'
export default {
  props: {
    channel: {
      type: Object,
      required: true
    }
  },

  components: {
    ArticleItem
  },

  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      refreshing: false,
      timestamp: null,
      tipText: ''
    }
  },

  created () {

  },

  methods: {
    async onLoad () {
      try {
        const { data: res } = await getArticles({
          channel_id: this.channel.id, // 频道id
          timestamp: this.timestamp || Date.now(), // 获取第一页数据为当前时间戳，返回下一页时间戳
          with_top: 1 // 是否包含置顶文章数据
        })
        // if (Math.random() > 0.6) {
        //   throw Error('好惨')
        // }
        this.list.push(...res.data.results)
        this.timestamp = res.data.pre_timestamp
        this.loading = false

        // 数据全部加载完成
        if (res.data.results.length === 0) {
          this.finished = true
        } else {
          this.timestamp = res.data.pre_timestamp
        }
      } catch (err) {
        this.loading = false
        this.error = true
      }
    },
    // 下拉刷新
    async onRefresh () {
      // 重新加载数据
      try {
        // if (Math.random() > 0.6) {
        //   throw Error('好惨')
        // }
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道id
          timestamp: Date.now(), // 获取第一页数据为当前时间戳，返回下一页时间戳
          with_top: 1 // 是否包含置顶文章数据
        })
        this.list.unshift(...data.data.results)
        this.refreshing = false // 关闭下拉刷新
        this.tipText = `又有了${data.data.results.length}条头条`
      } catch (err) {
        this.refreshing = false
        this.tipText = '加载失败'
      }
    }
  }
}
</script>

<style scoped lang='less'>
.article-list {
  height: 80vh;
  overflow-y: scroll;
  .my-list {
    margin-bottom: 100px;
  }
}
</style>
