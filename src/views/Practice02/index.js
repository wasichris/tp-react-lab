import React from 'react'
import Practice02Child from './Practice02Child'
import TpSection from '@src/components/TpSection/index'

class Practice02 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      phone: '0922123123'
    }
  }

  handlePhoneChange = e => {
    this.setState({ ...this.state, phone: e.target.value })
  }

  handleChildPhoneChange = newPhone => {
    this.setState({ ...this.state, phone: newPhone })
  }

  render () {
    const { phone } = this.state
    return (
      <>
        <h1> 父子組件溝通 </h1>
        <p className='tp-desc'>
          熟悉父子組件溝通方式，實現父子組件資料同步需求；如下父組件包含一個 phone 輸入框，變動數值時將值透過 props 傳遞至子組件中，子組件在 getDerivedStateFromProps 中將收到的值存放在 state 保存並顯示在子組件輸入框，亦可透過子組件的輸入框異動來通知父組件同步數值。
        </p>

        <TpSection>

          {/* 父組件 */}
          <div>請輸入手機號碼(phone)</div>
          <input type='text' value={phone} onChange={this.handlePhoneChange} />
          <div className='tp-hint'> 內部使用的數值(state): {phone} </div>

          {/* 子組件 */}
          <Practice02Child value={phone} onValueChange={this.handleChildPhoneChange} />

        </TpSection>

      </>
    )
  }
}

export default Practice02
