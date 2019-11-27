/* eslint-disable no-template-curly-in-string */
import { setLocale } from 'yup'

// ref: https://github.com/jquense/yup/blob/master/src/locale.js
setLocale({
  mixed: {
    default: '欄位檢核錯誤',
    required: '必填欄位'
  },
  string: {
    min: '請至少輸入 ${min} 字元',
    uppercase: '請輸入大寫英文'
  },
  number: {
    min: '輸入數值必須超過 ${min} '
  }
})
