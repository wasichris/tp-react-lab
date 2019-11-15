import axios from 'axios'

// 全局設定 AJAX Request 攔截器 (interceptor)
axios.interceptors.request.use(async function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// 全局設定 AJAX Response 攔截器 (interceptor)
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response) {
    // server responded status code falls out of the range of 2xx

    const { message } = error.response.data
    console.error(message)

    switch (error.response.status) {
      case 400:
        alert(`${error.response.status}: ${message || '資料錯誤'}。`)
        break

      case 401:
        alert(`${error.response.status}: 作業逾時或無相關使用授權，請重新登入`)
        break

      case 500:
        alert(`${error.response.status}: 內部系統發生錯誤`)
        break

      default:
        alert(`${error.response.status}: 系統維護中，造成您的不便，敬請見諒。`)

        break
    }
  } else {
    // Something happened in setting up the request that triggered an Error
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      // request time out will be here
      alert('網路連線逾時，請點「確認」鍵後繼續使用。')
    } else {
      // shutdonw api server
      alert('網路連線不穩定，請稍候再試')
    }
  }

  return Promise.reject(error)
})
