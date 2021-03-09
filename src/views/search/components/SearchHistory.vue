<template>
  <div>
    <van-cell-group>
      <van-cell title="搜索历史">
        <template>
          <div v-if="isShowDelete">
            <span @click="$emit('clear-all')">全部删除</span>
            <span style="margin-left:10px" @click="isShowDelete=false">完成</span>
          </div>
          <van-icon v-else name="delete-o" @click="isShowDelete=true" />
        </template>
      </van-cell>
      <van-empty v-if="!searchHistory.length" description="暂无搜索历史"></van-empty>
      <van-cell :title="item" :key="item" v-for="(item,index) in searchHistory" @click="itemClick(index,item)">
        <van-icon v-if="isShowDelete" name="close" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'search-history',

  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isShowDelete: false
    }
  },

  created () {

  },

  methods: {
    itemClick (index, item) {
      if (this.isShowDelete) {
        // 删除当前这一项
        this.searchHistory.splice(index, 1)
      } else {
        // 点击搜索
        console.log(2)
        this.$emit('on-search', item)
      }
    }
  }
}
</script>

<style scoped lang='less'>
</style>
