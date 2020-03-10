import React, { useState, useCallback } from 'react'
import CountDownTimer from './CountDownTimer'
import TpSection from '@src/components/TpSection/index'

const Practice10 = () => {
  const [seconds, setSeconds] = useState(10)

  // useCallback 會回傳該 callback 的 memoized 版本，它僅在依賴改變時才會更新
  // 當傳遞 callback 到已經最佳化的 child component 時非常有用，這些 child component 依賴於引用相等性來防止不必要的 render
  const handleTimeup = useCallback(
    () => {
      console.log('time up!!')
    },
    []
  )

  return (
    <>
      <h1> 熟悉 Hook 操作方式 </h1>
      <p className='tp-desc'>
          以 Hook API 實作 CountDownTimer 組件，透過輸入框改變 seconds 屬性來開始倒數計時，時間倒數完畢後透過 onTimeUp 方法屬性通知外部。
      </p>

      <TpSection>
          請輸入倒數秒數 <input value={seconds} type='number' onChange={e => setSeconds(Number(e.target.value) || 0)} />
        <CountDownTimer seconds={seconds} onTimeUp={handleTimeup} />
      </TpSection>

    </>
  )
}

export default Practice10
