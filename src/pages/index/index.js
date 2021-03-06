import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

// import Foot from 'components/Foot.vue'

import Swiper from 'components/Swiper.vue'

import mixin from 'js/mixin.js'


import {InfiniteScroll} from 'mint-ui';

Vue.use(InfiniteScroll);


let app = new Vue({
  el: '#app',
  data: {
    lists: null,
    pageNum: 1,
    pageSize: 6,
    loading: false,
    allLoaded: false,
    bannerLists: null
  },
  created() {
    this.getLists()
    this.getBanner()
  },
  methods: {
    getLists() {
      if (this.allLoaded) {
        return
      }
      this.loading = true
      axios.post(url.hostLists, {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then((res) => {
        let currentLists = res.data.list

        //判断数据是否加载完毕
        if (currentLists.length < this.pageSize) {
          this.allLoaded = true
        }
        if (this.lists) {
          // 已有数据再次请求
          this.lists = this.lists.concat(currentLists)
        } else {
          // 初次请求
          this.lists = res.data.list
        }
        this.loading = false
        this.pageNum++
      })
    },
    getBanner() {
      axios.get(url.banner).then(res => {
        this.bannerLists = res.data.lists
      })
    }
  },
  components: {
    // Foot,
    Swiper
  },
  mixins: [mixin]
})
