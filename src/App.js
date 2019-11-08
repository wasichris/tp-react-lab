import '@src/assets/css/app.scss'
import React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import appModel from '@src/models/app'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Home from '@src/views/Home/index'
import Example01 from '@src/views/Example01/index'
import Example02 from '@src/views/Example02/index'

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
    return (
      <Router>
        <div className='app'>

          {/* header */}
          <header className='app-header'>
            <div className='app-header__container'>

              {/* logo */}
              <div className='app-header__logo'> ThinkPower </div>

              {/* nav */}
              <div className='app-header__nav'>
                <div className='app-header__nav-item'> <Link to='/'>Home</Link> </div>
                <div className='app-header__nav-item'> <Link to='/E1'>Example01</Link> </div>
                <div className='app-header__nav-item'> <Link to='/E2'>Example02</Link> </div>
              </div>

            </div>
          </header>

          {/* body */}
          <div className='app-body'>
            <div className='app-body__container'>

              {/* views */}
              <Switch>

                <Route path='/E1'>
                  <Example01 />
                </Route>

                <Route path='/E2'>
                  <Example02 />
                </Route>

                <Route path='/'>
                  <Home />
                </Route>

              </Switch>

            </div>
          </div>

        </div>
      </Router>
    )
  }
}

App.propTypes = {
  initApp: PropTypes.func
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
