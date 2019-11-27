/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup'

export default ({ title }) => yup.string().test({
  // 檢核名稱 (不重複，套件內部使用)
  name: 'accountSchema',

  // 如果有相同名稱的檢核時，使用此獨家的檢核邏輯
  exclusive: true,

  // 插入錯誤訊息的參數定義
  params: { title },

  // 預設錯誤訊息
  message: '${title}僅允許輸入小寫英文',

  // 檢核邏輯
  // 回傳 true / false 表示是否合法，並使用"預設"錯誤訊息
  // 回傳 createError 表示發生特定錯誤需顯示特定的錯誤訊息
  test: async function isValid (value) {
    const { createError, path } = this

    // rule01 (自定義的錯誤訊息)
    if (value === 'admin') {
      return createError({ path, message: `${title}禁止設定為 ${value}` })
    }

    // rule02 (非同步的遠端驗證)
    await new Promise(resolve => setTimeout(resolve, 50))

    // rule for default error message
    return /^[a-z]+$/.test(value)
  }
})
