/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup'

export default () => yup.string().test({
  name: 'twIdSchema',
  exclusive: true,
  params: {},
  message: '身分證號格式不合',

  // 檢核邏輯
  // 回傳 true / false 表示是否合法，並使用"預設"錯誤訊息
  // 回傳 createError 表示發生特定錯誤需顯示特定的錯誤訊息
  test: async function isValid (value) {
    // 長度只能 8, 10, 11
    if (value.length !== 8 && value.length !== 10 && value.length !== 11) return false

    // 若ID前二位 或 第9、10位為英文字母，則為外國人ID，就不檢核身分證編碼邏輯，直接通過
    const isBeginWith2EC = /^[a-zA-Z][a-zA-Z].*/.test(value)
    const isNightTenWith2EC = /^.{8}[a-zA-Z][a-zA-Z]$/.test(value)
    // 公司戶統編8碼數字 可通過驗証
    const isCompanyId = /^\d{8}$/.test(value)
    if (isBeginWith2EC || isNightTenWith2EC || isCompanyId) return true

    // 開始檢核身分證號
    var tab = 'ABCDEFGHJKLMNPQRSTUVXYWZIO'
    var A1 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3]
    var A2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5]
    var Mx = [9, 8, 7, 6, 5, 4, 3, 2, 1, 1]

    // 重碼身分證字號11碼的前10碼仍需進行身分證字號驗證
    if (value.length !== 10 && value.length !== 11) return false
    var i = tab.indexOf(value.toUpperCase().charAt(0))
    if (i === -1) return false
    var sum = A1[i] + A2[i] * 9
    for (i = 1; i < 10; i++) {
      var v = parseInt(value.charAt(i))
      if (isNaN(v)) return false
      sum = sum + v * Mx[i]
    }
    if (sum % 10 !== 0) return false

    return true
  }
})
