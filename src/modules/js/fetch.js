import axios from 'axios'

function fetch(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(res => {
      let status = res.data.status
      // 状态正常
      if (status === 200) {
        resolve(res)
      }
      if (status === 300) {
        // 检验到未登录状态，强制跳转
        location.href = 'login.html'
        reject(res)
      }
      reject(res)
    }).catch(error => {
      // 错误捕获
      reject(error)
    })
  })
}

export default fetch
