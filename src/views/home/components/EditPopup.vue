<template>
  <div class="channel-edit-container">
    <!-- 我的频道 -->
    <van-cell title="我的频道" class="channel-cell my-cell" :border="false">
      <van-button type="danger" round plain @click="isEdit=!isEdit">{{isEdit?'完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid class="channel-grid my-grid" :gutter="10" :border="false">
      <van-grid-item v-for="(item,index) in channels" :key="item.id" :text="item.name" :class="{active:index===active}" @click="onChannelClick(item,index)">
        <van-icon v-if="index >= 1 && isEdit" name="clear" slot="icon" />
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell title="频道推荐" class="channel-cell  hot-cell" :border="false">
    </van-cell>
    <van-grid class="channel-grid hot-grid" :gutter="10" direction="horizontal" :border="false">
      <van-grid-item v-for="(item,index) in recommendChannels" :key="index" icon="plus" :text="item.name" @click="onClickRecomend(item)" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannels, removeUserChannels } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
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
      allChannels: [],
      isEdit: false
    }
  },

  created () {
    this.loadChannels()
  },

  computed: {
    ...mapState(['user']),
    // 推荐频道 =全部频道 - 我的频道
    recommendChannels () {
      // return this.allChannels.filter(x => !this.channels.find(i => i.id === x.id))
      return this.allChannels.reduce((acc, cur) => {
        if (!this.channels.find(item => item.id === cur.id)) acc.push(cur)
        return acc
      }, [])
    }
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
    },
    // 点击添加推荐频道
    async onClickRecomend (val) {
      this.channels.push(val)
      // 数据持久化
      if (this.user) {
        // 已登录 发送请求
        try {
          await addUserChannels({
            id: val.id,
            seq: this.channels.length
          })
          this.$toast('添加成功')
        } catch (err) {
          this.$toast('添加失败')
        }
      } else {
        // 未登录 将数据存入本地
        setItem('TOTIAO_CHANNEL', this.channels)
      }
    },
    onChannelClick (channel, index) {
      if (this.isEdit) {
        // 编辑状态，删除
        if (index === 0) return
        if (index <= this.active) {
          this.$emit('active-changed', this.active - 1, true)
        }
        this.channels.splice(index, 1)
        this.deleteChannel(channel.id)
      } else {
        // 非编辑状态，切换
        this.$emit('active-changed', index, false)
      }
    },
    // 删除频道数据
    async deleteChannel (channelId) {
      if (this.user) {
        try {
          await removeUserChannels(channelId)
          this.$toast('删除成功')
        } catch (err) {
          this.$toast('删除失败')
        }
        // 已登录
        console.log('1')
      } else {
        console.log(2)
        setItem('TOTIAO_CHANNEL', this.channels)
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
      .van-grid-item__icon-wrapper {
        position: unset;
      }
      .van-icon-clear {
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
