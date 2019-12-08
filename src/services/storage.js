
import { getItem, setItem, removeItem, clear } from '@src/utils/storageHelper.js'

/**
 * @description 儲存 storage 使用的 key
 */
const key = {
  conversationId: 'conversationId'
}

export default {

  /**
   * 初始對話後取得的對談ID
   */
  conversationId: {
    key: key.conversationId,
    get value () { return getItem.session(this.key) },
    set value (val) { setItem.session(this.key, val) },
    remove () { removeItem.session(this.key) }
  },

  /**
   * 清除所有存放在前端的資料
   */
  clearAll () {
    clear.all()
  }
}
