import React from 'react'
import TpSection from '@src/components/TpSection/index'
import Practice07Call01 from './Practice07Call01'
import Practice07Call02 from './Practice07Call02'

class Practice07 extends React.Component {
  render () {
    return (
      <>
        <h1> 呼叫 API 取得資訊 </h1>
        <p className='tp-desc'>
          熟悉 API 呼叫方式，成功回應時顯示資訊於畫面中；請依照以下需求在載入組件時透過 /services/api.js 中 getContacts 方法呼叫外部 API 來取得聯絡人清單，並且依序填入 Table 中顯示，其中 married 欄位回傳值為 bool，請轉換為 Yes / No 字串做為顯示。
        </p>

        <TpSection>
          {/* 直接於組件中呼叫 API 取得資訊 */}
          <Practice07Call01 />
        </TpSection>

        <TpSection>
          {/* 透過 Action 呼叫 API 取得資訊 */}
          <Practice07Call02 />
        </TpSection>

      </>
    )
  }
}

export default Practice07
