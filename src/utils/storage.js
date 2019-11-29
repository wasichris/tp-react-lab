
const setItem = {
  /**
   * @description 儲存 key/value 於 sessionStorage
   * @param {string} key key
   * @param {object} value 儲存資料
   */
  session: (key, value) => { if (key) window.sessionStorage.setItem(key, value) },
  /**
   * @description 儲存 key/value 於 localStorage
   * @param {string} key key
   * @param {object} value 儲存資料
   */
  local: (key, value) => { if (key) window.localStorage.setItem(key, value) },
  /**
   *
   * @description 設定cookie
   * @param {string} name cookie名稱
   * @param {string} value cookie值
   * @param {string} expiredays 有效日(day)
   */
  cookie: (name, value, expiredays) => {
    let expires = ''
    if (expiredays) {
      const date = new Date()
      date.setTime(date.getTime() + (expiredays * 24 * 60 * 60 * 1000))
      expires = '; expires=' + date.toUTCString()
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/'
  }
}

const getItem = {
  /**
   * @description 由 sessionStorage 取得指定 key 之資料
   * @param {string} key key
   */
  session: (key) => {
    let _value = ''
    if (key) _value = window.sessionStorage.getItem(key)
    return _value || ''
  },
  /**
   * @description 由 localStorage 取得指定 key 之資料
   * @param {string} key key
   */
  local: (key) => {
    let _value = ''
    if (key) _value = window.localStorage.getItem(key)
    return _value || ''
  },
  /**
   *
   * @description 取得cookie
   * @param {string} name cookie名稱
   */
  cookie: (name) => {
    const nameEQ = name + '='
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) {
        // 資料由cookie取出時要注意需要decode(ascii)
        return decodeURIComponent(c.substring(nameEQ.length, c.length))
      }
    }
    return null
  }
}

const removeItem = {
  /**
   * @description 由 sessionStorage 移除指定 key 之資料
   * @param {string} key key
   */
  session: (key) => { if (key) window.sessionStorage.removeItem(key) },
  /**
   * @description 由 localStorage 移除指定 key 之資料
   * @param {string} key key
   */
  local: (key) => { if (key) window.localStorage.removeItem(key) },
  /**
   * @description 由 cookie 移除指定 name 之資料
   * @param {string} name name
   */
  cookie: (name) => {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
  }
}

const clear = {
  /**
   * @description 清除所有儲存於 sessionStorage 之資料
   */
  session: () => { window.sessionStorage.clear() },
  /**
   * @description 清除所有儲存於 localStorage 之資料
   */
  local: () => { window.localStorage.clear() },
  /**
   * @description 清除所有的cookies
   */
  cookie: () => {
    var cookies = document.cookie.split(';')

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i]
      var eqPos = cookie.indexOf('=')
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  },
  /**
   * @description 清除所有儲存於 sessionStorage 與 localStorage 之資料
   */
  all: () => {
    clear.session()
    clear.local()
    clear.cookie()
  }
}

/**
 * @description 儲存 storage 使用的 key
 */
const key = {
  conversationId: 'conversationId', // 初始對話後取得的ID
  token: 'token',
  id: 'id',
  name: 'name'
}

export default {

  /**
   * 初始對話後取得的ID
   */
  conversationId: {
    key: key.conversationId,
    get value () { return getItem.session(this.key) },
    set value (val) { setItem.session(this.key, val) },
    remove () { removeItem.session(this.key) }
  },

  token: {
    key: key.token,
    get value () { return getItem.session(this.key) },
    set value (val) { setItem.session(this.key, val) },
    remove () { removeItem.session(this.key) }
  },

  id: {
    key: key.id,
    get value () { return getItem.local(this.key) },
    set value (val) { setItem.local(this.key, val) },
    remove () { removeItem.local(this.key) }
  },

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
