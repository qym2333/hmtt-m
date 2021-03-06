<template>
  <div class="channel-edit-container">
    <!-- 我的频道 -->
    <van-cell title="我的频道" class="channel-cell my-cell" :border="false">
      <van-button type="danger" round plain>编辑</van-button>
    </van-cell>
    <van-grid class="channel-grid my-grid" :gutter="10" :border="false">
      <van-grid-item icon="clear" v-for="(item,index) in channels" :key="item.id" :text="item.name" :class="{active:index===active}" />
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell title="频道推荐" class="channel-cell  hot-cell" :border="false">
    </van-cell>
    <van-grid class="channel-grid hot-grid" :gutter="10" direction="horizontal" :border="false">
      <van-grid-item v-for="value in 8" :key="value" icon="plus" text="文字" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'EditPopup',

  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      allChannels: []
    }
  },

  created () {
    this.loadChannels()
  },

  methods: {
    // 加载全部频道列表
    async loadChannels () {
      try {
        const { data: res } = await getAllChannels()
        this.allChannels = res.data.channels
      } catch (err) {
        this.$toast('获取频道列表失败！')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.channel-edit-container {
  padding-top: 88px;
  .channel-cell {
    .van-cell__title {
      font-size: 32px;
    }
  }
  .my-cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-button {
      height: 48px;
      padding: 10px 25px;
      font-size: 28px;
    }
  }
  .channel-grid {
    margin: 35px 0;
    /deep/.van-grid-item {
      .van-grid-item__content {
        width: 160px;
        height: 86px;
        background-color: #f4f5f6;
        border-radius: 6px;
        .van-grid-item__text {
          line-height: unset !important;
          color: rgba(0, 0, 0, 0.85);
        }
      }
    }
  }
  .my-grid {
    /deep/.van-grid-item {
      &.active {
        .van-grid-item__text {
          color: #e22829;
        }
      }
      .van-grid-item__icon {
        position: absolute;
        top: -16px;
        right: 5px;
        font-size: 34px;
      }
      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
  .hot-grid {
    /deep/.van-grid-item {
      .van-grid-item__icon {
        font-size: 26px;
      }
    }
  }
}
</style>
