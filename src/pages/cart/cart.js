import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import axios from 'axios'
import mixin from 'js/mixin.js'
import url from 'js/api.js'

new Vue({
  el: '.container',
  data: {
    lists: null,
  },
  created() {
    this.getList()
  },
  computed: {
    allSelected: {
      get() {

        if (this.lists && this.lists.length) {
          return this.lists.every(shop => {
            return shop.checked
          })
        }
        return false
      },
      set(newVal) {
        this.lists.forEach(shop => {
          shop.checked = newVal
          shop.goodsList.forEach(goods => {
            goods.checked = newVal
          })
        })
      }
    }
  },
  methods: {
    getList() {
      axios.post(url.cartLists).then(res => {
        let lists = res.data.cartList
        lists.forEach(shop => {
          shop.checked = true
          shop.goodsList.forEach(goods => {
            goods.checked = true
          })
        })
        this.lists = lists
      })
    },
    selectGood(shop, goods) {
      goods.checked = goods.checked ? false : true
      shop.checked = shop.goodsList.every(goods => {
        return goods.checked
      })
    },
    selectShop(shop) {
      shop.checked = shop.checked ? false : true
      shop.goodsList.forEach(goods => {
        goods.checked = goods.checked ? false : true
      })
    },
    selectAll() {
      this.allSelected = this.allSelected ? false : true
    }
  },
  mixins: [mixin],
})



