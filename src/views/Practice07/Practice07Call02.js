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
    // 2. 共用呼叫 api + 資料整理 + 互動寫入 redux => async action  (呼叫中await擋得住)
    this.setState({ ...this.state, isLoading: true })
    await this.props.loadContacts()
    this.setState({ ...this.state, isLoading: false })
  }

  render () {
    const { contacts } = this.props
    const { isLoading } = this.state
    const hasContacts = contacts && contacts.length > 0
    return (
      <>
        <h4> [練習2] 透過 Async Action 呼叫 API 取得資訊，並存放於 Redux 中，畫面資料來自 Redux State (可共用資料處理邏輯) </h4>
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
