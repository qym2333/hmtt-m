<template>
  <div class="home-container">
    <!-- 顶部搜索 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <template>
        <van-button class="search-btn" slot="title" size="small" type="default" round icon="search" color="rgba(255,255,255,.2)">搜 索</van-button>
      </template>
    </van-nav-bar>
    <!-- tab -->
    <van-tabs class="home-tabs" v-model="active" animated swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <article-list :channel="item"></article-list>
      </van-tab>
      <template>
        <div slot="nav-right" class="right-btn" @click="isChannelShow=true">
          <i class="hmtt hmtt-more"></i>
        </div>
        <div slot="nav-right" class="placeholder"></div>
      </template>
    </van-tabs>

    <!-- 编辑频道弹出层 -->
    <van-popup v-model="isChannelShow" closeable close-icon-position="top-left" position="bottom" :style="{ height: '80%' }">
      <!-- 弹窗内容 -->
      <edit-popup></edit-popup>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/ArticleList'
import EditPopup from './components/EditPopup'

export default {
  name: 'HomeIndex',

  data () {
    return {
      active: 0,
      channels: [],
      isChannelShow: false
    }
  },

  components: {
    ArticleList,
    EditPopup
  },
  created () {
    this.loadUserChannels()
  },

  methods: {
    async loadUserChannels () {
      try {
        const { data: res } = await getUserChannels()
        this.channels = res.data.channels
      } catch (err) {
        this.$toast('加载失败')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.home-container {
  padding-top: 175px;
  .page-nav-bar {
    /deep/.van-nav-bar__title {
      max-width: 100%;
    }
    .search-btn {
      width: 555px;
      height: 64px;
      border: none;
      font-size: 28px;
      .van-icon {
        font-size: 32px;
        color: #fff;
      }
    }
  }
  /deep/ .home-tabs {
    width: 100%;
    height: 83px;
    // margin-bottom: 28px;
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      width: 100%;
      z-index: 999;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
    .van-tab {
      width: 191px;
      height: 82px;
    }
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      border-radius: 3px;
      bottom: 8px;
    }
    .right-btn {
      width: 66px;
      height: 82px;
      position: fixed;
      right: 0;
      display: flex;
      flex-shrink: 0;
      justify-content: center;
      align-items: center;
      background: rgba(255, 255, 255, 0.7);

      .hmtt-more {
        color: rgba(0, 0, 0, 0.6);
        font-size: 32px;
      }

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        height: 82px;
        background: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
    .placeholder {
      width: 66px;
      flex-shrink: 0;
    }
  }
}
</style>
