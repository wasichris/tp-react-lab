import { createAction, createReducer } from 'redux-act'
import { takeEvery, put, take, fork, select } from 'redux-saga/effects'
import get from 'lodash/get'

/**
 * Default State
 */
const defaultState = {
  requestCount: 0,
  isLogin: false
}

/**
 * Reducer Actions
 */
const resetAppModel = createAction('Reset app model')
const increaseRequest = createAction('Increase count of API calling')
const decreaseRequest = createAction('Decrease count of API calling')
const setIsLogin = createAction('Setting user is login or not')

/**
 * Reducers
 */
const reducer = createReducer({
  [resetAppModel]: () => {
    return { ...defaultState }
  },
  [increaseRequest]: (state) => {
    return { ...state, requestCount: state.requestCount + 1 }
  },
  [decreaseRequest]: (state) => {
    return { ...state, requestCount: state.requestCount - 1 }
  },
  [setIsLogin]: (state, payload) => {
    return { ...state, isLogin: payload }
  }
}, defaultState)

/**
 * Saga Actions
 */
const initApp = createAction('Init app')
const logout = createAction('Logout system')
const loginSuccess = createAction('Login system success')

const action = {
  resetAppModel,
  increaseRequest,
  decreaseRequest,
  setIsLogin,
  initApp,
  logout,
  loginSuccess
}

/**
 * Saga Generator functions
 */
function * initAppSaga ({ payload }) {
  try {
    console.log('%c init app ', 'background-color: #3A88AE; color: white;font-size: 14px; font-weight: bold;')
    // 進入 app 需要初始化的工作
    // ....
  } catch (error) {
    console.error('initAppSaga error:', error)
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

  // 使用 fork 直接執行身分驗證 saga 流程
  yield fork(authFlowSaga)
}

export default {
  defaultState,
  action,
  reducer,
  saga
}
