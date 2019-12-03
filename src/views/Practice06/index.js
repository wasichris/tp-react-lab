import React from 'react'
import TpSection from '@src/components/TpSection/index'
import demoModel from '@src/models/demo'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import PropTypes from 'prop-types'
import get from 'lodash/get'

class Practice06 extends React.Component {
  handleIncrease = () => {
    this.props.increaseCounter()
  }

  handleDecrease = () => {
    this.props.decreaseCounter()
  }

  render () {
    const { counter } = this.props

    return (
      <>
        <h1> Redux 全域狀態控制 </h1>
        <p className='tp-desc'>
          熟悉 Redux 全域狀態控制方式，實作一個計數器來控制 model/app.js 中的 counter 狀態，請透過 increaseCounter 及 decreaseConter 兩個 action 來控制 reducer 執行 counter 的累加與累減行為。
        </p>

        <TpSection>
          <h3>計數器: {counter}</h3>
          <button onClick={this.handleIncrease}>十</button>
          <button onClick={this.handleDecrease}>一</button>

        </TpSection>

      </>
    )
  }
}

Practice06.propTypes = {
  counter: PropTypes.number,
  increaseCounter: PropTypes.func,
  decreaseCounter: PropTypes.func
}

const mapStateToProps = state => ({
  counter: get(state, 'demo.counter', 0)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  increaseCounter: demoModel.action.increaseCounter,
  decreaseCounter: demoModel.action.decreaseCounter
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Practice06)
