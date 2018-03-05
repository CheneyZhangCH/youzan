let url = {
  hostLists: '/index/hotLists',
  banner: '/index/banner',
  topList: '/category/topList'
}

let host = "http://rapapi.org/mockjsdata/32079"

for (let key in url) {
  if (url.hasOwnProperty(key)) {
    url[key] = host + url[key]
  }
}

export default url
