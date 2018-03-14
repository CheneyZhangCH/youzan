import 'css/common.css'
import './category.css'


import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import Foot from 'components/Foot.vue'

new Vue({
  el: '#app',
  data: {
    topLists: null,
    topIndex: 0,
    subData: null,
    rankData: null,
  },
  created() {
    this.getTopList()
    this.getSubList(0)
  },
  methods: {
    getTopList() {
      axios.post(url.topList).then(res => {
        this.topLists = res.data.lists
      })
    },
    getSubList(index, id) {
      this.topIndex = index
      if (index === 0) {
        this.getRank()
      } else {
        axios.post(url.subList, {id: id}).then(res => {
          this.subData = res.data.data
          console.log(this.subData);
        })
      }
    },
    getRank() {
      axios.post(url.rank).then(res => {
        this.rankData = res.data.data
      })
    }
  },
  components: {
    Foot
  },
  filter: {

    formatCurrency(num) {
      num = num.toString().replace(/\$|\,/g, '');
      if (isNaN(num))
        num = "0";
      sign = (num == (num = Math.abs(num)));
      num = Math.floor(num * 100 + 0.50000000001);
      cents = num % 100;
      num = Math.floor(num / 100).toString();
      if (cents < 10)
        cents = "0" + cents;
      for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
          num.substring(num.length - (4 * i + 3));
      return (((sign) ? '' : '-') + num + '.' + cents);
    }
  }
})

