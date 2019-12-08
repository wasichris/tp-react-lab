import React from 'react'

class Practice07Call02 extends React.Component {
  render () {
    return (
      <>
        <h4> [練習2] 於 demoModel (model/demo.js) 建立 loadAndSetContacts Async Action 呼叫 API 取得資訊後存放於 Store 中，組件呼叫此 action 取得資料並將資料呈現在畫面中 (可共用資料處理邏輯) </h4>
        <table className='tp-table'>

          <thead>
            <tr className='tp-table__tr'>
              <th className='tp-table__th'>name</th>
              <th className='tp-table__th'>phone no</th>
              <th className='tp-table__th'>married</th>
            </tr>
          </thead>

          <tbody>
            <tr className='tp-table__tr'>
              <td className='tp-table__td' colSpan='3'>empty</td>
            </tr>
          </tbody>

        </table>

      </>
    )
  }
}

export default Practice07Call02
