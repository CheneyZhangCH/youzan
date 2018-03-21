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
    },
    remove(state, id) {
      let lists = state.lists
      let index = lists.findIndex(item => {
        return item.id === id
      })
      lists.splice(index, 1)
    },
    update(state, instance) {
      let lists = JSON.parse(JSON.stringify(state.lists))
      let index = lists.findIndex(item => {
        return item.id === instance.id
      })
      lists[index] = instance
      state.lists = lists
    },
    setDefault(state, id) {
      let lists = state.lists
      lists.forEach(item => {
        item.isDefault = item.id === id ? true : false
      })
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
    },
    removeAddress({commit}, id) {
      Address.remove(id).then(res => {
        commit('remove', id)
      })
    },
    updateAddress({commit}, instance) {
      Address.update(instance).then(res => {
        commit('update', instance)
      })
    },
    setDefaultAddress({commit}, id) {
      Address.setDefault(id).then(res => {
        commit('setDefault', id)
      })
    }
  }
})

export default store
