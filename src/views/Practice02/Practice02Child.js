import React from 'react'
import PropTypes from 'prop-types'
import TpBoundary from '@src/components/TpBoundary/index'

class Practice02Child extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      internalValue: 0
    }
  }

  static getDerivedStateFromProps (props, state) {
    if (props.value !== state.internalValue) {
      return { ...state, internalValue: props.value }
    }

    return null
  }

  handleInternalValueChange = e => {
    this.props.onValueChange(e.target.value) // 通知父組件數值異動
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
