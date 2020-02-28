const {environment} = require('@rails/webpacker')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const vueLoad = {
  test: /\.vue$/,
  use: 'vue-loader'
}

environment.config.set('resolve.alias.vue$', 'vue/dist/vue.js')

// Insert json loader at the end of list
environment.loaders.append('vue', vueLoad)
environment.plugins.append('VueLoaderPlugin', new VueLoaderPlugin())

module.exports = environment
