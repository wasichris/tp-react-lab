import React from 'react'
import Practice03Child from './Practice03Child'
import TpSection from '@src/components/TpSection/index'

class Practice03 extends React.Component {
  render () {
    return (
      <>
        <h3> 於子組件中插入區塊 </h3>
        <p className='page-desc'>
          熟悉插入子組件特定區塊的方式，請於子組件各指定區塊插入對應文字。
        </p>

        <TpSection>

          {/* 父組件 */}
          <div>父層組件</div>

          {/* 子組件 */}
          <Practice03Child />

        </TpSection>

      </>
    )
  }
}

export default Practice03
