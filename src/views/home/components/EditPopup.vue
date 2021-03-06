<template>
  <div class="channel-edit-container">
    <!-- 我的频道 -->
    <van-cell title="我的频道" class="my-cell" :border="false">
      <van-button type="danger" round plain>编辑</van-button>
    </van-cell>
    <van-grid :gutter="10" direction="horizontal">
      <van-grid-item v-for="value in 8" :key="value" text="文字" />
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell title="频道推荐" class="hot-cell" :border="false">
    </van-cell>
    <van-grid class="hot-grid" :gutter="10" direction="horizontal">
      <van-grid-item v-for="value in 8" :key="value" icon="plus" text="文字" />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'EditPopup',
  data () {
    return {

    }
  },

  created () {

  },

  methods: {

  }
}
</script>

<style scoped lang='less'>
.channel-edit-container {
  padding-top: 88px;
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
  .hot-grid {
    /deep/.van-grid-item {
      .van-grid-item__icon {
        font-size: 26px;
      }
    }
  }
}
</style>
