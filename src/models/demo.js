import { createAction, createReducer } from 'redux-act'
import api from '@src/services/api'

// import { takeLatest, put, call } from 'redux-saga/effects'
// import get from 'lodash/get'

/**
 * Default State
 */
const defaultState = {
  counter: 0,
  contacts: []
}

/**
 * Reducer Actions
 */
const increaseCounter = createAction('Increase counter')
const decreaseCounter = createAction('Decrease counter')
const loadContacts = createAction('Async load and set contacts', async () => {
  const resp = await api.getContacts({ contactId: 'contact02' })
  resp.contacts = resp.contacts.map(c => ({ ...c, isMarried: c.isMarried ? 'Yes' : 'No' }))
  return resp
})

// const setContacts = createAction('Set contacts')

/**
 * Reducers
 */
const reducer = createReducer({
  [increaseCounter]: (state) => {
    return { ...state, counter: state.counter + 1 }
  },
  [decreaseCounter]: (state) => {
    return { ...state, counter: state.counter - 1 }
  },
  [loadContacts]: (state, payload) => {
    if (payload && payload.contacts) {
      return { ...state, contacts: [...payload.contacts] }
    }
    return state
  }
  // [setContacts]: (state, payload) => {
  //   return { ...state, contacts: [...payload] }
  // }
}, defaultState)

/**
 * Saga Actions
 */
// const loadContactsComplex = createAction('load and set contacts by saga')

const action = {
  increaseCounter,
  decreaseCounter,
  // loadContacts,
  loadContacts
  // loadContactsComplex,
  // setContacts
}

/**
 * Saga Generator functions
 */
// function * loadContactsComplexSaga ({ payload }) {
//   try {
//     yield put(setContacts([]))
//     const { contacts } = yield call(api.getContacts, { contactId: 'wahaha' })

//     yield put(setContacts(contacts))
//   } catch (error) {
//     console.error('loadContactsComplexSaga error:', error)
//   }
// }

/**
 * Sagas
 */
const saga = function * () {
  // 使用 takeLatest 綁定 action 觸發 saga 執行
  // yield takeLatest(loadContactsComplex, loadContactsComplexSaga)
}

export default {
  defaultState,
  action,
  reducer,
  saga
}
