import React from 'react'
import api from '@src/services/api'
import TpLoader from '@src/components/TpLoader/'

class Practice07Call01 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      contacts: []
    }
  }

  async componentDidMount () {
    this.setState({ ...this.state, isLoading: true })
    const resp = await api.getContacts({ contactId: 'contact01' })
    this.setState({ ...this.state, contacts: resp.contacts, isLoading: false })
  }

  render () {
    const { isLoading, contacts } = this.state
    const hasContacts = contacts && contacts.length > 0
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

            {isLoading && <tr><td colSpan='3'><TpLoader /></td></tr>}

            {!isLoading && (hasContacts
              ? contacts.map(c => (
                <tr key={c.name} className='tp-table__tr'>
                  <td className='tp-table__td'>{c.name}</td>
                  <td className='tp-table__td'>{c.phone}</td>
                  <td className='tp-table__td'>{c.isMarried ? 'Yes' : 'No'}</td>
                </tr>
              ))
              : <tr><td colSpan='3'>empty</td></tr>)}

          </tbody>

        </table>

      </>
    )
  }
}

export default Practice07Call01
