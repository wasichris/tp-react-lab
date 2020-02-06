import '@src/assets/css/app.scss'
import React, { lazy, Suspense } from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import appModel from '@src/models/app'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom'

// 動態載入頁面組件，使用 webpack magic comments 定義各自 chunk name 分散需載入的資源
const Home = lazy(() => import(/* webpackChunkName: "home" */ '@src/views/Home/index'))
const Practice01 = lazy(() => import(/* webpackChunkName: "practice" */ '@src/views/Practice01/index'))
const Practice02 = lazy(() => import(/* webpackChunkName: "practice" */ '@src/views/Practice02/index'))
const Practice03 = lazy(() => import(/* webpackChunkName: "practice" */ '@src/views/Practice03/index'))
const Practice04 = lazy(() => import(/* webpackChunkName: "practice" */ '@src/views/Practice04/index'))
const Practice05 = lazy(() => import(/* webpackChunkName: "practice" */ '@src/views/Practice05/index'))
const Practice06 = lazy(() => import(/* webpackChunkName: "practice" */ '@src/views/Practice06/index'))
const Practice07 = lazy(() => import(/* webpackChunkName: "practice" */ '@src/views/Practice07/index'))
const Practice08 = lazy(() => import(/* webpackChunkName: "practice" */ '@src/views/Practice08/index'))
const Practice09 = lazy(() => import(/* webpackChunkName: "practice" */ '@src/views/Practice09/index'))
const Practice10 = lazy(() => import(/* webpackChunkName: "practice" */ '@src/views/Practice10/index'))
const Practice11 = lazy(() => import(/* webpackChunkName: "practice" */ '@src/views/Practice11/index'))
const Practice12 = lazy(() => import(/* webpackChunkName: "practice" */ '@src/views/Practice12/index'))

// // 如果想避免時間短暫造成畫面閃爍，可以給予時間延遲
// const Practice01 = lazy(() => {
//   return Promise.all([
//     import(/* webpackChunkName: "practice" */ '@src/views/Practice01/index'),
//     new Promise(resolve => setTimeout(resolve, 300))
//   ]).then(([moduleExports]) => moduleExports)
// })

// 動態載入期間顯示的畫面組件 (讀取時間相當短暫，可忽略呈現)
const Loader = () => <div />

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
    const basename = process.env.ROOT_PATH || '/'
    return (
      <Router basename={basename}>
        <div className='app'>
          {/* header */}
          <header className='app-header'>
            <div className='app-header__container'>

              {/* logo */}
              <div className='app-header__logo'> ThinkPower </div>

              {/* nav */}
              <div className='app-header__nav'>
                <div className='app-header__nav-item'>
                  <NavLink exact activeClassName='app-header__nav-item--active' to='/'>Home</NavLink>
                </div>
                <div className='app-header__nav-item'>
                  <NavLink activeClassName='app-header__nav-item--active' to='/p1'>Practice01</NavLink>
                </div>
                <div className='app-header__nav-item'>
                  <NavLink activeClassName='app-header__nav-item--active' to='/p2'>Practice02</NavLink>
                </div>
                <div className='app-header__nav-item'>
                  <NavLink activeClassName='app-header__nav-item--active' to='/p3'>Practice03</NavLink>
                </div>
                <div className='app-header__nav-item'>
                  <NavLink activeClassName='app-header__nav-item--active' to='/p4'>Practice04</NavLink>
                </div>
                <div className='app-header__nav-item'>
                  <NavLink activeClassName='app-header__nav-item--active' to='/p5'>Practice05</NavLink>
                </div>
                <div className='app-header__nav-item'>
                  <NavLink activeClassName='app-header__nav-item--active' to='/p6'>Practice06</NavLink>
                </div>
                <div className='app-header__nav-item'>
                  <NavLink activeClassName='app-header__nav-item--active' to='/p7'>Practice07</NavLink>
                </div>
                <div className='app-header__nav-item'>
                  <NavLink activeClassName='app-header__nav-item--active' to='/p8'>Practice08</NavLink>
                </div>
                <div className='app-header__nav-item'>
                  <NavLink activeClassName='app-header__nav-item--active' to='/p9'>Practice09</NavLink>
                </div>
                <div className='app-header__nav-item'>
                  <NavLink activeClassName='app-header__nav-item--active' to='/p10'>Practice10</NavLink>
                </div>
                <div className='app-header__nav-item'>
                  <NavLink activeClassName='app-header__nav-item--active' to='/p11'>Practice11</NavLink>
                </div>
                <div className='app-header__nav-item'>
                  <NavLink activeClassName='app-header__nav-item--active' to='/p12'>Practice12</NavLink>
                </div>
              </div>

            </div>
          </header>

          {/* body */}
          <div className='app-body'>
            <div className='app-body__container'>

              {/* views */}
              <Suspense fallback={<Loader />}>
                <Switch>
                  <Route path='/p1' component={Practice01} />
                  <Route path='/p2' component={Practice02} />
                  <Route path='/p3' component={Practice03} />
                  <Route path='/p4' component={Practice04} />
                  <Route path='/p5' component={Practice05} />
                  <Route path='/p6' component={Practice06} />
                  <Route path='/p7' component={Practice07} />
                  <Route path='/p8' component={Practice08} />
                  <Route path='/p9' component={Practice09} />
                  <Route path='/p10' component={Practice10} />
                  <Route path='/p11' component={Practice11} />
                  <Route path='/p12' component={Practice12} />
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
