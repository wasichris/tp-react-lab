import '@src/assets/css/app.scss'
import React, { lazy, Suspense } from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import appModel from '@src/models/app'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

// 動態載入頁面組件，使用 webpack magic comments 定義各自 chunk name 分散需載入的資源
const Home = lazy(() => import(/* webpackChunkName: "home" */ '@src/views/Home/index'))
const Practice01 = lazy(() => import(/* webpackChunkName: "practice" */ '@src/views/Practice01/index'))
const Practice02 = lazy(() => import(/* webpackChunkName: "practice" */ '@src/views/Practice02/index'))
const Practice03 = lazy(() => import(/* webpackChunkName: "practice" */ '@src/views/Practice03/index'))
const Practice04 = lazy(() => import(/* webpackChunkName: "practice" */ '@src/views/Practice04/index'))
const Practice05 = lazy(() => import(/* webpackChunkName: "practice" */ '@src/views/Practice05/index'))

// 動態載入期間顯示的畫面組件
const LoadingMask = () => <div />

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
                <div className='app-header__nav-item'> <Link to='/P1'>Practice01</Link> </div>
                <div className='app-header__nav-item'> <Link to='/P2'>Practice02</Link> </div>
                <div className='app-header__nav-item'> <Link to='/P3'>Practice03</Link> </div>
                <div className='app-header__nav-item'> <Link to='/P4'>Practice04</Link> </div>
                <div className='app-header__nav-item'> <Link to='/P5'>Practice05</Link> </div>
              </div>

            </div>
          </header>

          {/* body */}
          <div className='app-body'>
            <div className='app-body__container'>

              {/* views */}
              <Suspense fallback={<LoadingMask />}>
                <Switch>
                  <Route path='/P1' component={Practice01} />
                  <Route path='/P2' component={Practice02} />
                  <Route path='/P3' component={Practice03} />
                  <Route path='/P4' component={Practice04} />
                  <Route path='/P5' component={Practice05} />
                  <Route path='/' component={Home} />
                </Switch>
              </Suspense>
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
