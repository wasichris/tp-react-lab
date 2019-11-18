import React from 'react'
import TpSection from '@src/components/TpSection/index'
import Practice07Call01 from './Practice07Call01'
import Practice07Call02 from './Practice07Call02'

class Practice07 extends React.Component {
  render () {
    return (
      <>
        <h1> 呼叫 API 取得資訊 </h1>
        <p className='desc'>
          熟悉 API 呼叫方式，成功回應時顯示資訊於畫面中。
        </p>

        <TpSection>
          <Practice07Call01 />
        </TpSection>

        <TpSection>
          <Practice07Call02 />
        </TpSection>

      </>
    )
  }
}

export default Practice07
