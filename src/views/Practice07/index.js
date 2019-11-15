import React from 'react'
import TpSection from '@src/components/TpSection/index'
import appModel from '@src/models/app'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
// import PropTypes from 'prop-types'
import get from 'lodash/get'

import TpLoader from '@src/components/TpLoader//index'

class Practice07 extends React.Component {
  render () {
    return (
      <>
        <h1> 呼叫 API 取得資訊 </h1>
        <TpLoader />
        <p className='desc'>
          熟悉 API 呼叫方式，登入成功時顯示用戶資訊於畫面中。
        </p>

        <TpSection>

          hihi

        </TpSection>

      </>
    )
  }
}

Practice07.propTypes = {
  // counter: PropTypes.number,
  // increaseCounter: PropTypes.func,
  // decreaseCounter: PropTypes.func
}

const mapStateToProps = state => ({
  counter: get(state, 'app.counter', 0)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  increaseCounter: appModel.action.increaseCounter,
  decreaseCounter: appModel.action.decreaseCounter
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Practice07)
