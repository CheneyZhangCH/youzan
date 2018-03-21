// 使用vuex插件
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Address from 'js/addressService.js'

// 创建store实例
const store = new Vuex.Store({
  state: {
    lists: null
  },
  // 同步操作
  mutations: {
    init(state, lists) {
      state.lists = lists
    },
    add(state, instance) {
      state.lists.push(instance)
    }
  },
  // 异步操作，必须调用mutations内的方法
  actions: {
    getList({commit}) {
      Address.list().then(res => {
        // this.lists = res.data.lists
        commit('init', res.data.lists)
      })
    },
    addAddress({commit}, instance) {
      Address.add(instance).then(res => {
        commit('add', instance)
      })
    }
  }
})

export default store
