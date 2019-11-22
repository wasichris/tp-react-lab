import { createAction, createReducer } from 'redux-act'
import { takeEvery, put, take, fork, select, call } from 'redux-saga/effects'
import get from 'lodash/get'
import api from '@src/services/api'

/**
 * Default State
 */
const defaultState = {
  isLogin: false
}

/**
 * Reducer Actions
 */
const resetAppModel = createAction('Reset app model')
const setIsLogin = createAction('Setting user is login or not')

/**
 * Reducers
 */
const reducer = createReducer({
  [resetAppModel]: () => {
    return { ...defaultState }
  },
  [setIsLogin]: (state, payload) => {
    return { ...state, isLogin: payload }
  }
}, defaultState)

/**
 * Saga Actions
 */
const initApp = createAction('Init app')
const login = createAction('Login system')
const logout = createAction('Logout system')
const loginSuccess = createAction('Login system success')

const action = {
  resetAppModel,
  setIsLogin,
  initApp,
  login,
  logout,
  loginSuccess
}

/**
 * Saga Generator functions
 */
function * initAppSaga ({ payload }) {
  try {
    console.log('%c init app ', 'background-color: #3A88AE; color: white;font-size: 14px; font-weight: bold;', `v${process.env.npm_package_version}`)
    // 進入 app 需要初始化的工作
    // ....
  } catch (error) {
    console.error('initAppSaga error:', error)
  }
}

function * loginSaga ({ payload }) {
  try {
    // 登入系統
    const { id, pcode } = payload
    const { isSuccess, msg } = yield call(api.login, { id, pcode })

    // 登入成功
    if (isSuccess) {
      yield put(loginSuccess())
    }

    // 顯示訊息
    window.alert(msg)
  } catch (error) {
    console.error('loginSaga error:', error)
  }
}

function * authFlowSaga () {
  try {
    while (true) {
      // 檢查目前是否為已登入狀態
      const isLogin = yield select(state => get(state, 'app.isLogin', false))
      if (isLogin === false) {
        // == 未登入 ==

        // [阻塞] 等待登入成功訊號
        yield take([loginSuccess])

        // 設定登入狀態為已登入
        yield put(setIsLogin(true))
      } else {
        // == 已登入 ==

        // [阻塞] 等待登出要求訊號
        yield take([logout])

        // 處理登出事宜 (ex. 清理session storage)
        // ....

        // 設定登入狀態為未登入
        yield put(setIsLogin(false))
      }
    }
  } catch (error) {
    console.error('authFlowSaga error:', error)
  }
}

/**
 * Sagas
 */
const saga = function * () {
  // 使用 takeEvery 綁定 action 觸發 saga 執行
  yield takeEvery(initApp, initAppSaga)
  yield takeEvery(login, loginSaga)

  // 使用 fork 直接執行身分驗證 saga 流程
  yield fork(authFlowSaga)
}

export default {
  defaultState,
  action,
  reducer,
  saga
}
