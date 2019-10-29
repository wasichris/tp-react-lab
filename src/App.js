import '@src/assets/css/app.scss'
import React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import logo from '@src/assets/images/logo.svg'
import appModel from '@src/models/app'
import get from 'lodash/get'
import PropTypes from 'prop-types'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {

    }
  }

  componentDidMount () {
    // init app
    this.props.initApp()
  }

  render () {
    const { requestCount } = this.props
    return (
      <div className='app'>
        <header className='app-header'>
          <img src={logo} className='app-logo' alt='logo' />
          <p> {requestCount} </p>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className='app-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
          Learn React
          </a>
        </header>
      </div>
    )
  }
}

App.propTypes = {
  initApp: PropTypes.func,
  requestCount: PropTypes.number
}

const mapStateToProps = state => ({
  isLogin: get(state, 'app.isLogin', false),
  requestCount: get(state, 'app.requestCount', 0)

})

const mapDispatchToProps = dispatch => bindActionCreators({
  initApp: appModel.action.initApp
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(App)
