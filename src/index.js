import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import App from '@src/App'
import * as serviceWorker from '@src/utils/serviceWorker'
import { Provider } from 'react-redux'
import store from '@src/store.js'

// setup all environment
import '@src/setup/setupAxios'
import '@src/setup/setupYup'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
