
import { getItem, setItem, removeItem, clear } from '@src/utils/storageHelper.js'

/**
 * @description 儲存 storage 使用的 key
 */
const key = {
  conversationId: 'conversationId',
  token: 'token',
  id: 'id',
  name: 'name'
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
   * Token
   */
  token: {
    key: key.token,
    get value () { return getItem.session(this.key) },
    set value (val) { setItem.session(this.key, val) },
    remove () { removeItem.session(this.key) }
  },

  /**
   * 用戶ID
   */
  id: {
    key: key.id,
    get value () { return getItem.local(this.key) },
    set value (val) { setItem.local(this.key, val) },
    remove () { removeItem.local(this.key) }
  },

  /**
   * 用戶姓名
   */
  name: {
    key: key.name,
    get value () { return getItem.cookie(this.key) },
    set value (val) { setItem.cookie(this.key, val) },
    remove () { removeItem.cookie(this.key) }
  },

  /**
   * 清除所有存放在前端的資料
   */
  clearAll () {
    clear.all()
  }
}
