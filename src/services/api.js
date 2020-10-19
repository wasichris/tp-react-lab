import { post, postFile, get } from '@src/utils/apiHelper'

export default {

  /* 取得聯絡人清單 */
  // === request  ===
  // { contactId }
  // === response ===
  // {
  //   id: contactId,
  //   contacts: [
  //     { name: 'chris', phone: '0911111111', isMarried: true },
  //     { name: 'jason', phone: '0922222222', isMarried: false }
  //   ]
  // }
  getContacts: ({ contactId }) => {
    return post('/lab/getContacts', { contactId })
  },

  /* 登入系統 */
  // === request  ===
  // { id, pcode }
  // === response ===
  // {
  //   isSuccess: true,
  //   msg: 'hi chris, welcome to the practice page'
  // }
  login: ({ id, pcode }) => {
    return post('/lab/login', { id, pcode })
  },

  /* 上傳檔案 */
  uploadImage: (formData) => {
    return postFile('/lab/uploadImage', formData)
  },

  /* 中台不同，主要是 refresh_token & access_token 測試使用 */
  /* 登入 */
  authenticate: ({ username, password }) => {
    return post('/users/authenticate', { username, password })
  },
  /* 換發 access_token */
  refreshToken: () => {
    return post('/users/refresh-token')
  },
  /* 取的用戶名單 */
  getUsers: () => {
    return get('/users')
  }
}
