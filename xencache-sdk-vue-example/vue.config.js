const path = require('path')

module.exports = {
  lintOnSave: false,

  outputDir: '../docs/vue-example',
  publicPath: '/xencache/vue-example/',

  configureWebpack: {

    entry: {
      app: path.resolve(__dirname, './src/main.js'),
    },
    // import '@vue/ui/dist/vue-ui.css'
    // import '@vue/ui/src/vue-ui.css'
    // import '@vue/ui/src/style/colors.styl'
    resolve: {
      alias: {
        // '@style': path.resolve(__dirname, './node_modules/@vue/ui/src/style/colors.styl'),
        // '@': path.resolve(__dirname, './src'),
      },
    },
  },

  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add(path.resolve(__dirname, './src'))

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
  },
}
