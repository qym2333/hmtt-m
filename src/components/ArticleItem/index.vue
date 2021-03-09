<template>
  <div class="article-item">

    <van-cell :title="article.title" :to="`/article/${article.art_id}`">
      <!-- 自定义label -->
      <template #label>
        <div class="article-label">
          <!-- 三张图片 -->
          <div class="label-covers" v-if="article.cover.type===3">
            <van-image v-for="(item,index) in article.cover.images" :key="index" :src="item" />
          </div>
          <div class="label-text">
            <span v-if="article.is_top" class="top-badge">置顶</span>
            <span>{{article.aut_name}}</span>
            <span>{{article.comm_count}} 评论</span>
            <span>{{article.pubdate | relativeTime}}</span>
          </div>
        </div>
      </template>
      <!-- 自定义右侧 -->
      <div class="article-value" v-if="article.cover.type===1">
        <van-image class="cover" :src="article.cover.images[0]" />
      </div>

    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
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
.article-item {
  .close-btn {
    color: rgba(0, 0, 0, 0.3);
    font-size: 26px;
  }
  .cover {
    width: 232px;
    height: 146px;
  }
  .van-cell {
    display: flex;
    padding-top: 30px;
    .van-cell__title {
      flex: 2;
      font-size: 32px;
      color: rgba(0, 0, 0, 0.8);
      line-height: 60px;
      // letter-spacing: 2px;
    }
    .van-cell__label {
      flex: 1;
      .article-label {
        .label-text {
          margin: 30px 0;
          font-size: 24px;
          .top-badge {
            color: #e22829;
          }
          span {
            margin-right: 25px;
            &:last-of-type {
              margin-right: 0;
            }
          }
        }
        .label-covers {
          display: flex;
          justify-content: space-between;
          width: 98%;
          /deep/.van-image {
            width: 232px;
            height: 146px;
            &:nth-child(2) {
              margin: 0 4px;
            }
            .van-image__error {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    &::after {
      border-bottom: none;
    }
  }
}
</style>
