module.exports = {
  plugins: {
    // autoprefixer 自动为css添加浏览器兼容前缀
    // 属于postcss其中的一个工具
    // vuecli 默认集成autoprefixer插件 无需再配置
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },

    // 配置使用 postcss-pxtorem 插件
    // 作用：把 px 转为 rem
    'postcss-pxtorem': {
      rootValue ({ file }) {
        // vant样式 1rem = 37.5px 
        // 其他样式 1rem = 75px
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'],
      exclude: 'github-markdown'
    }
  }
}