import React from 'react'
import Practice02Son from './Practice02Son'

class Practice02 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      magicNum: 10,
      magicNumMsg: ''
    }
  }

  handleInvalidNum = (num) => {
    this.setState({ ...this.state, magicNumMsg: `the value '${num}' is invalid!!` })
  }

  handleMagicNumChange = e => {
    this.setState({ ...this.state, magicNum: e.target.value, magicNumMsg: '' })
  }

  render () {
    const { magicNum, magicNumMsg } = this.state
    return (
      <>
        <h3> 父子組件溝通 </h3>
        <p className='page-desc'>
          熟悉父子組件溝通方式，父祖件包含一個輸入框，請傳遞輸入框數值及 handleInvalidNum callback 方法至子組件，於子組件即時顯示數值，並在數值小於 0 時呼叫 handleInvalidNum callback 方法通知父組件。
        </p>

        <div className='page-section'>

          {/* 父組件-輸入框 */}
          <input type='number' value={magicNum} onChange={this.handleMagicNumChange} />
          {magicNumMsg && <div className='hint'>{magicNumMsg} </div>}

          {/* 子組件 */}
          <Practice02Son />

        </div>

      </>
    )
  }
}

export default Practice02
