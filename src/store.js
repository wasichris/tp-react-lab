import createSagaMiddleware from 'redux-saga'
import promiseMiddleware from 'redux-promise'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import isEmpty from 'lodash/isEmpty'
import models from '@src/models'

/**
 * reducers and sagas
 */
const rootReducers = {}
const rootSagas = []
for (const key in models) {
  if (Object.prototype.hasOwnProperty.call(models, key)) {
    const model = models[key]
    if (model.reducer && !isEmpty(model.reducer)) {
      rootReducers[key] = model.reducer
    }
    if (model.saga) {
      rootSagas.push(model.saga)
    }
  }
}

const appReducer = combineReducers({
  ...rootReducers
})

/**
 * middleware
 */
const sagaMiddleware = createSagaMiddleware()

const appMiddlewares = applyMiddleware(
  sagaMiddleware,
  promiseMiddleware
)

let rootMiddleware
if (process.env.NODE_ENV !== 'production') {
  // support dev tools in non-prod env
  const { composeWithDevTools } = require('redux-devtools-extension')
  rootMiddleware = composeWithDevTools(appMiddlewares)
} else {
  // prod env
  rootMiddleware = appMiddlewares
}

/**
 * store
 */
const store = createStore(appReducer, rootMiddleware)

/**
 * run saga
 */
if (rootSagas && rootSagas.length > 0) {
  rootSagas.forEach(sagaMiddleware.run)
}

export default store
