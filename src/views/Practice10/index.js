import React, { useState } from 'react'
import CountDownTimer from './CountDownTimer'
import TpSection from '@src/components/TpSection/index'

const Practice10 = () => {
  const [seconds, setSeconds] = useState(10)

  return (
    <>
      <h1> 熟悉 Hook 操作方式 </h1>
      <p className='tp-desc'>
          以 Hook API 實作 CountDownTimer 組件，透過輸入框改變 seconds 屬性來開始倒數計時，時間倒數完畢後透過 onTimeUp 方法屬性通知外部。
      </p>

      <TpSection>
          請輸入倒數秒數 <input value={seconds} type='number' onChange={e => setSeconds(Number(e.target.value) || 0)} />
        <CountDownTimer seconds={seconds} onTimeUp={() => { console.log('time up!!') }} />
      </TpSection>

    </>
  )
}

export default Practice10
