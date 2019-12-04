import React, { lazy, Suspense } from 'react'
import TpBoundary from '@src/components/TpBoundary/index'
import { Route, Link, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

// 動態載入頁面組件，使用 webpack magic comments 定義各自 chunk name 分散需載入的資源
const Practice05View01 = lazy(() => import(/* webpackChunkName: "practice05" */ '@src/views/Practice05/Practice05View01'))
const Practice05View02 = lazy(() => import(/* webpackChunkName: "practice05" */ '@src/views/Practice05/Practice05View02'))

// 動態載入期間顯示的畫面組件
const Loader = () => <div />

class Practice05 extends React.Component {
  handleGoView02Topic03 = () => {
    this.props.history.push('/p5/v2', { topic: 'TOPIC03' })
  }

  render () {
    const match = this.props.match
    return (
      <>
        <h1> 路由設定及轉址 </h1>
        <p className='tp-desc'>
          熟悉路由設定方式，請使用 Practice05 資料夾下 <span className='tp-tag'>Practice05View01</span>及<span className='tp-tag'>Practice05View02</span>組件，以動態載入頁面組件方式設定路由，實作點擊連結切換不同路由以顯示不同畫面。
        </p>

        <h4>1. 連結轉址帶參數 (參數於url上)</h4>
        <ul>
          <li>
            <Link to={`${match.url}/v1/TOPIC01`}> VIEW01-1 </Link>
            : 以 /p5/v1/:topic 顯示 Practice05View01 組件，並傳入 'TOPIC01' 作為 topic 參數顯示
          </li>
          <li>
            <Link to={`${match.url}/v1/TOPIC02`}> VIEW01-2 </Link>
            : 以 /p5/v1/:topic 顯示 Practice05View01 組件，並傳入 'TOPIC02' 作為 topic 參數顯示
          </li>

        </ul>

        <h4>2. 連結轉址帶參數 (參數不顯示於url上)</h4>
        <ul>
          <li>
            <Link to={{ pathname: `${match.url}/v2`, state: { topic: 'TOPIC01' } }}> VIEW02-1 </Link>
            : 以 /p5/v2 顯示 Practice05View02 組件，並以 state 方式傳入 'TOPIC01' 作為 topic 參數顯示
          </li>
          <li>
            <Link to={{ pathname: `${match.url}/v2`, state: { topic: 'TOPIC02' } }}> VIEW02-2 </Link>
            : 以 /p5/v2 顯示 Practice05View02 組件，並以 state 方式傳入 'TOPIC02' 作為 topic 參數顯示
          </li>
        </ul>

        <h4>3. 程式轉址帶參數 (參數不顯示於url上)</h4>
        <ul>
          <li>
            <button onClick={this.handleGoView02Topic03}>GO</button>
            ： 以 /p5/v2 顯示 Practice05View02 組件，並以 state 方式傳入 'TOPIC03' 作為 topic 參數顯示

          </li>

        </ul>
        <TpBoundary tag='router view'>
          {/* 以路由變化來切換此區塊顯示的畫面 */}

          {/* views */}
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path={`${match.path}/v1/:topic`} component={Practice05View01} />
              <Route path={`${match.path}/v2`} component={Practice05View02} />
              <Route path={`${match.path}/`}>  <h3> DEFAULT </h3>  </Route>
            </Switch>
          </Suspense>
        </TpBoundary>
      </>
    )
  }
}

Practice05.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
}

export default Practice05
