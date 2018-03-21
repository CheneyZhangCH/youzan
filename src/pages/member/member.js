import './member.css'

import Vue from 'vue'

import router from './router/index'

import store from './vuex/index.js'

// 3.根组件的挂载注入
new Vue({
  el: '#app',
  router,
  store
})

