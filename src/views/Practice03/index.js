import React from 'react'
import Practice03Child from './Practice03Child'
import TpSection from '@src/components/TpSection/index'

class Practice03 extends React.Component {
  top = <p>I'm top</p>
  middle = <p>I'm middle</p>
  bottom = <p>I'm bottom</p>

  render () {
    return (
      <>
        <h1> 於子組件中插入區塊 </h1>
        <p className='tp-desc'>
          熟悉插入子組件特定區塊的方式，請於子組件各指定區塊插入對應文字。
        </p>

        <TpSection>

          {/* 父組件 */}
          <div>父層組件</div>

          {/* 子組件 */}
          <Practice03Child top={this.top} bottom={this.bottom}>
            {this.middle}
          </Practice03Child>

        </TpSection>

      </>
    )
  }
}

export default Practice03
