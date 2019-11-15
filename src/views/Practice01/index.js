import React from 'react'
import TpSection from '@src/components/TpSection/index'

class Practice01 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      inputValue: ''
    }
  }

  handleInput = (e) => {
    const inputValue = e.target.value
    this.setState({ ...this.state, inputValue })
  }

  render () {
    const { inputValue } = this.state

    return (
      <>
        <h1> 輸入控制 </h1>
        <p className='desc'>
          熟悉輸入元素的控制方式，請將輸入資訊存放於 state 中，並修改時即時顯示於輸入框下方。
        </p>

        {/* section 1 - input */}
        <TpSection>
          <div><input type='text' value={inputValue} onChange={this.handleInput} /> </div>
          <div className='hint'>您輸入的資料: {inputValue} </div>
        </TpSection>

        {/* section 2 - radio */}
        <TpSection>
          <div className='tp-radio'>
            <input type='radio' id='pm' name='職稱' value='pm' />
            <label htmlFor='pm' className='tp-radio__label'>project manager</label>
          </div>

          <div className='tp-radio'>
            <input type='radio' id='sd' name='職稱' value='sd' />
            <label htmlFor='sd' className='tp-radio__label'>system designer</label>
          </div>

          <div className='tp-radio'>
            <input type='radio' id='sa' name='職稱' value='sa' />
            <label htmlFor='sa' className='tp-radio__label'>system analyst</label>
          </div>

          <div className='hint'>您選擇的資料: OOO </div>
        </TpSection>

        {/* section 3 - checkbox */}
        <TpSection>
          <div className='tp-checkbox'>
            <input type='checkbox' id='bike' name='vehicle' value='bike' />
            <label htmlFor='bike' className='tp-checkbox__label'>I have a bike</label>
          </div>

          <div className='tp-checkbox'>
            <input type='checkbox' id='car' name='vehicle' value='car' />
            <label htmlFor='car' className='tp-checkbox__label'>I have a car</label>
          </div>

          <div className='tp-checkbox'>
            <input type='checkbox' id='boat' name='vehicle' value='boat' />
            <label htmlFor='boat' className='tp-checkbox__label'>I have a boat</label>
          </div>

          <div className='hint'>您選擇的資料: OOO </div>
        </TpSection>

        {/* section 4 - option */}
        <TpSection>
          <select>
            <option value=''>Please Select</option>
            <option value='volvo'>Volvo</option>
            <option value='saab'>Saab</option>
            <option value='vw'>VW</option>
            <option value='audi'>Audi</option>
          </select>

          <div className='hint'>您選擇的資料: OOO </div>
        </TpSection>

      </>
    )
  }
}

export default Practice01
