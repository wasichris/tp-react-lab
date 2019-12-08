import React from 'react'
import TpBoundary from '@src/components/TpBoundary/index'

class Practice02Child extends React.Component {
  render () {
    return (
      <TpBoundary tag='child component'>
        <div>變動資料可通知父層組件來同步資料</div>
        <div><input type='text' /></div>
        <div className='tp-hint'>
          外部傳入的數值(prop): OO <br />
          內部使用的數值(state): OO
        </div>
      </TpBoundary>
    )
  }
}

export default Practice02Child
