import React from 'react'
import PropTypes from 'prop-types'

const Step4Result = ({ formValue, go }) => {
  return (
    <>
      <h3>RESULT</h3>
      <div className='tp-form'>
        <div className='tp-form__row'>
          Success
        </div>
        <div className='tp-form__row'>
          <div className='tp-code'>
            {formValue ? JSON.stringify(formValue, null, 2) : ''}
          </div>
        </div>

        <div className='tp-form__row tp-form__row--right'>
          <button onClick={() => go(1, {})}>重新申請</button>
        </div>
      </div>
    </>
  )
}

Step4Result.propTypes = {
  formValue: PropTypes.object,
  go: PropTypes.func
}

export default Step4Result
