import '@src/assets/css/app.scss'
import React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import logo from '@src/assets/images/logo.svg'
import appModel from '@src/models/app'
import get from 'lodash/get'
import PropTypes from 'prop-types'

class Home extends React.Component {
  constructor (props) {
    super(props)

    this.state = {

    }
  }

  render () {
    const { requestCount } = this.props
    return (
      <>
        <img src={logo} className='app-logo' alt='logo' />
        <p> {requestCount} </p>
        <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </>
    )
  }
}

Home.propTypes = {
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
)(Home)
