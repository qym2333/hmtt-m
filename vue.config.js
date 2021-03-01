module.exports = {
  chainWebpack: config => {
    // 生产环境
    config.when(process.env.NODE_ENV === 'production', config => {
      // config.entry('app').clear().add('./src/prod_env.js')
      // config.set('externals', {})
      // 设置变量
      config.plugin('html').tap(args => {
        args[0].title = '蛤蟆头条'
        args[0].isProd = true // 上线模式
        return args
      })
    })
    // 开发环境
    config.when(process.env.NODE_ENV === 'development', config => {
      // config.entry('app').clear().add('./src/dev_env.js')
      // 设置变量
      config.plugin('html').tap(args => {
        args[0].title = '蛤蟆头条-DEV'
        args[0].isProd = false // 开发模式
        return args
      })
    })
  }
}
