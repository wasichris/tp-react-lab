import React from 'react'

class Practice07Call01 extends React.Component {
  render () {
    return (
      <>
        <h4> [練習1] 直接於組件 componentDidMount 中呼叫 API 取得資訊 </h4>
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

export default Practice07Call01
