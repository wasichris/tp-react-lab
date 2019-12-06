import React from 'react'
import demoModel from '@src/models/demo'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import TpLoader from '@src/components/TpLoader/'

class Practice07Call02 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  async componentDidMount () {
    const { loadAndSetContacts, contacts } = this.props
    if (contacts && contacts.length === 0) {
      this.setState({ ...this.state, isLoading: true })
      await loadAndSetContacts()
      this.setState({ ...this.state, isLoading: false })
    }
  }

  render () {
    const { contacts } = this.props
    const { isLoading } = this.state
    const hasContacts = contacts && contacts.length > 0
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

            {isLoading && <tr><td colSpan='3'><TpLoader /></td></tr>}

            {!isLoading && (hasContacts
              ? contacts.map(c => (
                <tr key={c.name} className='tp-table__tr'>
                  <td className='tp-table__td'>{c.name}</td>
                  <td className='tp-table__td'>{c.phone}</td>
                  <td className='tp-table__td'>{c.isMarried}</td>
                </tr>
              ))
              : <tr><td colSpan='3'>empty</td></tr>)}

          </tbody>

        </table>

      </>
    )
  }
}

Practice07Call02.propTypes = {
  contacts: PropTypes.array,
  loadAndSetContacts: PropTypes.func
}

const mapStateToProps = state => ({
  contacts: get(state, 'demo.contacts', [])
})

const mapDispatchToProps = dispatch => bindActionCreators({
  loadAndSetContacts: demoModel.action.loadAndSetContacts
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Practice07Call02)
