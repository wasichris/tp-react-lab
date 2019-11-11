import React from 'react'

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
        <h3> 輸入控制 </h3>
        <p className='page-desc'>
          熟悉輸入元素的控制方式，請將輸入資訊存放於 state 中，並修改時即時顯示於輸入框下方
        </p>

        {/* section 1 - input */}
        <div className='page-section'>
          <div><input type='text' value={inputValue} onChange={this.handleInput} /> </div>
          <div className='hint'>您輸入的資料: {inputValue} </div>
        </div>

        {/* section 2 - radio */}
        <div className='page-section'>
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
        </div>

        {/* section 3 - checkbox */}
        <div className='page-section'>
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
        </div>

        {/* section 4 - option */}
        <div className='page-section'>
          <select>
            <option value=''>Please Select</option>
            <option value='volvo'>Volvo</option>
            <option value='saab'>Saab</option>
            <option value='vw'>VW</option>
            <option value='audi'>Audi</option>
          </select>

          <div className='hint'>您選擇的資料: OOO </div>
        </div>

      </>
    )
  }
}

export default Practice01
