import React from 'react'
import demoModel from '@src/models/demo'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import PropTypes from 'prop-types'
import get from 'lodash/get'

class Practice07Call02 extends React.Component {
  async componentDidMount () {
    // 2. 共用呼叫 api + 資料整理 + 互動寫入 redux => async action  (呼叫中await擋得住)
    await this.props.loadContacts()
    // do something after this action
  }

  render () {
    const { contacts } = this.props
    const hasContacts = contacts && contacts.length > 0
    return (
      <>
        <h4> 2. 透過 Action 呼叫 API 取得資訊，並存放於 Redux 中，畫面資料來自 Redux State (共用資料邏輯) </h4>
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

Practice07Call02.propTypes = {
  contacts: PropTypes.array,
  loadContacts: PropTypes.func
}

const mapStateToProps = state => ({
  contacts: get(state, 'demo.contacts', [])
})

const mapDispatchToProps = dispatch => bindActionCreators({
  loadContacts: demoModel.action.loadContacts
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Practice07Call02)
