import React, { useState } from 'react'
import TpSemiCircle from '@src/components/TpSemiCircle'

const Practice18 = () => {
  const [percentage, setPercentage] = useState(30)
  return (
    <>
      <h1> 使用 svg 實作圓環樣式 </h1>

      Percentage:{' '}

      <select value={percentage} onChange={(e) => setPercentage(e.target.value)}>
        <option value='0'>0%</option>
        <option value='10'>10%</option>
        <option value='30'>30%</option>
        <option value='50'>50%</option>
        <option value='60'>60%</option>
        <option value='90'>90%</option>
        <option value='100'>100%</option>
      </select>

      <div style={{ height: '200px', width: '200px' }}>
        <TpSemiCircle percentage={percentage} />
      </div>

    </>
  )
}

export default Practice18
