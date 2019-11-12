import React from 'react'
import PropTypes from 'prop-types'

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
    const internalValue = e.target.value
    this.props.onValueChange(internalValue) // 通知父組件數值異動
    this.setState({ ...this.state, internalValue })
  }

  render () {
    const { value } = this.props
    const { internalValue } = this.state

    return (
      <div className='bundary'>
        <div className='bundary__tag'>child component</div>
        <div>變動資料可通知父層組件來同步資料</div>
        <div><input type='text' value={internalValue} onChange={this.handleInternalValueChange} /></div>
        <div className='hint'>
          外部傳入的數值(prop): {value} <br />
          內部使用的數值(state): {internalValue}
        </div>

      </div>
    )
  }
}

Practice02Child.propTypes = {
  value: PropTypes.string,
  onValueChange: PropTypes.func
}

export default Practice02Child
