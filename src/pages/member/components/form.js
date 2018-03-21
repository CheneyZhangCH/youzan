import Address from 'js/addressService.js'

export default {
  data() {
    return {
      name: '',
      tel: '',
      provinceValue: -1,
      // provinceName: '',
      cityValue: -1,
      // cityName: '',
      districtValue: -1,
      // districtName: '',
      address: '',
      id: '',
      type: '',
      instance: '',
      addressData: require('js/address.json'),
      cityList: null,
      districtList: null,
    }
  },
  created() {
    let query = this.$route.query
    this.type = query.type
    this.instance = query.instance
    // 如果是编辑地址，则先拿到编辑前的地址数据并进行渲染，显示在编辑页面
    if (this.type === 'edit') {
      let ad = this.instance
      console.log(ad);
      this.provinceValue = parseInt(ad.provinceValue)
      this.name = ad.name
      this.tel = ad.tel
      this.address = ad.address
      this.id = ad.id
    }
  },
  computed: {
    lists() {
      return this.$store.state.lists
    }
  },
  watch: {
    lists: {
      handler() {
        this.$router.go(-1)
      },
      deep: true
    },
    provinceValue: function (val) {
      if (val === -1) {
        return
      }
      let list = this.addressData.list
      let index = list.findIndex(item => {
        return item.value === val
      })
      this.cityList = list[index].children;
      this.cityValue = -1;
      this.districtValue = -1;
      if (this.type === 'edit') {
        this.cityValue = parseInt(this.instance.cityValue)
      }
    },
    cityValue: function (val) {
      if (val === -1) {
        return
      }
      let list = this.cityList
      let index = list.findIndex(item => {
        return item.value === val
      })
      this.districtList = list[index].children
      this.districtValue = -1

      if (this.type === 'edit') {
        this.districtValue = parseInt(this.instance.districtValue)
      }
    }
  },

  methods: {
    add() {
      // 需要做合法性校验
      let {name, tel, provinceValue, cityValue, districtValue, address} = this
      let provinceName = ''
      let cityName = ''
      let districtName = ''
      this.addressData.list.forEach(province => {
        if (province.value === provinceValue) {
          provinceName = province.label
          console.log(provinceName);
          province.children.forEach(city => {
            if (city.value === cityValue) {
              cityName = city.label
              console.log(this.cityName);
              city.children.forEach(district => {
                if (district.value === districtValue) {
                  districtName = district.label
                  console.log(this.districtName);
                }
              })
            }
          })
        }
      })

      let data = {name, tel, provinceValue, cityValue, districtValue, address, provinceName, cityName, districtName}
      console.log(data)
      if (this.type === 'add') {
        // Address.add(data).then(res => {
        //   this.$router.go(-1)
        // })
        this.$store.dispatch('addAddress', data)
      }
      if (this.type === 'edit') {
        data.id = this.id
        // Address.update(data).then(res => {
        //   this.$router.go(-1)
        // })
        this.$store.dispatch('updateAddress', data)
      }
    },
    remove() {
      if (window.confirm('确认删除该地址嘛')) {
        // Address.remove(this.id).then(res => {
        //   this.$router.go(-1)
        // })
        this.$store.dispatch('removeAddress', this.id)
      }
    },
    setDefault() {
      // Address.setDefaule(this.id).then(res => {
      //   this.$router.go(-1)
      // })
      this.$store.dispatch('setDefaultAddress', this.id)
    }
  }
}
