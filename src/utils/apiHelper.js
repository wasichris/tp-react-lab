import axios from 'axios'
import constant from '@src/constants'

// 發送 request 需夾帶 cookie
axios.defaults.withCredentials = true

const postFile = async (url, formData = {}) => {
  return axios.post(
    url,
    formData,
    {
      baseURL: constant.apiUrl,
      timeout: constant.timeout,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'json'
    }
  ).then(async (res) => {
    const { data } = res
    return data
  }).catch(error => {
    return errorHandle(url, error)
  })
}

// 使用 post 送出資料
const post = async (url, reqData) => {
  return axios.post(
    url,
    reqData,
    {
      baseURL: constant.apiUrl,
      timeout: constant.timeout,
      responseType: 'json'
    }
  ).then(async (res) => {
    const { data } = res
    apiConsoleLog(url, reqData, data)
    return data
  }).catch(error => {
    return errorHandle(url, error)
  })
}

// 使用 get 送出資料
const get = async (url, params) => {
  return axios.get(
    url,
    {
      params,
      baseURL: constant.apiUrl,
      timeout: constant.timeout,
      responseType: 'json'
    }
  ).then(async (res) => {
    const { data } = res
    apiConsoleLog(url, params, data)
    return data
  }).catch(error => {
    return errorHandle(url, error)
  })
}

const apiConsoleLog = (url, rawData) => {
  console.log('\r')
  console.log(`%c >>> Request(${url})⤵ `, 'background-color: #7CBC9D; color: white; font-size: 14px; font-weight: bold;', rawData)
}

const errorHandle = (url, error) => {
  const { response } = error
  console.log(`%c API發生例外錯誤 ${((response && response.status) ? `status code [${response.status}]` : '')}`, 'color: #BB2E29; font-size: 14px; font-weight: bold;')
  return Promise.reject(error)
}

export {
  post,
  postFile,
  get
}
