import React from 'react'
import api from '@src/services/api'

class Practice07Call01 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      contacts: []
    }
  }

  async componentDidMount () {
    // 1. 單獨呼叫 api => api (呼叫中await擋得住)
    const resp = await api.getContacts({ contactId: 'contact01' })
    this.setState({ ...this.state, contacts: resp.contacts })
  }

  render () {
    const { contacts } = this.state
    const hasContacts = contacts && contacts.length > 0
    return (
      <>
        <h4> 1. 直接於組件中呼叫 API 取得資訊 </h4>
        <table className='tp-table'>

          <thead>
            <tr className='tp-table__tr'>
              <th className='tp-table__th'>name</th>
              <th className='tp-table__th'>phone no</th>
              <th className='tp-table__th'>married</th>
            </tr>
          </thead>

          <tbody>
            {hasContacts
              ? contacts.map(c => (
                <tr key={c.name} className='tp-table__tr'>
                  <td className='tp-table__td'>{c.name}</td>
                  <td className='tp-table__td'>{c.phone}</td>
                  <td className='tp-table__td'>{c.isMarried ? 'Yes' : 'No'}</td>
                </tr>
              ))
              : <tr><td colSpan='3'>empty</td></tr>}
          </tbody>

        </table>

      </>
    )
  }
}

export default Practice07Call01
