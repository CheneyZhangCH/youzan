import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import mixin from 'js/mixin.js'

import Velocity from 'velocity-animate'

import Cart from 'js/cartService.js'

new Vue({
  el: '.container',
  data: {
    lists: null,
    totalPrice: 0,
    editingShop: null,
    editingShopIndex: -1,
    removePopup: false,
    removeData: null,
    removeMsg: '',
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
      Cart.getList().then(
        res => {
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
        }
      )
      // axios.post(url.cartLists).then(res => {
      //   let lists = res.data.cartList
      //   lists.forEach(shop => {
      //     shop.checked = true
      //     shop.removeChecked = false
      //     shop.editing = false
      //     shop.editingMsg = '编辑'
      //     shop.goodsList.forEach(goods => {
      //       goods.checked = true
      //       goods.removeChecked = false
      //     })
      //   })
      //   this.lists = lists
      // })
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
      Cart.reduce(goods.id).then(res => {
        goods.number--
      })
      // axios.post(url.cartReduce, {
      //   id: goods.id,
      //   number: 1
      // }).then(res => {
      //   goods.number--
      // })
    },
    add(goods) {
      // axios.post(url.cartAdd, {
      //   id: goods.id,
      //   number: 1,
      // }).then(res => {
      //   goods.number++
      // })
      Cart.add(goods.id).then(res => {
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
      this.removeMsg = '确定要删除该商品吗？'
    },
    removeList() {
      this.removePopup = true
      this.removeMsg = `确定将所选 ${this.removeLists.length} 个商品删除吗？`
    },
    removeConfirm() {
      // 删除单个商品
      if (this.removeMsg === '确定要删除该商品吗？') {
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
          this.$refs[`goods-${shopIndex}-${goodsIndex}`][0].style.left = '0px'
        })
      } else {
        // 删除多个商品，需要删除的商品列表源自computed属性中removeLists
        let ids = []
        this.removeLists.forEach(goods => {
          ids.push(goods.id)
        })
        axios.post(url.cartMRemove, {ids}).then(res => {
          let arr = []
          this.editingShop.goodsList.forEach(goods => {
            let index = this.removeLists.findIndex(item => {
              return item.id = goods.id
            })
            if (index === -1) {
              arr.push(goods)
            }
          })
          if (arr.length) {
            this.editingShop.goodsList = arr
          } else {
            this.lists.splice(this.editingShopIndex, 1)
            this.removeShop()
          }
          this.removePopup = false
        })
      }
    },
    removeCancel() {
      this.removePopup = false
    },
    removeShop() {
      this.editingShop = null;
      this.editingShopIndex = -1;
      this.lists.forEach(shop => {
        shop.editing = false
        shop.editingMsg = '编辑'
      })
    },
    start(e, goods) {
      goods.startX = e.changedTouches[0].clientX
    },
    end(e, goods, goodsIndex, shopIndex) {
      let endX = e.changedTouches[0].clientX
      let left = '0'
      if (goods.startX - endX > 100) {
        left = '-60px'
      }
      if (endX - goods.startX > 100) {
        left = '0px'
      }
      Velocity(this.$refs[`goods-${shopIndex}-${goodsIndex}`], {
        left
      })

    },
  },
  mixins: [mixin],
})



