import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_transition.css'

import Vue from 'vue'
import url from 'js/api.js'
import axios from 'axios'
import mixin from 'js/mixin.js'
import qs from 'qs'
import Swiper from 'components/Swiper'

let {id} = qs.parse(location.search.substr(1))

let detailTab = ['商品详情', '本店成交']

new Vue({
  el: '#app',
  data: {
    id,
    details: null,
    dealLists: null,
    detailTab,
    tabIndex: 0,
    bannerLists: null,
    skuType: 0,
    showSku: false,
    skuNum: 1,
    isAddChart: false,
    showAddMessage: false
  },
  created() {
    this.getDetails()
  },
  methods: {
    getDetails() {
      axios.post(url.details, {id}).then(res => {
        this.details = res.data.data
        this.bannerLists = []
        this.details.imgs.forEach(item => {
          this.bannerLists.push({
            clickUrl: '',
            image: item
          })
        })
      })
    },
    changeTab(index) {
      this.tabIndex = index
      if (index === 1) {
        this.getDeal()
      }
    },
    getDeal() {
      axios.post(url.deal, {id}).then(res => {
        this.dealLists = res.data.data.lists
      })
    },
    chooseSku(type) {
      this.skuType = type
      this.showSku = true
    },
    changeSkuNum(num) {
      if (num === -1 && this.skuNum === 1) {
        return
      } else {
        this.skuNum += num
      }
    },
    addChart() {
      axios.post(url.addChart, {
        id,
        number: this.skuNum
      }).then(res => {
        if (res.data.status === 200) {
          this.showSku = false
          this.isAddChart = true
          this.showAddMessage = true
          setTimeout(() => {
            this.showAddMessage = false
          }, 1500)
        }
      })
    },
  },
  mixins: [mixin],
  components: {
    Swiper
  },
  watch: {
    showSku(val, oldVal) {
      document.body.style.overflow = val ? 'hidden' : 'auto'
      document.querySelector('html').style.overflow = val ? 'hidden' : 'auto'
      document.body.style.height = val ? '100%' : 'auto'
      document.querySelector('html').style.height = val ? '100%' : 'auto'
    }
  }
})


