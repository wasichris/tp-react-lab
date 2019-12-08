import React from 'react'
import TpSection from '@src/components/TpSection/index'

class Practice06 extends React.Component {
  render () {
    return (
      <>
        <h1> Redux 全域狀態控制 </h1>
        <p className='tp-desc'>
          熟悉 Redux 全域狀態控制方式，請建立 demoModel (model/demo.js) 並實作一個計數器來控制 demoModel 中的 counter 狀態，
          透過 increaseCounter 及 decreaseConter 兩個 action 來控制 reducer 執行 counter 的累加與累減行為，
          最後將成果顯示於畫面上。
        </p>

        <TpSection>
          <h3>計數器: 0</h3>
          <button>十</button>
          <button>一</button>

        </TpSection>

      </>
    )
  }
}

export default Practice06
