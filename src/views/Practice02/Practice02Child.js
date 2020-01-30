import React from 'react'
import PropTypes from 'prop-types'
import TpBoundary from '@src/components/TpBoundary/index'

class Practice02Child extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      internalValue: 0,
      prevPropValue: '' // 存放前一次的 value prop
    }
  }

  static getDerivedStateFromProps (props, state) {
    // 將 value prop 同步異動子組件的 internalValue state 值
    // (判斷 value prop 與 前一次的 value prop 不同時才變動)
    if (props.value !== state.prevPropValue) {
      return { ...state, internalValue: props.value, prevPropValue: props.value }
    }

    return null // 回傳 null 表示 state 無異動
  }

  handleInternalValueChange = e => {
    // 當 input 被修改時，透過 onChange prop 通知父組件
    this.props.onValueChange(e.target.value)

    // 同步異動 internalValue state 值
    this.setState({ ...this.state, internalValue: e.target.value })
  }

  render () {
    const { value } = this.props
    const { internalValue } = this.state

    return (
      <TpBoundary tag='child component'>
        <div>變動資料可通知父層組件來同步資料</div>
        <div><input type='text' value={internalValue} onChange={this.handleInternalValueChange} /></div>
        <div className='tp-hint'>
          外部傳入的數值(prop): {value} <br />
          內部使用的數值(state): {internalValue}
        </div>
      </TpBoundary>
    )
  }
}

Practice02Child.propTypes = {
  value: PropTypes.string,
  onValueChange: PropTypes.func
}

export default Practice02Child
