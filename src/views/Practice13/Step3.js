import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Step3 = ({ goNext, goPrevious, formValue }) => {
  const [address, setAddress] = useState('')

  useEffect(() => {
    if (formValue.address) {
      setAddress(formValue.address)
    }
  }, [formValue.address])

  return (
    <>
      <h3>step 3</h3>
      <div className='tp-form'>
        <div className='tp-form__row'>
          <label className='tp-form__label' htmlFor='address'>地址</label>
          <div className='tp-form__field'>
            <input type='text' id='address' value={address} onChange={e => setAddress(e.target.value)} />
          </div>
        </div>

        <div className='tp-form__row tp-form__row--right'>
          <button onClick={() => goNext({ address, ...formValue })}>送出</button>
          <button onClick={() => goPrevious()}>上一步</button>
        </div>
      </div>
    </>
  )
}

Step3.propTypes = {
  goNext: PropTypes.func,
  goPrevious: PropTypes.func,
  formValue: PropTypes.object
}

export default Step3
