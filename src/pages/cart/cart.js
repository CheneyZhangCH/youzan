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
    totalPrice: 0,
    editingShop: null,
    editingShopIndex: -1,
    removePopup: false,
    removeData: null,
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
    },
    allRemoveSelected: {
      get() {
        if (this.editingShop) {
          return this.editingShop.removeChecked
        }
        return false
      },
      set(newVal) {
        if (this.editingShop) {
          this.editingShop.removeChecked = newVal
          this.editingShop.goodsList.forEach(goods => {
            goods.removeChecked = newVal
          })
        }
      }
    },
    selectLists() {
      if (this.lists && this.lists.length) {
        let arr = []
        let total = 0
        this.lists.forEach(shop => {
          shop.goodsList.forEach(goods => {
            if (goods.checked) {
              arr.push(goods)
              total += goods.price * goods.number
            }
          })
        })
        this.totalPrice = total
        return arr
      } else {
        return []
      }
    },
    removeLists() {
      if (this.editingShop) {
        let arr = []
        this.editingShop.goodsList.forEach(goods => {
          if (goods.removeChecked) {
            arr.push(goods)
          }
        })
        return arr
      }
      return []
    },
  },
  methods: {
    getList() {
      axios.post(url.cartLists).then(res => {
        let lists = res.data.cartList
        lists.forEach(shop => {
          shop.checked = true
          shop.removeChecked = false
          shop.editing = false
          shop.editingMsg = '编辑'
          shop.goodsList.forEach(goods => {
            goods.checked = true
            goods.removeChecked = false
          })
        })
        this.lists = lists
      })
    },
    selectGood(shop, goods) {
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      goods[attr] = goods[attr] ? false : true
      shop[attr] = shop.goodsList.every(goods => {
        return goods[attr]
      })
    },
    selectShop(shop) {
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      shop[attr] = shop[attr] ? false : true
      shop.goodsList.forEach(goods => {
        goods[attr] = goods[attr] ? false : true
      })
    },
    selectAll() {
      let attr = this.editingShop ? 'allRemoveSelected' : 'checked'
      this[attr] = this[attr] ? false : true
    },
    edit(shop, shopIndex) {
      shop.editing = shop.editing ? false : true
      shop.editingMsg = shop.editing ? '完成' : '编辑'
      this.lists.forEach((item, i) => {
        if (shopIndex !== i) {
          item.editing = false
          item.editingMsg = shop.editing ? '' : '编辑'
        }
      })
      this.editingShop = shop.editing ? shop : null
      this.editingShopIndex = shop.editing ? shopIndex : -1
    },
    reduce(goods) {
      if (goods.number === 1) {
        return
      }
      axios.post(url.cartReduce, {
        id: goods.id,
        number: 1
      }).then(res => {
        goods.number--
      })
    },
    add(goods) {
      axios.post(url.cartAdd, {
        id: goods.id,
        number: 1,
      }).then(res => {
        goods.number++
      })
    },
    remove(shop, shopIndex, goods, goodsIndex) {
      this.removePopup = true
      this.removeData = {
        shop,
        shopIndex,
        goods,
        goodsIndex
      }
    },
    removeConfirm() {
      let {shop, shopIndex, goods, goodsIndex} = this.removeData
      axios.post(url.cartRemove, {
        id: goods.id,
      }).then(res => {
        shop.goodsList.splice(goodsIndex, 1)
        if (!shop.goodsList.length) {
          this.lists.splice(shopIndex, 1)
          this.removeShop()
        }
        this.removePopup = false
      })
    },
    removeShop() {
      this.editingShop = null;
      this.editingShopIndex = -1;
      this.lists.forEach(shop => {
        ;
        shop.editing = false
        shop.editingMsg = '编辑'
      })
    }
  },
  mixins: [mixin],
})



