import React, { lazy, Suspense } from 'react'
import TpBoundary from '@src/components/TpBoundary/index'
import { Route, Link, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

// 動態載入頁面組件，使用 webpack magic comments 定義各自 chunk name 分散需載入的資源
const Practice05View01 = lazy(() => import(/* webpackChunkName: "practice05" */ '@src/views/Practice05/Practice05View01'))
const Practice05View02 = lazy(() => import(/* webpackChunkName: "practice05" */ '@src/views/Practice05/Practice05View02'))
const Practice05View03 = lazy(() => import(/* webpackChunkName: "practice05" */ '@src/views/Practice05/Practice05View03'))

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
           依照以下要求設定 <a target='blank' href='https://reacttraining.com/react-router/web/api/Route'>Route</a> 路由，使用 lazy 方式動態載入 Practice05 資料夾下 Practice05View01、Practice05View02 及 Practice05View03 組件，
           透過點擊 <a target='blank' href='https://reacttraining.com/react-router/web/api/Link'>Link</a> 連結組件切換不同路由以顯示不同畫面於 router view 區塊中。
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
          <li>
            <Link to={`${match.url}/v1/TOPIC03`}> VIEW03 </Link>
            : 以 /p5/v1/TOPIC03 顯示 Practice05View03 組件
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
              <Route path={`${match.path}/v1/TOPIC03`} component={Practice05View03} />
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
