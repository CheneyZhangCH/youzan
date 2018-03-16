import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'

let {keyword, id} = qs.parse(location.search.substr(1))

import mixin from 'js/mixin.js'

import Velocity from 'velocity-animate'

new Vue({
  el: '.container',
  data: {
    searchList: null,
    keyword,
    isShow: false,
    pageNum: 1,
    pageSize: 8,
    loading: false,
    allLoaded: false,
  },
  created() {
    this.getSearchList()
  },
  methods: {
    getSearchList() {
      if (this.allLoaded) {
        return
      }
      this.loading = true
      axios.post(url.searchList, {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then((res) => {
        let currentLists = res.data.lists

        //判断数据是否加载完毕
        if (currentLists.length < this.pageSize) {
          this.allLoaded = true
        }
        if (this.searchList) {
          // 已有数据再次请求
          this.searchList = this.searchList.concat(currentLists)
        } else {
          // 初次请求
          this.searchList = res.data.lists
        }
        this.loading = false
        this.pageNum++
      })

    },
    move() {
      //  此处document.body.scrollTop 一直为0
      // if (document.body.scrollTop > 100) {
      //   this.isShow = true
      // } else {
      //   this.isShow = false
      // }

      if (window.pageYOffset > 100) {
        this.isShow = true
      } else {
        this.isShow = false
      }
      this.getSearchList()

    },

    toTop() {
      Velocity(document.body, 'scroll', {duration: 1000})
    }
  },
  mixins: [mixin]
})
