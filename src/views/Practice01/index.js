import React from 'react'
import TpSection from '@src/components/TpSection/index'

class Practice01 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      inputValue1: 'hi',
      inputValue2: 'sd',
      inputValue3: ['car', 'boat'],
      inputValue4: 'vw'
    }
  }

  handleChangeInput1 = (e) => {
    const value = e.target.value
    this.setState({ ...this.state, inputValue1: value })
  }

  handleChangeInput2 = (e) => {
    const value = e.target.value
    this.setState({ ...this.state, inputValue2: value })
  }

  handleChangeInput3 = (e) => {
    const value = e.target.value
    const newInputValue3 = [...this.state.inputValue3]
    const foundIndex = newInputValue3.indexOf(value)
    if (foundIndex > -1) {
      newInputValue3.splice(foundIndex, 1)
    } else {
      newInputValue3.push(value)
    }
    this.setState({ ...this.state, inputValue3: newInputValue3 })
  }

  handleChangeInput4 = (e) => {
    const value = e.target.value
    this.setState({ ...this.state, inputValue4: value })
  }

  render () {
    const { inputValue1, inputValue2, inputValue3, inputValue4 } = this.state

    return (
      <>
        <h1> 輸入控制 </h1>
        <p className='desc'>
          熟悉輸入元素的控制方式，請將輸入資訊存放於 state 中，並修改時即時顯示於輸入框下方。
        </p>

        {/* section 1 - input */}
        <TpSection>
          <div><input type='text' value={inputValue1} onChange={this.handleChangeInput1} /> </div>
          <div className='hint'>您輸入的資料: {inputValue1} </div>
        </TpSection>

        {/* section 2 - radio */}
        <TpSection>
          <div className='tp-radio'>
            <input type='radio' id='pm' name='職稱' value='pm' checked={inputValue2 === 'pm'} onChange={this.handleChangeInput2} />
            <label htmlFor='pm' className='tp-radio__label'>project manager</label>
          </div>

          <div className='tp-radio'>
            <input type='radio' id='sd' name='職稱' value='sd' checked={inputValue2 === 'sd'} onChange={this.handleChangeInput2} />
            <label htmlFor='sd' className='tp-radio__label'>system designer</label>
          </div>

          <div className='tp-radio'>
            <input type='radio' id='sa' name='職稱' value='sa' checked={inputValue2 === 'sa'} onChange={this.handleChangeInput2} />
            <label htmlFor='sa' className='tp-radio__label'>system analyst</label>
          </div>

          <div className='hint'>您選擇的資料: {inputValue2} </div>
        </TpSection>

        {/* section 3 - checkbox */}
        <TpSection>
          <div className='tp-checkbox'>
            <input type='checkbox' id='bike' name='vehicle' value='bike' checked={inputValue3.indexOf('bike') > -1} onChange={this.handleChangeInput3} />
            <label htmlFor='bike' className='tp-checkbox__label'>I have a bike</label>
          </div>

          <div className='tp-checkbox'>
            <input type='checkbox' id='car' name='vehicle' value='car' checked={inputValue3.indexOf('car') > -1} onChange={this.handleChangeInput3} />
            <label htmlFor='car' className='tp-checkbox__label'>I have a car</label>
          </div>

          <div className='tp-checkbox'>
            <input type='checkbox' id='boat' name='vehicle' value='boat' checked={inputValue3.indexOf('boat') > -1} onChange={this.handleChangeInput3} />
            <label htmlFor='boat' className='tp-checkbox__label'>I have a boat</label>
          </div>

          <div className='hint'>您選擇的資料: {inputValue3.toString()} </div>
        </TpSection>

        {/* section 4 - option */}
        <TpSection>
          <select value={inputValue4} onChange={this.handleChangeInput4}>
            <option value=''>Please Select</option>
            <option value='volvo'>Volvo</option>
            <option value='saab'>Saab</option>
            <option value='vw'>VW</option>
            <option value='audi'>Audi</option>
          </select>

          <div className='hint'>您選擇的資料: {inputValue4} </div>
        </TpSection>

      </>
    )
  }
}

export default Practice01
