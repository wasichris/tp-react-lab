import { createAction, createReducer } from 'redux-act'
import api from '@src/services/api'

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
const loadAndSetContacts = createAction('Async load and set contacts', async () => {
  const resp = await api.getContacts({ contactId: 'contact02' })
  resp.contacts = resp.contacts.map(c => ({ ...c, isMarried: c.isMarried ? 'Yes' : 'No' }))
  return resp
})

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
  [loadAndSetContacts]: (state, payload) => {
    if (payload && payload.contacts) {
      return { ...state, contacts: [...payload.contacts] }
    }
    return state
  }
}, defaultState)

const action = {
  increaseCounter,
  decreaseCounter,
  loadAndSetContacts
}

/**
 * Sagas
 */
const saga = function * () {

}

export default {
  defaultState,
  action,
  reducer,
  saga
}
