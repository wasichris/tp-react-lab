
import React from 'react'

const CountDownTimer = () => {
  const remainSecond = 10
  return (
    <div className='tp-count-down-timer'>
      <div className='tp-count-down-timer__time'>
        {new Date(remainSecond * 1000).toISOString().substr(11, 8)}
      </div>
    </div>
  )
}

export default CountDownTimer
