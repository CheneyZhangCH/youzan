import fetch from 'js/fetch.js'
import url from 'js/api.js'

class Cart {

  static getList() {
    return fetch(url.cartLists)
  }

  static add(id) {
    return fetch(url.cartAdd, {
      id: id,
      number: 1,
    })
  }

  static reduce(id) {
    return fetch(url.cartReduce, {
      id: id,
      number: 1,
    })
  }

}

export default Cart
