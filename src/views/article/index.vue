<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" @click-left="$router.go(-1)" left-arrow title="蛤蟆头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image class="avatar" slot="icon" round fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>

          <!-- 如果一个数据，既需要传递给子组件使用，并且子组件还要修改这个数据，建议使用v-model来解决这个问题 -->
          <!-- 关注按钮 -->
          <follow-user v-model="article.is_followed" @update-isFollowed="article.is_followed=$event" :aut-id="article.aut_id"></follow-user>
          <!-- <follow-user :is-followed="article.is_followed" @update-isFollowed="article.is_followed=$event" :aut-id="article.aut_id"></follow-user> -->

        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" ref="articleContent" v-html="article.content"></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论列表模块 -->
        <article-comment :source="articleId" @update-count="total_cnt = $event" :list="commentList"></article-comment>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small" @click="isShowCommentPop=!isShowCommentPop">写评论</van-button>
          <van-icon name="comment-o" :badge="
      total_cnt" color="#777" />
          <collect-article v-model="article.is_collected" :article-id="article.art_id"></collect-article>
          <van-icon color="#777" name="good-job-o" />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="is404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArtcleInfo">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 写评论弹出层 -->
    <van-popup v-model="isShowCommentPop" position="bottom">
      <post-comment :articleId="articleId" @success-post="onSuccessPost"></post-comment>
    </van-popup>

  </div>
</template>

<script>
import { getArticleById } from '@/api/article.js'
import './github-markdown.css'
import { ImagePreview } from 'vant'
// 关注用户
import followUser from '@/components/FollowUser'
// 收藏文章
import collectArticle from '@/components/CollectArticle'
// 评论组件
import articleComment from './components/ArticleComment'
// 评论弹框内容
import postComment from './components/PostComment'

export default {
  name: 'ArticleIndex',
  components: {
    followUser,
    collectArticle,
    articleComment,
    postComment
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      article: {},
      isLoading: false,
      is404: false,
      isfollowLoading: false,
      total_cnt: 0,
      isShowCommentPop: false,
      commentList: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArtcleInfo()
  },
  mounted () { },
  methods: {
    // 加载文章详情信息
    async loadArtcleInfo () {
      try {
        // 随机错误
        // throw Error()
        this.isLoading = true
        const { data } = await getArticleById(this.articleId)
        this.article = data.data
        this.isLoading = false
        this.$nextTick(_ => {
          this.previewImg()
        })
      } catch (err) {
        // 加载失败 404
        if (err.response && err.response.status === 404) {
          this.is404 = true
        }
        this.$toast('获取失败')
        // 加载完成
        this.isLoading = false
      }
    },
    // 发布评论成功
    onSuccessPost (data) {
      this.commentList.unshift(data) // 插入最新评论
      this.isShowCommentPop = false // 隐藏弹框
    },
    // 图片预览
    previewImg () {
      const articleContent = this.$refs.articleContent
      const imgsEl = articleContent.querySelectorAll('img')
      const images = []
      imgsEl.forEach((element, index) => {
        images.push(element.src)
        element.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    }

  }
}
</script>

<style scoped lang="less">
.article-container {
  /deep/.page-nav-bar {
    .van-nav-bar__content {
      .van-nav-bar__left {
        i.van-icon {
          color: #fff;
        }
      }
    }
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
