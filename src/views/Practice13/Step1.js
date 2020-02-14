import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Step1 = ({ goNext, formValue }) => {
  const [name, setName] = useState('')

  useEffect(() => {
    if (formValue.name) {
      setName(formValue.name)
    }
  }, [formValue.name])

  return (
    <>
      <h3>STEP 1</h3>
      <div className='tp-form'>
        <div className='tp-form__row'>
          <label className='tp-form__label' htmlFor='name'>姓名</label>
          <div className='tp-form__field'>
            <input type='text' id='name' value={name} onChange={e => setName(e.target.value)} />
          </div>
        </div>

        <div className='tp-form__row tp-form__row--right'>
          <button onClick={() => goNext({ name, ...formValue })}>下一步</button>
        </div>
      </div>
    </>
  )
}

Step1.propTypes = {
  goNext: PropTypes.func,
  formValue: PropTypes.object
}

export default Step1
