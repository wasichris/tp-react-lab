import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Step2 = ({ goNext, goPrevious, formValue }) => {
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (formValue.phone) {
      setPhone(formValue.phone)
    }
  }, [formValue.phone])

  return (
    <>
      <h3>STEP 2</h3>
      <div className='tp-form'>
        <div className='tp-form__row'>
          <label className='tp-form__label' htmlFor='phone'>電話</label>
          <div className='tp-form__field'>
            <input type='text' id='phone' value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
        </div>

        <div className='tp-form__row tp-form__row--right'>
          <button onClick={() => goNext({ phone, ...formValue })}>下一步</button>
          <button onClick={() => goPrevious()}>上一步</button>
        </div>
      </div>
    </>
  )
}

Step2.propTypes = {
  goNext: PropTypes.func,
  goPrevious: PropTypes.func,
  formValue: PropTypes.object
}

export default Step2
