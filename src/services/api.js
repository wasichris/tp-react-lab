import { post } from '@src/utils/apiHelper'

export default {
  /* 取得聯絡人清單 */
  // === response ===
  // {
  //   id: contactId,
  //   contacts: [
  //     { name: 'chris', phone: '0911111111', isMarried: true },
  //     { name: 'jason', phone: '0922222222', isMarried: false }
  //   ]
  // }
  getContacts: ({ contactId }) => {
    return post('/survey/getContacts', { contactId })
  },
  /* 登入系統 */
  // === response ===
  // {
  //   isSuccess: false,
  //   msg: 'hi chris, welcome to the practice page'
  // }
  login: ({ id, pcode }) => {
    return post('/survey/login', { id, pcode })
  }
}
