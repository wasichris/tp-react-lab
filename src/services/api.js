import { post, postFile } from '@src/utils/apiHelper'

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
  }
}
